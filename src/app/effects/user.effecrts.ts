import { Injectable } from '@angular/core';
import { Actions, toPayload, Effect} from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { go} from '@ngrx/router-store';
import { Action ,Store  } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as projectAction from '../actions/project.action';
import * as actions from '../actions/user.actions';
import { UserService } from './../services/user.service';

@Injectable()
export class UserEffects {

  /*
  执行时机， 隐性的，加载project 时，就自动加载这个。
  */
  @Effect()
  loadUsers$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOAD)
    .map(toPayload)
    .switchMap( projectId => this.service$.getUsersOfProject(projectId)
       .map(users => new actions.LoadSuccessAction(users))
       .catch(err => Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
    );

    @Effect()
    addUserProjectRef$: Observable<Action> = this.actions$
      .ofType(actions.ActionTypes.ADD)
      .map(toPayload)
      .switchMap(({user,projectId}) => this.service$.addProjectRef(user,projectId)
          .map(u => new actions.AddSuccessAction(u))
          .catch(err => Observable.of(new actions.AddFailAction(JSON.stringify(err)))
      ));

  @Effect()
  updateUserProjectRef$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.UPDATE)
    .map(toPayload)
    .switchMap(project => this.service$.batchUpdateProjectRef(project))
       .map(users => new actions.UpdateSuccessAction(users))
       .catch(err => Observable.of(new actions.UpdateFailAction(JSON.stringify(err)))
    );


    @Effect()
    delUserProjectRef$: Observable<Action> = this.actions$
      .ofType(actions.ActionTypes.DELETE)
      .map(toPayload)
      .switchMap(({user,projectId}) => this.service$.removeProjectRef(user,projectId))
         .map(u => new actions.DeleteSuccessAction(u))
         .catch(err => Observable.of(new actions.DeleteFailAction(JSON.stringify(err)))
      );



    @Effect()
    search$: Observable<Action> = this.actions$
          .ofType(actions.ActionTypes.SEARCH)
          .map(toPayload)
          .switchMap( (str)  => this.service$.searchUser(str))
             .map(p=> new actions.SearchSuccessAction(p))
             .catch(err => Observable.of(new actions.SearchFailAction(JSON.stringify(err)))
          );

  constructor(
    private actions$: Actions ,
    private store$:Store<fromRoot.State>,
    private service$: UserService){

  }


}
