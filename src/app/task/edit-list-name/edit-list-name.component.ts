import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-edit-list-name',
  templateUrl: './edit-list-name.component.html',
  styleUrls: ['./edit-list-name.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class EditListNameComponent implements OnInit {

  list:any;
  form:FormGroup;
  title:'';
  constructor(@Inject(MD_DIALOG_DATA) private data,
  private fb:FormBuilder,
  private dialogRef:MdDialogRef<EditListNameComponent>) { }

  ngOnInit() {
    this.form =this.fb.group({
      name:[this.data.taskList? this.data.taskList.name: '', Validators.required]
    });
    this.title = this.data.title;
  }
  onSubmit({value,valid}){
    if(!valid){
      return;
    }
    this.dialogRef.close(value);
  }
}
