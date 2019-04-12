import { reducer } from './../reducers/auth.reducer';
import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect} from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { go} from '@ngrx/router-store';
import { Action ,Store  } from '@ngrx/store';
import * as fromRoot from '../reducers';

import * as actions from '../actions/task.actions';
import { TaskService } from './../services/task.service';
import { Task } from 'app/domain/task.model';

const gettask = (listid) => {
  let task:Task[];
   this.service$.get(listid)
      .subscribe(t => task=t);

      return task;
}

@Injectable()
export class TaskEffects {


  @Effect()
  loadTasks$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOAD)
    .map(toPayload)
    //tasklists => tasklists.reducer((tasks,list)=>([...tasks, ...(gettask(list.id))]),[])
    .switchMap( tasklists => this.service$.getByLists(tasklists)
       .map(tasks => new actions.LoadSuccessAction(tasks))
       .catch(err => Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
    );

    @Effect()
    addTasks$: Observable<Action> = this.actions$
      .ofType(actions.ActionTypes.ADD)
      .map(toPayload)
      .switchMap(task => this.service$.add(task)
          .map(t => new actions.AddSuccessAction(t))
          .catch(err => Observable.of(new actions.AddFailAction(JSON.stringify(err)))
      ));

  @Effect()
  updateTasks$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.UPDATE)
    .map(toPayload)
    .switchMap(task => this.service$.update(task))
       .map(t=> new actions.UpdateSuccessAction(t))
       .catch(err => Observable.of(new actions.UpdateFailAction(JSON.stringify(err)))
    );


    @Effect()
    delTasks$: Observable<Action> = this.actions$
      .ofType(actions.ActionTypes.DELETE)
      .map(toPayload)
      .switchMap(task => this.service$.delete(task))
         .map(t=> new actions.DeleteSuccessAction(t))
         .catch(err => Observable.of(new actions.DeleteFailAction(JSON.stringify(err)))
      );

      @Effect()
      completeTasks$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.COMPLETE)
        .map(toPayload)
        .switchMap(task => this.service$.complete(task))
           .map(t=> new actions.CompleteSuccessAction(t))
           .catch(err => Observable.of(new actions.CompleteFailAction(JSON.stringify(err)))
        );

        @Effect()
        move$: Observable<Action> = this.actions$
          .ofType(actions.ActionTypes.MOVE)
          .map(toPayload)
          .switchMap( ({taskId,taskListId}) => this.service$.move(taskId,taskListId))
             .map( task => new actions.MoveSuccessAction(task))
             .catch(err => Observable.of(new actions.MoveFailAction(JSON.stringify(err)))
          );

          @Effect()
          moveAll$: Observable<Action> = this.actions$
            .ofType(actions.ActionTypes.MOVE_ALL)
            .map(toPayload)
            .switchMap( ({srcListId,target}) => this.service$.moveAll(srcListId, target))
               .map( tasks => new actions.MoveALLSuccessAction(tasks ))
               .catch(err => Observable.of(new actions.MoveALLFailAction(JSON.stringify(err)))
            );

  constructor(
    private actions$: Actions ,
    private store$:Store<fromRoot.State>,
    private service$: TaskService){

  }


}
