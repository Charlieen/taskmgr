import { expressionType } from '@angular/compiler/src/output/output_ast';
import {EffectsRunner , EffectsTestingModule } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';
import { TestBed, inject , fakeAsync } from '@angular/core/testing';
import { AuthEffects } from './auth.effects';
import { AuthService } from '../services/auth.service';
import * as actions from '../actions/auth.actions';


describe('测试 AuthEffects', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        EffectsTestingModule,
      ],
      providers: [
        AuthEffects,
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('authService',['login','register'])
        }
      ]
    });
  });

  function setup(methodName: string, params:{returnedAuth:any}){
    const authService = TestBed.get(AuthService);
    if(params){
      if(methodName === 'login') {
          authService.login.and.returnValue(params.returnedAuth);
      }else {
           authService.register.and.returnValue(params.returnedAuth);
      }
      return {
          runner: TestBed.get(EffectsRunner),
          authEffects: TestBed.get(AuthEffects)
      }
    }
  }

  it('登录成功发送 LoginSuccessAction', fakeAsync(() => {

    const auth = {
      token: '',
      user: {
        id:'123abc',
        name:'zgding',
        email:'zgding79@gmail.com'
      }
    };

    const  {runner , authEffects } = setup('login', {returnedAuth: Observable.of(auth)});
    const  expectedResult = new actions.LoginSuccessAction(auth);
    runner.queue(new actions.LoginAction({email:'zgding79@gmail.com', password: '123abc'}));
    authEffects.login$.subscribe(_result => expect(_result).toEqual(expectedResult));


  }));
});
