import { SharedModule } from 'app/shared/shared.module';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './route/login.routering.module';
import { RegisterComponent } from './register/register.component';


@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule
  ],
  declarations:
  [LoginComponent,

    RegisterComponent]
})
export class LoginModule { }
