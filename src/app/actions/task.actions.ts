import { User } from './../domain/user.model';
import { Action } from '@ngrx/store';
import { Task} from '../domain/task.model';
import { type } from '../utils/type.util';
import { Auth } from 'app/domain/auth.model';
import { TaskList } from 'app/domain/task-list.model';


/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export  const   ActionTypes = {

  ADD:              type('[Task] Add'),
  ADD_SUCCESS:      type('[Task] Add Success'),
  ADD_FAIL:         type('[Task] Add Fail'),
  UPDATE:              type('[Task] Update'),
  UPDATE_SUCCESS:      type('[Task Update Success'),
  UPDATE_FAIL:         type('[Task] Update Fail'),
  DELETE:              type('[Task] Delete'),
  DELETE_SUCCESS:      type('[Task] Delete Success'),
  DELETE_FAIL:         type('[Task] Delete Fail'),
  LOAD:              type('[Task] Load'),
  LOAD_SUCCESS:      type('[Task] Load Success'),
  LOAD_FAIL:         type('[Task] Load Fail'),
  MOVE:              type('[Task] Move'),
  MOVE_SUCCESS:      type('[Task] Move Success'),
  MOVE_FAIL:         type('[Task] Move Fail'),
  MOVE_ALL:              type('[Task] Move ALL'),
  MOVE_ALL_SUCCESS:      type('[Task] Move ALL Success'),
  MOVE_ALL_FAIL:         type('[Task] Move ALL Fail'),
  COMPLETE:             type('[Task] Complete'),
  COMPLETE_SUCCESS:      type('[Task] Complete Success'),
  COMPLETE_FAIL:        type('[Task] Complete Fail'),
  SELECT_TASK:          type('[Task] Select Task'),

};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class AddAction implements Action {
  readonly type = ActionTypes.ADD;

  constructor(public payload:Task) { }
}

export class AddSuccessAction implements Action {
  readonly type = ActionTypes.ADD_SUCCESS;

  constructor(public payload: Task) { }
}

export class AddFailAction implements Action {
  readonly type = ActionTypes.ADD_FAIL;

  constructor(public payload: string) { }
}

export class UpdateAction implements Action {
  readonly type = ActionTypes.UPDATE;

  constructor(public payload: Task) { }
}

export class UpdateSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_SUCCESS;

  constructor(public payload: Task) { }
}

export class UpdateFailAction implements Action {
  readonly type = ActionTypes.UPDATE_FAIL;

  constructor(public payload: string) { }
}

export class DeleteAction implements Action {
  readonly type = ActionTypes.DELETE;

  constructor(public payload: Task) { }
}

export class DeleteSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_SUCCESS  ;

  constructor(public payload: Task) { }
}

export class DeleteFailAction implements Action {
  readonly type = ActionTypes.DELETE_FAIL;

  constructor(public payload: string) { }
}

export class LoadAction implements Action {
  readonly type = ActionTypes.LOAD;

  constructor(public payload: TaskList[]) { }
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS  ;

  constructor(public payload: Task[] ) {}
}

export class LoadFailAction implements Action {
  readonly type = ActionTypes.LOAD_FAIL;

  constructor(public payload: string) { }
}

export class SelectAction implements Action {
  readonly type = ActionTypes.SELECT_TASK;

  constructor(public payload: Task) { }
}

export class MoveAction implements Action {
  readonly type = ActionTypes.MOVE;

  constructor(public payload: {taskId:string, taskListId:string}) { }
}

export class MoveSuccessAction implements Action {
  readonly type = ActionTypes.MOVE_SUCCESS  ;

  constructor(public payload: Task) { }
}

export class MoveFailAction implements Action {
  readonly type = ActionTypes.MOVE_FAIL;

  constructor(public payload: string) { }
}

export class MoveALLAction implements Action {
  readonly type = ActionTypes.MOVE_ALL;

  constructor(public payload: {srcListId:string, targetListId:string}) { }
}

export class MoveALLSuccessAction implements Action {
  readonly type = ActionTypes.MOVE_ALL_SUCCESS  ;

  constructor(public payload: Task[]) { }
}

export class MoveALLFailAction implements Action {
  readonly type = ActionTypes.MOVE_ALL_FAIL;

  constructor(public payload: string) { }
}
export class CompleteAction implements Action {
  readonly type = ActionTypes.COMPLETE;

  constructor(public payload:Task) { }
}

export class CompleteSuccessAction implements Action {
  readonly type = ActionTypes.COMPLETE_SUCCESS  ;

  constructor(public payload: Task) { }
}

export class CompleteFailAction implements Action {
  readonly type = ActionTypes.COMPLETE_FAIL;

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
            | MoveAction
            | MoveSuccessAction
            | MoveFailAction
            | MoveALLAction
            | MoveALLSuccessAction
            | MoveALLFailAction
            | CompleteAction
            | CompleteSuccessAction
            | CompleteFailAction


