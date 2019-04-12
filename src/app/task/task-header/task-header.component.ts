import { MdDialog } from '@angular/material';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NewTaskComponent } from '../new-task/new-task.component';
import { TaskList } from 'app/domain';


@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss']
})
export class TaskHeaderComponent implements OnInit {
  @Input() header:string ='';
  @Input() list: TaskList;

  @Output() newTask = new  EventEmitter<void>();

  @Output() newCopyTask = new  EventEmitter<void>();

  @Output() editListName = new  EventEmitter<void>();

  @Output() deleteListName = new  EventEmitter<void>();

  constructor(private dialog:MdDialog , private cd: ChangeDetectorRef) {
    this.cd.markForCheck();
   }

  ngOnInit() {

    console.log('at task header:: '+JSON.stringify(this.list) );
      this.cd.markForCheck();
  }

  onClick(){

     this.newTask.emit();
  }

  onMoveClick(tasklist){

    this.newCopyTask.emit(tasklist);
  }

  onEditListNameClick(tasklist){

      this.editListName.emit(tasklist);
  }

  onDeleteClick(tasklist){

      this.deleteListName.emit(tasklist);
  }
}
