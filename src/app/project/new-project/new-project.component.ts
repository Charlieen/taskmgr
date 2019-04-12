import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import {MD_DIALOG_DATA , MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class NewProjectComponent implements OnInit {

  form:FormGroup;
  title: string = '';
  coverImages =[];
  constructor(@Inject(MD_DIALOG_DATA) private data,
   private dialogRef: MdDialogRef<NewProjectComponent>
   ,private fb: FormBuilder) { }

  ngOnInit() {
    this.coverImages= this.data.thumbnails;
    if(this.data.project){
     this.form= this.fb.group({
        id:[this.data.project.id],
        name:[this.data.project.name,Validators.required],
        desc:[this.data.project.desc],
        coverImg:[this.data.project.coverImg],
        members:[],
      });
      this.title="修改项目"
    }else{
    this.form=  this.fb.group({
        id:[],
        name:['',Validators.required],
        desc:[],
        coverImg:[this.data.img],
        members:['1'],
      });
      this.title="新增项目"
    }
  }



  onSubmit({value,valid}, ev:Event){
    ev.preventDefault();
      if(!valid){
        return;
      }
     // console.log(value);
      this.dialogRef.close(value);
  }


}
