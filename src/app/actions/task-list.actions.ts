import { User } from './../domain/user.model';
import { Action } from '@ngrx/store';
import { TaskList} from '../domain/task-list.model';
import { type } from '../utils/type.util';
import { Auth } from 'app/domain/auth.model';


/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export  const   ActionTypes = {

  ADD:              type('[TaskList] Add'),
  ADD_SUCCESS:      type('[TaskList] Add Success'),
  ADD_FAIL:         type('[TaskList] Add Fail'),
  UPDATE:              type('[TaskList] Update'),
  UPDATE_SUCCESS:      type('[TaskList Update Success'),
  UPDATE_FAIL:         type('[TaskList] Update Fail'),
  DELETE:              type('[TaskList] Delete'),
  DELETE_SUCCESS:      type('[TaskList] Delete Success'),
  DELETE_FAIL:         type('[TaskList] Delete Fail'),
  LOAD:              type('[TaskList] Load'),
  LOAD_SUCCESS:      type('[TaskList] Load Success'),
  LOAD_FAIL:         type('[TaskList] Load Fail'),
  SWAP:              type('[TaskList] Swap'),
  SWAP_SUCCESS:      type('[TaskList] Swap Success'),
  SWAP_FAIL:         type('[TaskList] Swap Fail'),
  SELECT_TASKLIST:      type('[TaskList] Select TaskList'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class AddAction implements Action {
  readonly type = ActionTypes.ADD;

  constructor(public payload:TaskList) { }
}

export class AddSuccessAction implements Action {
  readonly type = ActionTypes.ADD_SUCCESS;

  constructor(public payload: TaskList) { }
}

export class AddFailAction implements Action {
  readonly type = ActionTypes.ADD_FAIL;

  constructor(public payload: string) { }
}

export class UpdateAction implements Action {
  readonly type = ActionTypes.UPDATE;

  constructor(public payload: TaskList) { }
}

export class UpdateSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_SUCCESS;

  constructor(public payload: TaskList) { }
}

export class UpdateFailAction implements Action {
  readonly type = ActionTypes.UPDATE_FAIL;

  constructor(public payload: string) { }
}

export class DeleteAction implements Action {
  readonly type = ActionTypes.DELETE;

  constructor(public payload: TaskList) { }
}

export class DeleteSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_SUCCESS  ;

  constructor(public payload: TaskList) { }
}

export class DeleteFailAction implements Action {
  readonly type = ActionTypes.DELETE_FAIL;

  constructor(public payload: string) { }
}

export class LoadAction implements Action {
  readonly type = ActionTypes.LOAD;

  constructor(public payload: string) { }
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS  ;

  constructor(public payload: TaskList[]) { }
}

export class LoadFailAction implements Action {
  readonly type = ActionTypes.LOAD_FAIL;

  constructor(public payload: string) { }
}

export class SelectAction implements Action {
  readonly type = ActionTypes.SELECT_TASKLIST;

  constructor(public payload: TaskList) { }
}

export class SwapAction implements Action {
  readonly type = ActionTypes.SWAP;

  constructor(public payload: {srcTaskList:TaskList, targetTaskList:TaskList}) { }
}

export class SwapSuccessAction implements Action {
  readonly type = ActionTypes.SWAP_SUCCESS  ;

  constructor(public payload: TaskList[]) { }
}

export class SwapFailAction implements Action {
  readonly type = ActionTypes.SWAP_FAIL;

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
            | SwapAction
            | SwapSuccessAction
            | SwapFailAction


