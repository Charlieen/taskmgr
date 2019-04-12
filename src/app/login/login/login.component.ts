
import{FormGroup , FormControl , FormBuilder ,Validators } from '@angular/forms';
import { Component, OnInit ,ChangeDetectionStrategy } from '@angular/core';
import { Quote } from 'app/domain/quote.model';
import { Observable } from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/quote.action';
import * as authActions from '../../actions/auth.actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  form2:FormGroup;
  quote$:Observable<Quote>;

  constructor(private fb:FormBuilder ,
    private store$: Store<fromRoot.State>) {



    this.form= fb.group(
      {email:['zgding@163.com',Validators.compose
      ([Validators.email,Validators.required])],
       password:['',Validators.required],});

    this.form2 = new FormGroup({
      email: new FormControl('zgding79@gmail.com',Validators.compose([Validators.required ,
      Validators.email])),
      password: new FormControl('',Validators.required),
    });

    this.quote$=this.store$.select(fromRoot.getQuote);
    this.store$.dispatch(new actions.LoadAction(null));

  }


  ngOnInit() {
    // this.form.controls['email'].setValidators(this.validate);
  }

  onSubmit({value,valid},ev:Event){

    ev.preventDefault();
    if(!valid){
      return;
    }

      this.store$.dispatch(new authActions.LoginAction(value));

  }


}
