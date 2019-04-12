import { UserService } from './../services/user.service';
import { LoadSuccessAction } from './../actions/task-list.actions';
import { UpdateFailAction } from './../actions/project.action';
import { LoginSuccessAction } from './../actions/auth.actions';
import { Injectable, NgZone } from '@angular/core';
import { Actions, toPayload, Effect} from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { go} from '@ngrx/router-store';
import { Action ,Store ,State } from '@ngrx/store';
import * as fromRoot from '../reducers';

import * as actions from '../actions/project.action';
import * as userActions from '../actions/user.actions';

import { ProjectService } from './../services/project.service';
import { Auth } from 'app/domain/auth.model';
import * as listActions from '../actions/task-list.actions';
import { Project } from 'app/domain/project.model';
import { User } from 'app/domain/user.model';

@Injectable()
export class ProjectEffects {



  @Effect()
  loadProjects$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOAD)
    .map(toPayload)
    .withLatestFrom(this.store$.select(fromRoot.getAuthState))
    .switchMap(([_ ,auth]) => this.service$.get(auth.userId)
       .map(projects => new actions.LoadSuccessAction(projects))
       .catch(err => Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
    );

    @Effect()
    addProjects$: Observable<Action> = this.actions$
      .ofType(actions.ActionTypes.ADD)
      .map(toPayload)
      .withLatestFrom(this.store$.select(fromRoot.getAuthState).map(auth => auth.user))
      .switchMap(([project ,user]) => {
        const added = {...project, members:[`${user.id}`]};
        return this.service$.add(added);
      })
         .map(project => new actions.AddSuccessAction(project))
         .catch(err => Observable.of(new actions.AddFailAction(JSON.stringify(err)))
      );

  @Effect()
  updateProjects$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.UPDATE)
    .map(toPayload)
    .switchMap(project => this.service$.update(project))
       .map(p=> new actions.UpdateSuccessAction(p))
       .catch(err => Observable.of(new actions.UpdateFailAction(JSON.stringify(err)))
    );


    @Effect()
    delProjects$: Observable<Action> = this.actions$
      .ofType(actions.ActionTypes.DELETE)
      .map(toPayload)
      .switchMap(project => this.service$.delete(project))
         .map(p=> new actions.DeleteSuccessAction(p))
         .catch(err => Observable.of(new actions.DeleteFailAction(JSON.stringify(err)))
      );

        @Effect()
        selectProjects$: Observable<Action> = this.actions$
          .ofType(actions.ActionTypes.SELECT_PROJECT)
          .map(toPayload)
          .map(project =>
             go([`/tasklists/${project.id}`]))
          ;

       @Effect()
        loadTaskLists$: Observable<Action> = this.actions$
          .ofType(actions.ActionTypes.SELECT_PROJECT)
          .map(toPayload)
          .map(project => new listActions.LoadAction(project.id))
          ;

    @Effect()
    invite$: Observable<Action> = this.actions$
          .ofType(actions.ActionTypes.INVITE)
          .map(toPayload)
          .switchMap(({projectId,members}) => this.service$.invite(projectId,members))
             .map(p=> new actions.InviteSuccessAction(p))
             .catch(err => Observable.of(new actions.InviteFailAction(JSON.stringify(err)))
          );
        /*
        我在这里，
        1：可以监听 自己的，也可以是别人的 action -- （整个 action 空间内的所有的action)
        2: 可以 向 空间内 ，再次发射 本空间内的 任意 action;
        3: 这种灵活性 来支撑 应用的负责性，基础是，做了充分的 单一性， 充分的分离，充分的解耦和 {业务逻辑的基础架构 }之后
           的再 极度的交互性（ 业务逻辑在运行时的 高度复杂性）。
        4：组件不需要 关心 这些 运行时 的 胶着的 复杂性，只是 各司其职的  维护自己的ui交互，并发射 action 就可以了，
           至于 action  之后的 那些事情 就由 effects 来 以一种 胶水式的 灵活性 来维护了。
        */
          @Effect()
          loadProjectUser$: Observable<Action> = this.actions$
                .ofType(actions.ActionTypes.LOAD_SUCCESS)
                .map(toPayload)
                .switchMap((projects:Project[]) => Observable.from(projects.map(prj => prj.id))
                  .map(projectId => new userActions.LoadAction(projectId))
                );

                @Effect()
                addUserProject$: Observable<Action> = this.actions$
                      .ofType(actions.ActionTypes.LOAD_SUCCESS)
                      .map(toPayload)
                      .switchMap((projects:Project[]) => Observable.from(projects.map(prj => prj.id))
                        .map(projectId => new userActions.LoadAction(projectId))
                      );
      @Effect()
      addUserProjectRef$:Observable<Action> = this.actions$
      .ofType(actions.ActionTypes.ADD_SUCCESS)
      .map(toPayload)
      .map(project => project.id)
      .withLatestFrom(this.store$.select(fromRoot.getAuthState)
      .map(auth => auth.user),(projectid:string ,user)=>{
          return new userActions.AddAction({user:user, projectId:projectid});
      });

      @Effect()
      removeUserProjectRef$:Observable<Action> = this.actions$
      .ofType(actions.ActionTypes.DELETE_SUCCESS)
      .map(toPayload)
      .map(project => project.id)
      .withLatestFrom(this.store$.select(fromRoot.getAuthState).map(auth => auth.user),
      (projectId:string,user)=> {return new userActions.DeleteAction({user:user, projectId:projectId})})
      ;

      @Effect()
      updateUserProjectRef$:Observable<Action> = this.actions$
      .ofType(actions.ActionTypes.INVITE_SUCCESS)
      .map(toPayload)
      .map(project => new userActions.UpdateAction(project));


  constructor(
    private actions$: Actions ,
    private store$:Store<fromRoot.State>,
    private service$: ProjectService,
    private userService$:UserService,
    private zone:NgZone){

  }


}


