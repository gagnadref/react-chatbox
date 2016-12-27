import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import App from './components/app';
import reducers from './reducers';
import startChat, { chatMiddleware } from './chat';

const initialState = localStorage.getItem('reduxState') ?
  JSON.parse(localStorage.getItem('reduxState')) :
  window.INITIAL_STATE;

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  chatMiddleware,
  createLogger()
)(createStore);
const store = createStoreWithMiddleware(reducers(initialState));

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

startChat(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('app'));
