import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { ProjectsService } from './projects/projects.service';
import { HeaderComponent } from './header/header.component';
import { TimeTrackerService } from './time-tracking/timeTracker.service';
import { TimerComponent } from './time-tracking/timer/timer.component';
import { TimerConsoleComponent } from './time-tracking/timer-console/timer-console.component';
import { TimeListComponent } from './time-tracking/timer-console/time-list/time-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectSummaryComponent } from './projects/project-summary/project-summary.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingService } from './logging.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import { TimeListEditComponent } from './time-tracking/time-list-edit/time-list-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TimerComponent,
    TimerConsoleComponent,
    TimeListComponent,
    ProjectSummaryComponent,
    ProjectEditComponent,
    TimeListEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [
  ],
  providers: [TimeTrackerService,
              ProjectsService,
            LoggingService,
          {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
        ],
  bootstrap: [AppComponent]
})
export class AppModule { }
