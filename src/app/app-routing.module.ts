import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import { AuthGuard } from './auth/auth.guard';
import { ProjectSummaryComponent } from './projects/project-summary/project-summary.component';
import { TimerConsoleComponent } from './time-tracking/timer-console/timer-console.component';
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { NgModule } from "@angular/core";
import { ProjectsResolverService } from './projects/project-resolver.service';

const appRoutes: Routes = [
    {
        path: "", redirectTo: "/timer-console", pathMatch: "full", canActivate: [AuthGuard]
    },

        { path: "timer-console", component: TimerConsoleComponent, resolve: [ProjectsResolverService] },
        { path: 'edit', component: ProjectEditComponent, resolve: [ProjectsResolverService] },
          { path: ':id/edit', component: ProjectEditComponent, resolve: [ProjectsResolverService] },


    {
        path: "project-summary", component: ProjectSummaryComponent
    },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}