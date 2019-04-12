import { User } from './../domain/user.model';
import { Action } from '@ngrx/store';
import { Auth} from '../domain/auth.model';
import { type } from '../utils/type.util';


/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export  const   ActionTypes = {

  LOGIN:              type('[Auth] Login'),
  LOGIN_SUCCESS:      type('[Auth] Login Success'),
  LOGIN_FAIL:         type('[Auth] Login Fail'),
  REGISTER:              type('[Auth] Register'),
  REGISTER_SUCCESS:      type('[Auth] Register Success'),
  REGISTER_FAIL:         type('[Auth] Register Fail'),
  LOGOUT:              type('[Auth]  Loadout'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
/*
从UI 交互 后 得到 数据 ，
*/
export class LoginAction implements Action {
  readonly type = ActionTypes.LOGIN;

  constructor(public payload: {email:string,password:string}) { }
}
/*
通过Http 与 服务端交互后，从服务端得到 返回的数据。-成功 ，
*/
export class LoginSuccessAction implements Action {
  readonly type = ActionTypes.LOGIN_SUCCESS;

  constructor(public payload: Auth) { }
}
/*
通过Http 与 服务端交互后，从服务端得到 返回的数据。-失败 ，
*/
export class LoginFailAction implements Action {
  readonly type = ActionTypes.LOGIN_FAIL;

  constructor(public payload: string) { }
}

/*
 从UI 交互 后 得到 数据  表单数据 ，
*/
export class RegisterAction implements Action {
  readonly type = ActionTypes.REGISTER;

  constructor(public payload: User) { }
}

/*
通过Http 与 服务端交互后，从服务端得到 返回的数据。-成功 ，
*/
export class RegisterSuccessAction implements Action {
  readonly type = ActionTypes.REGISTER_SUCCESS;

  constructor(public payload: Auth) { }
}
/*
通过Http 与 服务端交互后，从服务端得到 返回的数据。-失败 ，
*/
export class RegisterFailAction implements Action {
  readonly type = ActionTypes.REGISTER_FAIL;

  constructor(public payload: string) { }
}

/*
 从UI 交互 后 得到 数据  本处的场景下，不需要得到数据： null，
*/
export class LogoutAction implements Action {
  readonly type = ActionTypes.LOGOUT;

  constructor(public payload: null) { }
}



/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type  Actions
            = LoginAction
            | LoginSuccessAction
            | LoginFailAction
            | RegisterAction
            | RegisterSuccessAction
            | RegisterFailAction
            | LogoutAction


