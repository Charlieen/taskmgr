import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-add-task-list',
  templateUrl: './add-task-list.component.html',
  styleUrls: ['./add-task-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class AddTaskListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onClick(){

  }
}
