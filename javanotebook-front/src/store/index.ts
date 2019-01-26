import { connectRouter } from 'connected-react-router';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { history, middleware } from './router';


import { persistStore } from 'redux-persist'; // persistReducer

// import storage from 'redux-persist/lib/storage';

import { commandReducer, commandSaga } from './commands';
import { notebookReducer, notebookSaga } from './notebooks';

const sagaMiddleware = createSagaMiddleware();

// const persistConfig = {
//     key: 'root',
//     storage,
// };

const rootReducer = connectRouter(history)(
    combineReducers({
        commandReducer,
        notebookReducer,
    }));

// const pReducer = persistReducer(persistConfig, rootReducer);


// REDUX DEV TOOLS EXTENSION ABILITY --- MAYBE REMOVE IN PROD ?? YES
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    // pReducer,
    rootReducer,
    {}, // initial state
    composeEnhancers(applyMiddleware(middleware, sagaMiddleware)));

export const persistor = persistStore(store);

sagaMiddleware.run(commandSaga);
sagaMiddleware.run(notebookSaga);

