import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
import axios from 'axios';
window.axios = axios;
//second arg is about server side rendering
//we will replace middleware by redux-thunk
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
//provider will tell every childen  of App that the store have been updated and reset all
ReactDOM.render(
	<Provider store={store}><App /></Provider>, 
	document.querySelector('#root')
);
