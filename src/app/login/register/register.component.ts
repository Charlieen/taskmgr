import { Subscription } from 'rxjs/Rx';
import { MdIconRegistry } from '@angular/material';
import { Component, OnInit, OnDestroy  } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isValidDate } from 'app/utils/date.util';
import { isValidAddr, extractInfo, getAddrByCode} from 'app/utils/identity.util';
import {Store} from '@ngrx/store'
import * as fromRoot from '../../reducers';
import * as authActions from '../../actions/auth.actions';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

  form: FormGroup;
  items: string[];
  sub:Subscription;
  private readonly avatarName= 'avatars';

  constructor(private fb: FormBuilder,private state$:Store<fromRoot.State>) {


  }
/*
容器空间的概念， 变量的可见性。 namespace 的 使用，相当于  闭包 和 原来  scope 需要解决的问题。


*/
  ngOnInit() {

    const img=`${this.avatarName}:svg-${Math.floor(Math.random()*16).toFixed(0)}`;
    const nums=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    this.items = nums.map(i => `avatars:svg-${i}`);
    this.form = this.fb.group({
      email:[''],
      name:[],
      password:[],
      passwordrepeat:[],
      avatar:[img],
      dateOfBirth:['2012-02-17'],
      address:[],
      identity:[],
    });

    const id$= this.form.get('identity').valueChanges
      .debounceTime(300)
      .do(id => console.log(id))
      .filter(_ => this.form.get('identity').valid);

    this.sub= id$.subscribe(id =>{
      const info= extractInfo(id.identityNo);
      console.log(info);
      if(isValidAddr(info.addrCode)){

          const addr = getAddrByCode(info.addrCode);
          console.log('addr: '+ addr);
          this.form.get('address').patchValue(addr);
      }
      if(isValidDate(info.dateOfBirth)){
          this.form.get('dateOfBirth').patchValue(info.dateOfBirth);
      }
    })

  }



  onSubmit({value,valid},ev:Event){
      ev.preventDefault();
      if(!valid){
        return;
      }else{
       this.state$.dispatch(new authActions.RegisterAction(value));
      }
  }


}
