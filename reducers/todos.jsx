import types from '../constants/ActionTypes';
import createReducer from '../utils/createReducer';

const initialState = [{
  text: 'Use Redux',
  completed: false,
  id: 0
}];

// This is more elegant way to write reducers as compared to switch case
function ADD_TODO( state, action ){
  return [{
    id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
    completed: false,
    text: action.text
  }, ...state];
}

function DELETE_TODO(state, action) {
  return state.filter(todo =>
    todo.id !== action.id
  );
}

function EDIT_TODO(state, action) {
  return state.map(todo =>
    todo.id === action.id ?
      Object.assign({}, todo, { text: action.text }) :
      todo
  );
}

function COMPLETE_TODO(state, action) {
  return state.map(todo =>
    todo.id === action.id ?
      Object.assign({}, todo, { completed: !todo.completed }) :
      todo
  );
}

function COMPLETE_ALL(state, action) {
  const areAllMarked = state.every(todo => todo.completed);
  return state.map(todo => Object.assign({}, todo, {
    completed: !areAllMarked
  }));
}

function CLEAR_COMPLETED(state, action) {
  return state.filter(todo => todo.completed === false);
}

const handlers =
{
  [types.ADD_TODO]: ADD_TODO,
  [types.DELETE_TODO]: DELETE_TODO,
  [types.EDIT_TODO]: EDIT_TODO,
  [types.COMPLETE_TODO]: COMPLETE_TODO,
  [types.COMPLETE_ALL]: COMPLETE_ALL,
  [types.CLEAR_COMPLETED]: CLEAR_COMPLETED
}

export default createReducer( initialState, handlers );