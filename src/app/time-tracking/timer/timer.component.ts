import { Component, OnInit } from '@angular/core';
import { TimeTrackerService } from '../timeTracker.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  constructor(private timeTrackerService: TimeTrackerService) {}

  ngOnInit() {
  }

  // onStartTimer() {
  //   this.timeTrackerService.timerStart();
  // }

  // onStopTimer() {
  //   this.timeTrackerService.timerStop();
  // }

}
