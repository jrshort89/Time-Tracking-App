import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-time-list-edit',
  templateUrl: './time-list-edit.component.html',
  styleUrls: ['./time-list-edit.component.css']
})
export class TimeListEditComponent implements OnInit {
  id: number;
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
  }

}
