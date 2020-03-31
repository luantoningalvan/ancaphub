
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';

import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export default applyMiddleware(sagaMiddleware)(createStore)(reducers, devTools);
sagaMiddleware.run(rootSaga);
