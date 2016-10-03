import React from 'react';
import { Route, IndexRoute, browserHistory  } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'  ;

import App from '../containers/App';
import Home from '../containers/Home';
import Calculator from '../containers/Calculator';

export default function (props = {}) {  
  let history = browserHistory

  if (props.store) {
  history = syncHistoryWithStore(browserHistory, props.store)
  }

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="calculator" component={Calculator} />
    </Route>
  )
}