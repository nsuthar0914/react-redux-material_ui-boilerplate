export default function createReducer (initialState, actionHandlers) {
  return (state = initialState, action) => {
  	console.log(action);
    const reduceFn = actionHandlers[action.type];
    if (reduceFn) {
      return reduceFn(state, action);
    } else {
      return state;
    }
  };
}