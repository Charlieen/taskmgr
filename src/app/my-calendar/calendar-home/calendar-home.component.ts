import { ActivatedRoute } from '@angular/router';
import { cardAnim } from './../../anims/card.anim';
import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs/observable';
import {CalendarEvent } from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { TaskService } from 'app/services/task.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { start } from 'repl';
import { Task } from 'app/domain/task.model';
import {startOfDay,endOfDay} from 'date-fns';

const colors: any = {
  red: {
    primary:'#ad2121',
    secondary:'#FAE3E3'
  },
  blue: {
    primary:'#1e90ff',
    secondary:'#D1E8FF'
  },
  yellow: {
    primary:'#e3bc08',
    secondary:'#FDF1BA'
  },
}

const getColor = (priority:number)=> {
  switch (priority) {
    case 1:
    return colors.red;
    case 2:
    return colors.blue;
    default:
    return colors.yellow;
  }
}

@Component({
  selector: 'app-calendar-home',
  template:
  `
    <md-card>
        <div class="toolbar">
          <button md-icon-button mwlCalendarPreviousView>
              <md-icon class="md-48">chevron_left</md-icon>
          </button>

          <button md-icon-button mwlCalendarToday>
          {{viewDate | date: 'yyyy-MM-dd' }}
          </button>

          <button md-icon-button mwlCalendarNextView>
          <md-icon class="md-48">chevron_right</md-icon>
      </button>
        </div>
 <ng-container *ngIf=" (events$ | async) as calEvents">
  <div [ngSwitch]="view$ | async">

      <mwl-calendar-week-view *ngSwitchCase="'week'"
      [viewDate]="viewDate"
      [locale]="'zh'"
      [events]="calEvents"
      (eventClicked)="handleEvent($event.event)"
      >

      </mwl-calendar-week-view>
      <mwl-calendar-day-view *ngSwitchCase="'day'"
      [viewDate]="viewDate"
      [locale]="'zh'"
      [events]="calEvents"
      (eventClicked)="handleEvent($event.event)"
      >

      </mwl-calendar-day-view>

      <mwl-calendar-month-view *ngSwitchDefault
      [viewDate]="viewDate"
      [locale]="'zh'"
      [events]="calEvents"
      (eventClicked)="handleEvent($event.event)"
      >
      </mwl-calendar-month-view>
      </div>
      </ng-container>



    </md-card>
  `,
  styles: [`
  .toolbar {
    display:flex;
    flex-direction:row;
  }
  :host {
    width: 100%;

  }

  `]
})
export class CalendarHomeComponent implements OnInit {
  viewDate: Date;
  view$:Observable<string>;
  events$: Observable<CalendarEvent[]>

  constructor(
    private store$:Store<fromRoot.State>,
    private route: ActivatedRoute,private service:TaskService) {
    this.viewDate = new Date();
    this.view$ = this.route.paramMap.map(p => p.get('view'));

    this.events$ = this.store$.select(fromRoot.getAuthState)
    .map(auth => auth.user)
    .switchMap(user =>  this.service.getUserTasks(user.id).map(
      (tasks:Task[]) => tasks.reduce ((arrs,task)=>([...arrs,{
        start: startOfDay(task.createDate),
          end: endOfDay(task.dueDate),
          title: task.desc,
          color: getColor(task.priority),
      }]),[])
    ));

  }



  ngOnInit() {

  }

    handleEvent(){

    }
}
