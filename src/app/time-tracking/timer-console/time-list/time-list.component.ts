import { TimeTrackerService } from './../../timeTracker.service';
import { ProjectsService } from '../../../projects/projects.service';
import { Project } from '../../../projects/project.model';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-time-list',
  templateUrl: './time-list.component.html',
  styleUrls: ['./time-list.component.css']
})
export class TimeListComponent implements OnInit {
  @Input() projects: Project;
  @Input() index: number;
  id: number;
  editMode = false;

  constructor(private projectsService: ProjectsService,
    private route: ActivatedRoute,
    private router: Router,
    private timeTrackerService: TimeTrackerService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
    }); 
  }

  onDeleteTrackedTime(index: number) {
    this.projectsService.deleteTrackedTime(index);
  }

  onEditProject(index: number) {
    this.router.navigate([index, 'edit']);
  }

  formatTime(time: any) {
    return time.toLocaleTimeString();
  }

  updateTotalTime(startTime, endTime) {
    let splitStart = startTime.split(":");
    let splitEnd = endTime.split(":");
    let sec = +splitEnd[2].substr(0, 2) - +splitStart[2].substr(0, 2);
    let min = (+splitEnd[1] - +splitStart[1]) * 60;
    let hr = (+splitEnd[0] - +splitStart[0]) * 3600;
    return this.timeTrackerService.timeTrackedFormatter(hr + min + sec);
  }

}
