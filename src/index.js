import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
// import '../index.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import { hashHistory  } from 'react-router';
import App from './containers/App';
import Login from './containers/Login';
import Signup from './containers/signup';
import Home from './containers/home';
import CreateLeave from './containers/createLeave';
import configureStore from './store/configureStore';
import allReducers from './reducers'
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

injectTapEventPlugin();
const logger = createLogger();
const store = createStore(
    allReducers,
    applyMiddleware(thunk, promise,logger)
);

function routeSignupPage(s, cb) {
	System.import('./containers/signup').then(component => {
		cb(null, component.default || component);
	});
}

function routeLoginPage(s, cb) {
	System.import('./containers/Login').then(component => {
		cb(null, component.default || component);
	});
}

function routeHomePage(s, cb) {
	System.import('./containers/home').then(component => {
		cb(null, component.default || component);
	});
}

function routeCreatePage(s, cb) {
	System.import('./containers/createLeave').then(component => {
		cb(null, component.default || component);
	});
}

function checkLoggedIn(e){
	var path = e.location.pathname;
	console.log(path);
  if (!hasAccessToken() && path!='/logout' && path!='/login' ) {
	  console.log("Its inside");
	  hashHistory.push('/login');
  }
}

export function hasAccessToken(){
	let accessToken = localStorage.getItem('access_token');
	return accessToken;
}

//const history = useRouterHistory(createHashHistory)();
render(
	(<Provider store={store}>
			<Router history={hashHistory}>
				<Route path="/" component={App}>
				   <IndexRoute component={Home}/>
					 <Route path="signup" getComponent={routeSignupPage}/>
					 <Route path="login" getComponent={routeLoginPage}/>
					 <Route path="home" getComponent={routeHomePage}/>
           <Route path="create" getComponent={routeCreatePage}/>
	      </Route>
			</Router>
		</Provider>), document.querySelector('.container'));
