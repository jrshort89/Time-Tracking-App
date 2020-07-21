import { ProjectsService } from '../../projects/projects.service';
import { Project } from '../../projects/project.model';
import { TimeTrackerService } from './../timeTracker.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timer-console',
  templateUrl: './timer-console.component.html',
  styleUrls: ['./timer-console.component.css']
})
export class TimerConsoleComponent implements OnInit, OnDestroy {

  constructor(public timeTrackerService: TimeTrackerService,
              public projectsService: ProjectsService) { }
              
              subscription: Subscription;
              id: number;
              projects: Project[];

  ngOnInit() {
    this.subscription = this.projectsService.projectsChanged
    .subscribe(
      (projects: Project[]) => {
        this.projects = projects;
      }
    )
    this.projects = this.projectsService.getProjects();

    this.timerForm = new FormGroup({
      'name': new FormControl(null),
      'description': new FormControl(null)
    });
  }

  timerForm: FormGroup;


  onStartTimer() {
    this.timeTrackerService.timerStart();
    this.projectsService.startTime = this.projectsService.getTodaysDate();
  }

  onStopTimer() {
    this.projectsService.addProject(this.timerForm.value.name, this.timerForm.value.description, this.timeTrackerService.startTime);
    this.timeTrackerService.timerStop();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
