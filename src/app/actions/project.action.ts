import { User } from './../domain/user.model';
import { Action } from '@ngrx/store';
import { Project} from '../domain/project.model';
import { type } from '../utils/type.util';


/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * 只关心 action 名称（ 语义）和 需要 携带 什么样的数据就可以了。
 */
export  const   ActionTypes = {

  ADD:              type('[Project] Add'),
  ADD_SUCCESS:      type('[Project] Add Success'),
  ADD_FAIL:         type('[Project] Add Fail'),
  UPDATE:              type('[Project] Update'),
  UPDATE_SUCCESS:      type('[Project Update Success'),
  UPDATE_FAIL:         type('[Project] Update Fail'),
  DELETE:              type('[Project] Delete'),
  DELETE_SUCCESS:      type('[Project] Delete Success'),
  DELETE_FAIL:         type('[Project] Delete Fail'),
  LOAD:              type('[Project] Load'),
  LOAD_SUCCESS:      type('[Project] Load Success'),
  LOAD_FAIL:         type('[Project] Load Fail'),
  INVITE:              type('[Project] Invite'),
  INVITE_SUCCESS:      type('[Project] Invite Success'),
  INVITE_FAIL:         type('[Project] Invite Fail'),
  SELECT_PROJECT:      type('[Project] Select Project'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

 /*
    ui form data to Project
 */
export class AddAction implements Action {
  readonly type = ActionTypes.ADD;

  constructor(public payload:Project) { }
}

 /*
    http from db UI  with  Project
 */
export class AddSuccessAction implements Action {
  readonly type = ActionTypes.ADD_SUCCESS;

  constructor(public payload: Project) { }
}

/*
    http from db UI  with  Project
 */
export class AddFailAction implements Action {
  readonly type = ActionTypes.ADD_FAIL;

  constructor(public payload: string) { }
}

 /*
    ui form data to Project
 */
export class UpdateAction implements Action {
  readonly type = ActionTypes.UPDATE;

  constructor(public payload: Project) { }
}

/*
    http from db UI  with  Project
 */
export class UpdateSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_SUCCESS;

  constructor(public payload: Project) { }
}

export class UpdateFailAction implements Action {
  readonly type = ActionTypes.UPDATE_FAIL;

  constructor(public payload: string) { }
}

 /*
    ui form data to Project
 */
export class DeleteAction implements Action {
  readonly type = ActionTypes.DELETE;

  constructor(public payload: Project) { }
}

export class DeleteSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_SUCCESS  ;

  constructor(public payload: Project) { }
}

export class DeleteFailAction implements Action {
  readonly type = ActionTypes.DELETE_FAIL;

  constructor(public payload: string) { }
}

 /*
    don't need from  ui get data ,  不需要用户指定。
 */
export class LoadAction implements Action {
  readonly type = ActionTypes.LOAD;

  constructor(public payload: null) { }
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS  ;

  constructor(public payload: Project[]) { }
}

export class LoadFailAction implements Action {
  readonly type = ActionTypes.LOAD_FAIL;

  constructor(public payload: string) { }
}


export class SelectAction implements Action {
  readonly type = ActionTypes.SELECT_PROJECT;

  constructor(public payload: Project) { }
}

 /*
    需要收集，用户选择完邀请的人后，得到的数据 ，
 */
export class InviteAction implements Action {
  readonly type = ActionTypes.INVITE;

  constructor(public payload: {projectId:string, members:User[]}) { }
}

export class InviteSuccessAction implements Action {
  readonly type = ActionTypes.INVITE_SUCCESS  ;

  constructor(public payload:Project) { }
}

export class InviteFailAction implements Action {
  readonly type = ActionTypes.INVITE_FAIL;

  constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type  Actions
            = AddAction
            | AddSuccessAction
            | AddFailAction
            | UpdateAction
            | UpdateSuccessAction
            | UpdateFailAction
            | DeleteAction
            | DeleteSuccessAction
            | DeleteFailAction
            | LoadAction
            | LoadSuccessAction
            | LoadFailAction
            | InviteAction
            | InviteSuccessAction
            | InviteFailAction
            | SelectAction


