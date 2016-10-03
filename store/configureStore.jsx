import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

export default function configureStore(initialState) {
  const middleware = routerMiddleware(browserHistory)
  const initialState = window.__REDUX_STATE__ 
  const store = createStore(
    rootReducer,
    initialState,
    window.devToolsExtension ? window.devToolsExtension() : undefined,
    applyMiddleware(middleware),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
