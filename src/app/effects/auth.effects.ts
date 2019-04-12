import { LoginSuccessAction } from './../actions/auth.actions';
import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect} from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { go} from '@ngrx/router-store';
import { Action } from '@ngrx/store';
import * as actions from '../actions/auth.actions';
import { AuthService } from './../services/auth.service';

/*
  监听： action,
  编排： action : {发射 action}  基于监听到的action的后续处理流程。
  改变： 路由，

*/
@Injectable()
export class AuthEffects {

  @Effect()
  login$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOGIN)
    .map(toPayload)
    .switchMap(({email, password}) => this.service$.login(email, password)
       .map(auth => new actions.LoginSuccessAction(auth))
       .catch(err => Observable.of(new actions.LoginFailAction(JSON.stringify(err))))
    );

    @Effect()
    register$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.REGISTER)
    .map(toPayload)
    .switchMap(user => this.service$.register(user)
       .map(q => new actions.RegisterSuccessAction(q))
       .catch(err => Observable.of(new actions.RegisterFailAction(JSON.stringify(err))))
    );

    @Effect()
    logout$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOGOUT )
    .map(_ => go(['/']));

    @Effect()
    loginAndNavigate$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOGIN_SUCCESS)
    .map(_ => go(['/projects']));

    @Effect()
    registerAndNavigate$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.REGISTER_SUCCESS )
    .map(_ => go(['/projects']));

  constructor(private actions$: Actions ,private service$: AuthService){

  }


}
