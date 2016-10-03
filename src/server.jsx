import React from 'react'
import express from 'express'  
import { match } from 'react-router'  
import { renderToString } from 'react-dom/server'  
import { RouterContext } from 'react-router'  
import { createStore, applyMiddleware } from 'redux'  
import thunkMiddleware from 'redux-thunk'  
import { Provider } from 'react-redux'  
import routes from '../routes/routing'  
import reducers from '../reducers'
import path from 'path';

const app = express()
app.use(express.static(path.join(__dirname, '../static')));
app.get('*', (req, res, next) => {  
  match({ routes: routes(), location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) return next(err)

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    }

    if (!renderProps) {
      return next(new Error('Missing render props'))
    }

    const components = renderProps.components

    // If the component being shown is our 404 component, then set appropriate status
    if (components.some((c) => c && c.displayName === 'error-404')) {
      res.status(404)
    }

    const Comp = components[components.length - 1].WrappedComponent
    const fetchData = (Comp && Comp.fetchData) || (() => Promise.resolve())

    const initialState = {}
    const store = createStore(reducers, initialState, applyMiddleware(thunkMiddleware))
    const { location, params, history } = renderProps

    fetchData({ store, location, params, history })
      .then(() => {
        const body = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        )

        const state = store.getState()

        res.send(`<!DOCTYPE html>
          <html>
            <head>
            </head>
            <body>
              <div id="root">${body}</div>
              <script>window.__REDUX_STATE__ = ${JSON.stringify(state)}</script>
              <script src="/bundle.js"></script>
              <script>
                var WebFontConfig = {
                  google: { families: [ 'Roboto:400,300,500:latin' ] }
                };
                (function() {
                  var wf = document.createElement('script');
                  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
                    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
                  wf.type = 'text/javascript';
                  wf.async = 'true';
                  var s = document.getElementsByTagName('script')[0];
                  s.parentNode.insertBefore(wf, s);
                })();
              </script>
            </body>
          </html>`)
      })
      .catch((err) => next(err))
  })
})

const server = app.listen(3000, () => console.log('Server started', server.address()))  