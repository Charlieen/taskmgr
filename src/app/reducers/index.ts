import { filter } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { NgModule } from '@angular/core';
import { StoreModule, combineReducers, ActionReducer } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import * as fromQuote from './quote.reducer'
import * as fromAuth from './auth.reducer';
import * as fromProject from './project.reducer';
import * as fromTaskList from './task-list.reducer';
import * as  fromTask from './task.reducer';
import * as  fromUser from './user.reducer';
import {storeFreeze} from 'ngrx-store-freeze';
import {compose} from '@ngrx/core/compose';
import { createSelector } from 'reselect';
import { FormatInputPathObject } from 'path';
import { Auth } from 'app/domain';
import * as authAction from '../actions/auth.actions';


//应用层面的，包含所有的
export interface State {
     quote: fromQuote.State;
     auth: Auth;
     project: fromProject.State;
     tasklist:fromTaskList.State;
     task:fromTask.State;
     user:fromUser.State;

};

const initialState: State = {

    quote:fromQuote.initialState,
    auth:fromAuth.initialState,
    project: fromProject.initialState,
    tasklist: fromTaskList.initialState,
    task: fromTask.initialState,
    user:fromUser.initialState,






};

const reducers= {
  quote: fromQuote.reducer,
  auth: fromAuth.reducer,
  project:fromProject.reducer,
  tasklist:fromTaskList.reducer,
  task:fromTask.reducer,
  user:fromUser.reducer,






};
const productionReducers:ActionReducer<State> = combineReducers(reducers);
const developmentReducers:ActionReducer<State> = compose(storeFreeze,combineReducers)(reducers) ;



export function reducer(state = initialState, action: any ): State {
  return action.type === authAction.ActionTypes.LOGOUT ? initialState :
   environment.production?  productionReducers(state,action): developmentReducers(state,action);
}

export const getQuoteState = (state: State) => state.quote;
export const getAuthState = (state: State) => state.auth;
export const getProjectState =(state:State) => state.project;
export const getTaskListSate =(state:State) => state.tasklist;
export const getTaskState = (state:State) => state.task;
export const getUserState =(state:State) => state.user;



//迭代
export const getQuote = createSelector(getQuoteState, fromQuote.getQuote);
export const getProjects = createSelector(getProjectState, fromProject.getAll);
export const getTaskLists = createSelector(getTaskListSate ,fromTaskList.getSelected)
export const getTasks = createSelector(getTaskState ,fromTask.getTasks);
export const getUsers = createSelector(getUserState ,fromUser.getUsers);


export const getUserEntities =createSelector(getUserState,fromUser.getEntities);

export const getTasksWithOwners = createSelector(getTasks,getUserEntities,
  (tasks,userEntities)=> {
    return tasks.map(task =>{
      return {
        ...task,
        owner:userEntities[task.ownerId],
        participants:task.participantIds.map(id=>userEntities[id]),
      }
    })
  }
);

export const getTaskByProject = createSelector(getProjects,getTasksWithOwners,(project,taskowner) =>{
  return project.map(p => p.taskList)
  .map( listid   => { [...taskowner].filter( t => [...listid].indexOf(t.taskListId)!== -1 )})
});

export const getTaskByLists = createSelector(getTaskLists,getTasksWithOwners,(lists,taskowner)=>{
   return lists.map(list =>{
     return {
        ...list,
        tasks:taskowner.filter(t => t.taskListId === list.id),
     }
   })
})

export const getProjectWithUsers = createSelector(getProjects,getUserEntities,(projects,users) =>{
  return projects.map( p => {
    return {...p,
            userMember: p.members.reduce(
              (us,id) =>({...us,[id]:users[id]}),[]),
    }
  } )
})

 export const getProjectUsers= (projectId:string) =>
 createSelector(getProjectState,getUserEntities,(state,entities) => {
    return state.entities[projectId].members
    .map(id => entities[id]);
 })


@NgModule({

  imports: [
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
  ],

})
export class AppStoreModule {

}
