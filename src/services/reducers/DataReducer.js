import { combineReducers } from 'redux';

const INITIAL_STATE = {
    data: {}
};

const dataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_DATA':
  
        const newState = action.payload;
  
        return newState;
  
    default:
      return state
  }
};

export default combineReducers({
  reduxData: dataReducer
});