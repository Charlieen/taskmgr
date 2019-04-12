import { Component, OnInit ,Inject ,Input} from '@angular/core';
import { OverlayContainer } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']


})
export class AppComponent {
  darkTheme = false;



  constructor(private oc: OverlayContainer,
    @Inject('BASE_CONFIG') address){

    //  console.log(address);

  }


  OnInit(){

  }

  switchTheme(dark) {
    this.darkTheme= dark;
    this.oc.themeClass =dark? 'myapp-dark-theme':null;
  }

  projectNavLink(){

  }
}
