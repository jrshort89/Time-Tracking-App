import { Project } from '../projects/project.model';
import { AuthService } from './../auth/auth.service';
import { ProjectsService } from '../projects/projects.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators'


@Injectable({providedIn: "root"})
export class DataStorageService {
    constructor(private http: HttpClient, private projectsService: ProjectsService
        , private authService: AuthService
        ) {}

    storeProjects() {
        const projects = this.projectsService.getProjects();
        this.http.put('https://time-tracker-c29a5.firebaseio.com/projects.json', projects).subscribe(
            (response) => {
                console.log(response);
            }
        );
    }

    fetchProjects() {
        return this.http
          .get<Project[]>(
            'https://time-tracker-c29a5.firebaseio.com/projects.json'
          ).pipe(tap(projects => {
            this.projectsService.setProjects(projects)
          }));
      }
    }