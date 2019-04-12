import { CalendarHomeComponent } from './calendar-home/calendar-home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';



const routes: Routes = [
  { path: 'mycal/:view', component: CalendarHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyCalendarRoutingModule {}
