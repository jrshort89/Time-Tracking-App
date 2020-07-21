import { Injectable } from "@angular/core";


@Injectable()
export class TimeTrackerService {

    start: boolean = false;
    timer;
    seconds: number = 0;
    currentTimeTracked = this.timeTrackedFormatter(this.seconds);
    startTime;


    timerStart() {
        this.start = true;
        this.timer = setInterval(() => {
            this.seconds++;
            this.currentTimeTracked = this.timeTrackedFormatter(this.seconds);
        }, 1000);
        this.startTime = new Date();
    }

    timerStop() {
        clearInterval(this.timer);
        this.start = false;
        this.seconds = 0;
        this.currentTimeTracked = this.timeTrackedFormatter(this.seconds);
    }

    timeTrackedFormatter(seconds) {
        let minutes = 0;
        let hours = 0;
        while (seconds >= 3600) {
            seconds -= 3600;
            hours++;
        }
        while (seconds >= 60) {
            seconds -= 60;
            minutes++;
        }
        return ((hours < 10) ? "0" + hours : hours) + ":" + ((minutes < 10) ? "0" + minutes : minutes) + ":" + ((seconds < 10) ? "0" + seconds : seconds);
    }
}