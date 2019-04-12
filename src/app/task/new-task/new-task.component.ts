import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MD_DIALOG_DATA, MdDialog, MdDialogRef } from '@angular/material';
import { Component, OnInit, Inject, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Task } from 'app/domain/task.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class NewTaskComponent implements OnInit {

  priorities = [{name:'普通',value:1},{name:'重要',value:2},{name:'紧急',value:3}];

  title;
  form:FormGroup;

  constructor(@Inject(MD_DIALOG_DATA) private data ,
  private fb:FormBuilder,
  private dialogRef: MdDialogRef<NewTaskComponent>) {

   }

  ngOnInit() {
    this.title= this.data.title;
    console.log('new-task'+ JSON.stringify(this.data));

    this.form= this.fb.group({
      desc:[this.data.task? this.data.task.desc : '', Validators.required],
      priority:[this.data.task? this.data.task.priority : 3, Validators.required],
      owner:[this.data.task? [this.data.task.owner] : [this.data.owner]],
      followers:[this.data.task? [this.data.task.participants] : []],
      dueDate:[this.data.task? this.data.task.dueDate : ''],
      reminder:[this.data.task? this.data.task.reminder : ''],
      remark:[this.data.task?   this.data.task.remark : '']
    });


  }


  onSubmit(ev:Event ,{value,valid}){
    ev.preventDefault();
    if(!valid){
      return ;
    }
    this.dialogRef.close({
      ...value,
      ownerId: value.owner.length >0 ? value.owner[0].id :null,
      participantIds: value.followers.map(f => f.id),
      owner:null,
      followers:null,
    });
  }
}
