import { MdDialog, MdDialogRef } from '@angular/material';
import { NgModule } from '@angular/core';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { InviteComponent } from './invite/invite.component';
import { ProjcetListRoutingModule } from './project-list/project-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { InviteRoutingModule } from './invite/invite.routing.module';


@NgModule({
  imports: [
    SharedModule,
    ProjcetListRoutingModule,
    InviteRoutingModule,
  ],
  declarations:
  [ ProjectListComponent,
    ProjectItemComponent,
    NewProjectComponent,
    InviteComponent,
  ],
  entryComponents:[
    NewProjectComponent,
    InviteComponent,
  ],

    providers: [
      MdDialog,
    ],

})
export class ProjectModule { }
