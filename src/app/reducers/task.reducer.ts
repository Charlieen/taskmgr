import { filter } from 'rxjs/operators';
import { getSelectedId } from './project.reducer';
import * as actions from '../actions/task.actions';
import * as prjActions from  '../actions/project.action';
import { Task } from 'app/domain/task.model';
import { Project } from 'app/domain/project.model';
import * as _ from 'lodash';
import {createSelector} from 'reselect';
import { TaskList } from 'app/domain/task-list.model';

/*
*定义一张状态表,
  1：全覆盖，
  2: UI 组件 使用方便，
  3：与 Store 中 State  运算方便。
  4：初始值，每次返回值（由action 触发），当前值（由 查询函数触发，系统自动返回当前值。），
*/
export interface State {
     ids:string[];
     entities:{[id:string]: Task};


};

export const initialState: State = {
    ids:[],
    entities:{},

};

/*
 aciton.payload 与 本状态表内数据 的 交互，并返回新的 状态。
*/
const addTask = (state,action) => {
  const task = action.payload;

  console.log('addTask...' + JSON.stringify(task));

  if(state.entities[task.id]){
    return state;
  }
  const newIds= [...state.ids , task.id];
  const newEntities = {...state.entities , [task.id]: task };
return {...state ,ids:newIds, entities:newEntities};
}

const updateTask = (state,action) => {
  const task = action.payload;
  const newEntities = {...state.entities , [task.id]: task};
 return {...state , entities:newEntities};
}

const delTask = (state,action) => {
  const task = action.payload;
  const newIds = state.ids.filter(id => id !== task.id);
  const newEntities = newIds.reduce(
    (entities,id:string) => ({...entities , [id]: state.entities[id]}) , []);

  return {
    ids: newIds,
    entities: newEntities,
  }
}

const loadTask = (state,action) => {
  const tasks =<Task[]> action.payload;
  const incomingIds= tasks.map(p => p.id);
  let newIds = _.difference(incomingIds,state.ids);
  const incomingEntities = _.chain(tasks)
    .keyBy('id')
    .mapValues(o => o)
    .value();
  const newEntities = newIds?
        //       reduce((entities, id) => ({...entities, [id]:state.entities[id]}) , {});
   newIds.reduce(
     (entities, id:string) => ({...entities ,[id]: incomingEntities[id]}),[] ) : {};
  newIds = newIds ? newIds:[];
  return {
    ...state,
    ids: [...state.ids, ...newIds],
    entities:  {...state.entities,  ...newEntities},
  }
}

const swapTask = (state,action) => {

const taskLists = <Task[]> action.payload;
const updatedEntities = _.chain(taskLists)
    .keyBy('id')
    .mapValues(o => o)
    .value();

const newEntities ={...state.entities, ...updatedEntities};

return {...state,  entities:newEntities}


}
/*
   需要对es6 的集合运算总结一下。
*/
const moveAllTasks = (state,action) => {

  const tasks = <Task[]> action.payload;
  const updatedEntities = tasks.reduce(
    (entities,task)=>({...entities , [task.id]:task}),[]);

  // const updateEntities = _.chain(tasks)
  //   .keyBy('id')
  //   .mapValues(o => o)
  //   .value();
  // const updateIds = tasks.map(task => task.id);
  // const newincoming = _.difference(state.ids,updateIds);

  // updateIds.reduce((entites,id:string) => ({
  //   ...state.entites, [id]: updateEntities[id]}),{});

    return {
      ...state, entities: {...state.entities, ...updatedEntities}
    };
}



const delByPrj = (state,action) => {
  const project = <Project> action.payload;
  const taskListIds = project.taskList;

  const remainingIds = state.ids.filter(id => taskListIds.indexOf(state.entities[id].taskListId ) ===  -1 )
  const remainingEntities =
  remainingIds.reduce(
    (entities, id) => ({...entities, [id]:state.entities[id]}) , []);

  return {
    ids:[... remainingIds],
    entities: remainingEntities,
  }
}




/*
  处理 那些 会导致状态内容 变化的  action (增删改查，选中)
*/
export function reducer(state = initialState, action: actions.Actions ): State {
  switch (action.type) {
    case actions.ActionTypes.ADD_SUCCESS: {
      return addTask(state,action);
    }
    case actions.ActionTypes.DELETE_SUCCESS: {
      return delTask(state,action);
    }
    case actions.ActionTypes.MOVE_SUCCESS:
    case actions.ActionTypes.COMPLETE_SUCCESS:
    case actions.ActionTypes.UPDATE_SUCCESS: {
      return updateTask(state,action);
    }
    case actions.ActionTypes.LOAD_SUCCESS: {
      return loadTask(state,action);
    }
    case actions.ActionTypes.MOVE_ALL_SUCCESS:{
      return moveAllTasks(state,action);
    }


    case prjActions.ActionTypes.DELETE_SUCCESS:{
      return delByPrj(state,action);
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

export const getTasks = createSelector(getIds, getEntities, (ids,entities) => {
  return ids.map(id => entities[id]);
})
