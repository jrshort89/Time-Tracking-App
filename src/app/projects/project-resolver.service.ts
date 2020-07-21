import { ProjectsService } from './projects.service';
import { Project } from './project.model';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';



@Injectable({ providedIn: 'root' })
export class ProjectsResolverService implements Resolve<Project[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private projectsService: ProjectsService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const projects = this.projectsService.getProjects();

    if (projects.length === 0) {
      return this.dataStorageService.fetchProjects();
    } else {
      return projects;
    }
  }
}
