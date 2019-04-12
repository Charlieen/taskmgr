import { TaskList } from 'app/domain/task-list.model';
import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect} from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { go} from '@ngrx/router-store';
import { Action ,Store  } from '@ngrx/store';
import * as fromRoot from '../reducers';

import * as actions from '../actions/task-list.actions';
import * as taskActions from '../actions/task.actions';
import { TaskListService } from './../services/task-list.service';

@Injectable()
export class TaskListEffects {

  @Effect()
  loadTaskLists$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOAD)
    .map(toPayload)
    .switchMap( projectId => this.service$.get(projectId)
       .map(tasklists => new actions.LoadSuccessAction(tasklists))
       .catch(err => Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
    );

    @Effect()
    addTaskLists$: Observable<Action> = this.actions$
      .ofType(actions.ActionTypes.ADD)
      .map(toPayload)
      .do(tl => console.log(tl))
      .switchMap(tasklist => this.service$.add(tasklist)
          .map(tl => new actions.AddSuccessAction(tl))
          .catch(err => Observable.of(new actions.AddFailAction(JSON.stringify(err)))
      ));

  @Effect()
  updateTaskLists$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.UPDATE)
    .map(toPayload)
    .switchMap(tasklist => this.service$.update(tasklist))
       .map(p=> new actions.UpdateSuccessAction(p))
       .catch(err => Observable.of(new actions.UpdateFailAction(JSON.stringify(err)))
    );


    @Effect()
    delTaskLists$: Observable<Action> = this.actions$
      .ofType(actions.ActionTypes.DELETE)
      .map(toPayload)
      .switchMap(tasklist => this.service$.delete(tasklist))
         .map(p=> new actions.DeleteSuccessAction(p))
         .catch(err => Observable.of(new actions.DeleteFailAction(JSON.stringify(err)))
      );



    @Effect()
    swap$: Observable<Action> = this.actions$
          .ofType(actions.ActionTypes.SWAP)
          .map(toPayload)
          .switchMap(({srcList,targetList}) => this.service$.swapOrder(srcList,targetList))
             .map(p=> new actions.SwapSuccessAction(p))
             .catch(err => Observable.of(new actions.SwapFailAction(JSON.stringify(err)))
          );

      @Effect()
      loadTasksInTaskList$: Observable<Action> = this.actions$
                .ofType(actions.ActionTypes.LOAD_SUCCESS)
                .map(toPayload)
                .map(lists => new taskActions.LoadAction(lists));



  constructor(
    private actions$: Actions ,
    private store$:Store<fromRoot.State>,
    private service$: TaskListService){

  }


}
