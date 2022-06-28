import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { restoreCSRF, csrfFetch } from './csrf';
import sessionReducer from './session';
import noteReducer from './note';
import notebookReducer from './notebook';
import * as sessionActions from './session';
import * as noteActions from './note';
import * as notebookActions from './notebook';

const rootReducer = combineReducers({
  session: sessionReducer,
  note: noteReducer,
  notebook: notebookReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
    restoreCSRF();

    window.csrfFetch = csrfFetch;
    window.store = store;
    window.sessionActions = sessionActions;
    window.noteActions = noteActions;
    window.notebookActions = notebookActions;
  }

export default configureStore;
