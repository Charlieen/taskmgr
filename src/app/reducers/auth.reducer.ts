import { Auth } from './../domain/auth.model';
import * as actions from '../actions/auth.actions';

/*
   1：需要定义 状态，并初始化 状态
*/
export const initialState: Auth = { };


/*
   2:纯函数，能接收任何 Action ,只能单向的 接收 action , 不能发射 action;
   在reducer 内部，响应那些 需要与 UI 交互 状态的 action ,并完成响应的 状态的 处理工作。
*/
export function reducer(state = initialState, action: actions.Actions): Auth {
  switch (action.type) {
    case actions.ActionTypes.REGISTER_SUCCESS:
    case actions.ActionTypes.LOGIN_SUCCESS: {
      //做成新的值 返回回来，因为状态的值 是不可以改变的。
      return {...<Auth>action.payload};
    }

    case actions.ActionTypes.REGISTER_FAIL:
    case actions.ActionTypes.LOGIN_FAIL: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
