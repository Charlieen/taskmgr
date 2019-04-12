import { NewTaskComponent } from './../new-task/new-task.component';
import { Component, OnInit ,Input, ChangeDetectionStrategy } from '@angular/core';
import { MdDialog } from '@angular/material';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit {

  constructor(private dialog: MdDialog) { }

  ngOnInit() {

  }
  newTaskDialog(){
    this.dialog.open(NewTaskComponent);
  }

}
