import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import { routerForBrowser, initializeCurrentLocation, push } from 'redux-little-router';
import thunk from 'redux-thunk';

// import my reducer
import repositoryReducer from './reducers/repository';

const routes = {
  '/favorites': { },
  '/repository/:owner/:repo': { },
  '/': { }
};
const { reducer, middleware, enhancer } = routerForBrowser({
  // The configured routes. Required.
  routes
});
const rootReducer = combineReducers({
  router: reducer,
  repository: repositoryReducer
});
const initialState = {};
const store = createStore(rootReducer, initialState, compose(enhancer, applyMiddleware(thunk, middleware)));
const initialLocation = store.getState().router;

if (initialLocation && initialLocation.route) {
  store.dispatch(initializeCurrentLocation(initialLocation));
} else {
  store.dispatch(push('/'));
}

export default store;
