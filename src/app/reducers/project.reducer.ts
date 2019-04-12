import * as actions from '../actions/project.action';
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
     entities:{[id:string]: Project};
     selectedId: string | null;
};

export const initialState: State = {
    ids:[],
    entities:{},
    selectedId:null
};

/*
 aciton.payload 与 本状态表内数据 的 交互，并返回新的 状态。
*/
const addProject = (state,action) => {
  const project = action.payload;
  if(state.entities[project.id]){
    return state;
  }
  const newIds= [...state.ids , project.id];
  const newEntities = {...state.entities , [project.id]: project };
return {...state ,ids:newIds, entities:newEntities};
}

const updateProject = (state,action) => {
  const project = action.payload;
  const newEntities = {...state.entities , [project.id]:project};
 return {...state , entities:newEntities};
}

const delProject = (state,action) => {
  const project = action.payload;
  console.log('03_delete reducer..'+ JSON.stringify(project));

  const newIds = state.ids.filter(id => id !== project.id);
  const newEntities = newIds.reduce(
    (entities,id:string) => ({...entities , [id]: state.entities[id]}) , []);
  return {
    ids: newIds,
    entities: newEntities,
    selectedId:null
  }
}

const loadProject = (state,action) => {
  const projects = action.payload;

  if(projects.length === 0 ){
    return initialState;
  }

  const incomingIds= projects.map(p => p.id);
  let newIds = _.difference(incomingIds,state.ids);


  const incomingEntities =_.chain(projects)
    .keyBy('id')
    .mapValues(o => o)
    .value();



  const newEntities = (newIds)?
   newIds.reduce(
     (entities, id:string) => ({...entities ,[id]: incomingEntities[id]}),[]) : [];

   newIds = newIds ? newIds :[];
  return {
    ids: [...state.ids, ...newIds],
    entities:  {...state.entities,  ...newEntities},
    selectedId:null
  }
}
/*
  处理 那些 会导致状态内容 变化的  action (增删改查，选中)
*/
export function reducer(state = initialState, action: actions.Actions ): State {
  switch (action.type) {
    case actions.ActionTypes.ADD_SUCCESS: {
      return addProject(state,action);
    }
    case actions.ActionTypes.DELETE_SUCCESS: {
      return delProject(state,action);
    }
    case actions.ActionTypes.INVITE_SUCCESS:
    case actions.ActionTypes.UPDATE_SUCCESS: {
      return updateProject(state,action);
    }
    case actions.ActionTypes.LOAD_SUCCESS: {
      return loadProject(state,action);
    }
    case actions.ActionTypes.SELECT_PROJECT: {
      return {...state , selectedId: (((action.payload) as Project).id)} ;
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
export const getIds= (state:State) => state.ids;
export const getEntities= (state:State) => state.entities;
export const getSelectedId= (state:State) => state.selectedId;
export const getAll = createSelector(getIds, getEntities, (ids,entities)=>{
  return ids.map(id=>entities[id]);
})
