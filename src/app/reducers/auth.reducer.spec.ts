import {reducer} from './auth.reducer';
import * as fromAuth from './auth.reducer';
import * as actions from '../actions/auth.actions';
import { async } from '@angular/core/testing';
import { expressionType } from '@angular/compiler/src/output/output_ast';


describe('测试 AuthReducer', () => {

  describe( '未定义Action', ()=>{
    it('应该返回一个默认状态', async( () => {
      const action = {} as any ;
      const result = reducer(undefined,action);
      expect(result).toEqual(fromAuth.initialState);
    })) ;
  });

  describe( '登录成功', ()=>{
    it('应该返回一个 Err为 undefined 而 useId 不为空的 Auth 对象', () => {
      const action = {
        type:actions.ActionTypes.LOGIN_SUCCESS,
        payload:{
          token:'',
          user: {
            id:'1',
            email:'dev@loacl.dev'
          }
        }
      } as any ;
      const result = reducer(undefined,action);
      expect(result.user).toEqual(action.payload.user);
      expect(result.err).toBeUndefined();

    });
  });

  describe( 'Auth', ()=>{
    it('should create an instance', () => {

    });
  });

  describe( 'Auth', ()=>{
    it('should create an instance', () => {

    });
  });

  });

