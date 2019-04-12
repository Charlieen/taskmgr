import { getSelectedId } from './project.reducer';
import * as actions from '../actions/task-list.actions';
import * as prjActions from  '../actions/project.action';
import { TaskList } from 'app/domain/task-list.model';
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
     ids: string[];
     entities: {[id: string]: TaskList};
     selectedIds: string[],

};

export const initialState: State = {
    ids: [],
    entities: {},
    selectedIds: [],
};

/*
 aciton.payload 与 本状态表内数据 的 交互，并返回新的 状态。
*/
const addTaskList = (state, action) => {
  const tasklist = action.payload;
  if (state.entities[tasklist.id]){
    return state;
  }
  const newIds = [...state.ids , tasklist.id];
  const newEntities = {...state.entities , [tasklist.id]: tasklist };
return {...state , ids: newIds, entities: newEntities};
}

const updateTaskList = (state, action) => {
  const tasklist = action.payload;
  const newEntities = {...state.entities , [tasklist.id]: tasklist};
 return {...state , entities: newEntities};
}

const delTaskList = (state, action) => {
  const tasklist = action.payload;
  const newIds = state.ids.filter(id => id !== tasklist.id);
  const newEntities = newIds.reduce(
    (entities, id: string) => ({...entities , [id]: state.entities[id]}) , []);
  const newselectedIds = state.selectedIds.filter(id => id !== tasklist.id);

  return {
    ids: newIds,
    entities: newEntities,
    selectedIds: newselectedIds,
  }
}

const loadTaskList = (state, action) => {
  const tasklists = action.payload;
  console.log('task-list.reducer..' + JSON.stringify(tasklists));
  const incomingIds = tasklists.map(p => p.id);
  let newIds = _.difference(incomingIds, state.ids);
  const incomingEntities = _.chain(tasklists)
    .keyBy('id')
    .mapValues(o => o)
    .value();
  const newEntities = newIds ?
        //       reduce((entities, id) => ({...entities, [id]:state.entities[id]}) , {});
   newIds.reduce(
     (entities, id: string) => ({...entities , [id]: incomingEntities[id]}), {} ) : {};
  newIds = newIds ? newIds : [];
  return {
    ...state,
    ids: [...state.ids, ...newIds],
    entities:  {...state.entities,  ...newEntities},
  }
}

const swapTaskList = (state, action) => {

const taskLists = <TaskList[]> action.payload;
const updatedEntities = _.chain(taskLists)
    .keyBy('id')
    .mapValues(o => o)
    .value();

const newEntities = {...state.entities, ...updatedEntities};

return {...state,  entities: newEntities}


}
const selectPrj = (state, action) => {
  const selected = <Project> action.payload;
  const selectedIds = state.ids.filter(id => state.entities[id].projectid === selected.id);
  return {
    ...state,
    selectedIds: selectedIds
  }
}

const delListByPrj = (state, action) => {
  const project = <Project> action.payload;
  const taskListIds = project.taskList;
  const remainingIds = _.difference(state.ids, taskListIds);
  const remainingEntities =
  remainingIds.reduce(
    (entities, id) => ({...entities, [id]: state.entities[id]}) , {});

  return {
    ids: [...remainingIds],
    entities: remainingEntities,
    selectedIds: [],
  }
}




/*
  处理 那些 会导致状态内容 变化的  action (增删改查，选中)
*/
export function reducer(state = initialState, action: actions.Actions ): State {
  switch (action.type) {
    case actions.ActionTypes.ADD_SUCCESS: {
      return addTaskList(state, action);
    }
    case actions.ActionTypes.DELETE_SUCCESS: {
      return delTaskList(state, action);
    }
    case actions.ActionTypes.UPDATE_SUCCESS: {
      return updateTaskList(state, action);
    }
    case actions.ActionTypes.LOAD_SUCCESS: {
      return loadTaskList(state, action);
    }
    case actions.ActionTypes.SWAP_SUCCESS: {
      return swapTaskList(state, action);
    }
    // case prjActions.ActionTypes.SELECT_PROJECT: {
    //   return selectPrj(state, action);
    // }
    // case prjActions.ActionTypes.DELETE_SUCCESS: {
    //   return delListByPrj(state, action);
    // }
    default: {
      return state;
    }
  }
}

/*
*  针对本状态表 的对外暴露的 查询函数。其中，createSelector 作为一个函数的连接器，非常好用。
*  调用这些查询函数，得到的状态返回值（当前值），取决于调用的时刻，本状态表的 状态是什么。。
*/
export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getSelectedIds = (state: State) => state.selectedIds;
export const getSelected = createSelector(getIds, getEntities, (ids, entities) => {
  return ids.map(id => entities[id]);
})
