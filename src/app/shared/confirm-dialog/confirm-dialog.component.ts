import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  template: `
  <h2 md-dialog-title>{{title}}</h2>
  <div md-dialog-content>
     {{confirmContent}}
  </div>
  <div md-dialog-actions>
      <button type="button" md-raised-button (click)="onClick()" color="primary">确认</button>
      <button type="button" md-dialog-close md-button>关闭</button>
  </div>
  `,
  styles: []
})
export class ConfirmDialogComponent implements OnInit {
 title:string;
 confirmContent:string;

  constructor(@Inject(MD_DIALOG_DATA) private data,
  private confirmDialogRef:MdDialogRef<ConfirmDialogComponent>) { }

  ngOnInit() {
    this.title= this.data.title;
    this.confirmContent= this.data.confirmContent;
  }

  onClick(){

       this.confirmDialogRef.close(true);
  }
}
