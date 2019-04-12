import { SharedModule } from 'app/shared/shared.module';
import { MyCalendarRoutingModule } from './calendar.routing';
import { NgModule } from '@angular/core';
import { CalendarHomeComponent } from './calendar-home/calendar-home.component';
import { CalendarModule } from 'angular-calendar';

@NgModule({
  imports: [
    SharedModule,
    CalendarModule.forRoot(),
    MyCalendarRoutingModule
  ],
  declarations: [CalendarHomeComponent]
})
export class MyCalendarModule { }
