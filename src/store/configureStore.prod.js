import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import root from 'reducers';

const configureStore = (preloadedState) => createStore(root, preloadedState, applyMiddleware(thunk));

export default configureStore;
