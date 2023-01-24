import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import root from 'reducers';

const configureStore = (preloadedState) => {
  const store = createStore(root, preloadedState, compose(applyMiddleware(thunk)));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers', () => {
      store.replace(root);
    });
  }

  return store;
};

export default configureStore;
