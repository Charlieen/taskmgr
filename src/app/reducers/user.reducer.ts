import { UserProject } from './../actions/user.actions';
import { filter } from 'rxjs/operators';
import { getSelectedId } from './project.reducer';
import * as actions from '../actions/user.actions';
import * as prjActions from  '../actions/project.action';
import { User } from 'app/domain/user.model';
import { Project } from 'app/domain/project.model';
import * as _ from 'lodash';
import {createSelector} from 'reselect';

/*
*定义一张状态表,
  1：全覆盖，
  2: UI 组件 使用方便，
  3：与 Store 中 State  运算方便。
  4：初始值，每次返回值（由action 触发），当前值（由 查询函数触发，系统自动返回当前值。），
*/
export interface State {
     ids:string[];
     entities:{[id:string]: User};


};

export const initialState: State = {
    ids:[],
    entities:{},

};

/*
 aciton.payload 与 本状态表内数据 的 交互，并返回新的 状态。
*/
const addUser = (state,action) => {
  const user = action.payload;
  const newIds= [...state.ids , user.id];
  const newEntities = {...state.entities , [user.id]: user };
  return state.entities[user.id]? {...state, entites:newEntities} :
              {...state, ids:newIds, entities:newEntities};
}

const updateUser = (state,action) => {
  const user = <User[]>action.payload;
  const incomingEntities = user.reduce(
    (entities,user:User) => ({...entities,[user.id]:user }),{});
  const newEntities = {...state.entites, ...incomingEntities};

 return {...state , entities:newEntities};
}

const delUser_old = (state,action) => {
  const user = <UserProject>action.payload;
  const newUser = <User>state.entites[user.user.id].projectIds.filter(id => id !== user.projectId);
  return state.entities[user.user.id]?
  {...state.entities,   [user.user.id]: newUser}:state;
}

const delUser = (state,action) => {
  const user = <UserProject> action.payload;

  console.log('user delUser reducer... '+ JSON.stringify(user));
  const newEntities = {...state.entities, [user.user.id]:user} // 有就更新，没有就添加
  return state.entities[user.user.id]?
  {...state.entities, entities:newEntities }:state;
}

const loadUser = (state,action) => {
  const temp = action.payload;

  const users= temp[0];
  const incomingIds= users.map(p => p.id);
  let newIds = _.difference(incomingIds,state.ids);
  const incomingEntities = _.chain(users)
    .keyBy('id')
    .mapValues(o => o)
    .value();
  const newEntities = newIds?
   newIds.reduce(
      (entities, id:string) => ({...entities ,[id]: incomingEntities[id]}),{}) : [];
  newIds = newIds ? newIds:[];
  return {
    ...state,
    ids: [...state.ids, ...newIds],
    entities:  {...state.entities,  ...newEntities},
  }
}



/*
  处理 那些 会导致状态内容 变化的  action (增删改查，选中)
*/
export function reducer(state = initialState, action: actions.Actions ): State {
  switch (action.type) {
    case actions.ActionTypes.ADD_SUCCESS: {
      return addUser(state,action);
    }
    case actions.ActionTypes.DELETE_SUCCESS: {
      return delUser(state,action);
    }

    case actions.ActionTypes.UPDATE_SUCCESS: {
      return updateUser(state,action);
    }

    case actions.ActionTypes.LOAD_SUCCESS: {
      return loadUser(state,action);
    }

    default: {
      return state;
    }
  }
}

/*
*  针对本状态表 的对外暴露的 查询函数。其中，createSelector 作为一个函数的连接器，非常好用。
*  调用这些查询函数，得到的状态返回值（当前值），取决于调用的时刻，本状态表的 状态是什么。。
*/
export const getIds = (state:State) => state.ids;
export const getEntities = (state:State) => state.entities;

export const getUsers = createSelector(getIds, getEntities, (ids,entities) => {
  return ids.map(id => entities[id]);
})
