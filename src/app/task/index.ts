import { MdDialog } from '@angular/material';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { TaskHomeComponent } from './task-home/task-home.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskHeaderComponent } from './task-header/task-header.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { CopyTaskComponent } from './copy-task/copy-task.component';
import { EditListNameComponent } from './edit-list-name/edit-list-name.component';
import { AddTaskListComponent } from './add-task-list/add-task-list.component';
import { QuickTaskComponent } from './quick-task/quick-task.component';
import { TaskRoutingModule } from './task.routing';

@NgModule({
  imports: [
    SharedModule,
    TaskRoutingModule
  ],
  declarations: [
    TaskHomeComponent,
    TaskListComponent,
     TaskItemComponent,
     TaskHeaderComponent,
     NewTaskComponent,
     CopyTaskComponent,
     EditListNameComponent,
     AddTaskListComponent,
     QuickTaskComponent],

     entryComponents:[
      NewTaskComponent,
      CopyTaskComponent,
      EditListNameComponent,
      AddTaskListComponent,
     ]
     ,
     providers:[
       MdDialog
     ]
})
export class TaskModule { }
