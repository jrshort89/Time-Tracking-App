import { TimeTrackerService } from '../time-tracking/timeTracker.service';

import { Project } from './project.model';
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable()
export class ProjectsService {
    constructor (private timeTrackerService: TimeTrackerService) {};
    startTime;
    overallProjectTracking = new Set;

    projectsChanged = new Subject<Project[]>();
    private projects: Project[] = [];

    setProjects(projects: Project[]) {
        this.projects = projects;
        this.projectsChanged.next(this.projects.slice());
      }

      addProject(
        name,
        description,
        startTime
        ) {
    
        this.projects.unshift(
          new Project(
            name,
            description,
            startTime.toLocaleTimeString(),
            new Date().toLocaleTimeString(),
            this.timeTrackerService.seconds,
            this.getTodaysDate(),
            this.timeTrackerService.timeTrackedFormatter(Math.round((new Date().getTime() - startTime.getTime()) / 1000))
          )
        )
        this.overallProjectTracking[name] = this.timeTrackerService.timeTrackedFormatter(Math.round((new Date().getTime() - startTime.getTime()) / 1000))
        this.projectsChanged.next(this.projects.slice());
        console.log(this.overallProjectTracking)
      }

      getProjects() {
        return this.projects.slice();
      }
    
      getProject(index: number) {
        return this.projects[index];
      }

      deleteTrackedTime(index: number) {
        this.projects.splice(index, 1);
        this.projectsChanged.next(this.projects.slice());
      }

      getTodaysDate() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
    
        return mm + '/' + dd + '/' + yyyy;
      }

      updateProject(index: number, project: Project) {
        this.projects[index] = project;
        this.projectsChanged.next(this.projects.slice());
      }

      projectNameTracker(name: string) {
          if (!this.overallProjectTracking[this.projects[name]]) {
            this.overallProjectTracking[this.projects[name]] = this.projects[name].totalTime;
          } else {
            this.overallProjectTracking[this.projects[name]] += this.projects[name].totalTime;
          }
        // this.overallProjectTrackingList = this.overallProjectTracking.entries();
        return this.overallProjectTracking;
      }
      
}

