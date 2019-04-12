import { FormBuilder, FormGroup } from '@angular/forms';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { Component, OnInit, Input, Inject, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-copy-task',
  templateUrl: './copy-task.component.html',
  styleUrls: ['./copy-task.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class CopyTaskComponent implements OnInit {

  lists: any[];
  form:FormGroup;
  /*
  组件 类之间，传递数据 ，使用 @Inject(MD_DIALOG_DATA)  方式。
  组件和 模板之间  传递数据 ，多用 @input() 和 @output()
  */
  constructor(
    @Inject(MD_DIALOG_DATA) private data,
    private fb:FormBuilder,
    private dialogRef:MdDialogRef<CopyTaskComponent>
  ) { }

  ngOnInit() {
    this.lists = this.data.lists;
    this.form =this.fb.group({
      targetListId:[],
    });
  }
  onSubmit(ev:Event, {valid,value}){
    ev.preventDefault();
    if(!valid){
      return;
    }
    this.dialogRef.close(value.targetListId);
  }
}
;
