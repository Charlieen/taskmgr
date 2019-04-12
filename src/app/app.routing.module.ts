import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { CalendarHomeComponent } from './my-calendar/calendar-home/calendar-home.component';
import { TaskHomeComponent } from './task/task-home/task-home.component';
import { ProjectListComponent } from './project/project-list/project-list.component';

// const routes: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full'},
//   { path: 'projects', loadChildren: 'app/project#ProjectModule', pathMatch: 'full', canActivate: [AuthGuardService]},
//   { path: 'tasklists/:id', loadChildren: 'app/task#TaskModule', pathMatch: 'full',canActivate: [AuthGuardService]},
//   { path: 'mycal/:view', loadChildren: 'app/my-calendar#MyCalendarModule', pathMatch: 'full',canActivate: [AuthGuardService]},
// ];
// const routes: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full'},
//   { path: 'projects', redirectTo: '/projects', pathMatch: 'full'},
//   { path: 'tasklists', redirectTo: '/tasklists/:id', pathMatch: 'full'},
//   { path: 'mycal', redirectTo: '/mycal/:view', pathMatch: 'full'},
// ];

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'projects', component:ProjectListComponent},
  { path: 'tasklists/:id', component:TaskHomeComponent},
  { path: 'mycal/:view', component:CalendarHomeComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
