import { TimeTrackerService } from './../../time-tracking/timeTracker.service';
import { ProjectsService } from '../projects.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from '../project.model';

@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.css']
})
export class ProjectSummaryComponent implements OnInit {

  constructor(private projectService: ProjectsService, private timeTrackerService: TimeTrackerService) {}
  index: number;
  name = new Set;
  projects;
  nameList;
  subscription: Subscription;
  
  
  ngOnInit() {
    this.subscription = this.projectService.projectsChanged
    .subscribe(
      (projects: Project[]) => {
        this.projects = projects;
      }
    )
    this.projects = this.projectService.getProjects();
    // this.nameList = this.projectNameTracker();
  }


  // projectNameTracker() {
  //   for (let i = 0; i < this.projects.length; i++) {
  //     if (!this.name[this.projects[i].name]) {
  //       this.name[this.projects[i].name] = this.projects[i].totalTime;
  //     } else {
  //       this.name[this.projects[i].name] += this.projects[i].totalTime;
  //     }
  //   }
  //   // this.nameList = this.name.entries();
  //   console.log(this.name)
  //   return this.name;
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
