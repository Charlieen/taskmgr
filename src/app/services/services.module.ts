import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { TaskService } from './task.service';
import { QuoteService } from './quote.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ProjectService } from './project.service';
import { TaskListService } from './task-list.service';
import { UserService } from './user.service';

@NgModule()
export class ServicesModule {

  static forRoot():ModuleWithProviders{
    return {
      ngModule: ServicesModule,
      providers:[
        QuoteService,
        ProjectService,
        TaskListService,
        TaskService,
        UserService,
        AuthService,
        AuthGuardService
      ]
    }
  }
 }
