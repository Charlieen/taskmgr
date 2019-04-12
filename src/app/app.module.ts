import { MyCalendarModule } from './my-calendar/index';
import { ProjectModule } from './project/index';
import { LoginModule } from './login/login.module';
import { NgModule} from '@angular/core';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';

import {SharedModule } from './shared/shared.module'
import { TaskModule } from './task';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    LoginModule,
    ProjectModule,
    TaskModule,
    MyCalendarModule



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
