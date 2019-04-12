import * as actions from '../actions/quote.action';
import { Quote } from '../domain/quote.model';
import { ActionSequence } from 'protractor';

export interface State {

  quote: Quote;
};

export const initialState: State = {
  quote : {
    cn: '我突然就觉得自己像个华丽的木偶,演尽了所有的悲欢离合',
    en: 'There are lots of shining silvery thread on my back.',
    pic: '/assets/img/quotes/0.jpg'
}
}


export function reducer(state = initialState, action: actions.Actions ): State {
  switch (action.type) {
    case actions.ActionTypes.LOAD_SUCCESS: {
        //  Object.assign({},state,{quote :action.payload});
      return  {... state, quote: <Quote> action.payload};
    }
    case actions.ActionTypes.LOAD_FAIL:
    default: {
      return state;
    }
  }
}

export const getQuote = (state: State) => state.quote;
