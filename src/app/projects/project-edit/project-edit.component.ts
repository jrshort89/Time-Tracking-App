import { TimeTrackerService } from './../../time-tracking/timeTracker.service';
import { ProjectsService } from './../projects.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  id: number;
  editMode = false;
  projectForm: FormGroup;
  projectTotalTime;
  


  get projectControls() {
    return (this.projectForm.get('project') as FormArray).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private router: Router,
    private timeTrackerService: TimeTrackerService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.projectsService.updateProject(this.id, this.projectForm.value);
    } else {
      // this.projectsService.addProject(this.projectForm.value);
    }
    this.onCancel();
  }

 

  onCancel() {
    this.router.navigate(['timer-console']);
  }

  private initForm() {
    let projectName = '';
    let projectDescription = '';
    let projectStartTime = '';
    let projectEndTime = '';
    let projectSeconds = 0;
    let projectDateTracked = '';
    let projectTotalTime = '';

    if (this.editMode) {
      const project = this.projectsService.getProject(this.id);
      projectName = project.name;
      projectDescription = project.description;
      projectStartTime = project.startTime;
      projectEndTime = project.endTime;
      projectSeconds = project.seconds;
      projectDateTracked = project.dateTracked;
      projectTotalTime = project.totalTime;
    }

    this.projectForm = new FormGroup({
      name: new FormControl(projectName, Validators.required),
      description: new FormControl(projectDescription, Validators.required),
      startTime: new FormControl(projectStartTime, Validators.required),
      endTime: new FormControl(projectEndTime, Validators.required),
      seconds: new FormControl(projectSeconds),
      dateTracked: new FormControl(projectDateTracked),
      totalTime: new FormControl(projectTotalTime)
    });
  }
}
