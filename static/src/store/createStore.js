import { createStore } from 'redux'
import rootReducer from './reducer/index'

export default (initialState = {}) => {
    const store = createStore(
        rootReducer,
        initialState,
    )

    // if (module.hot) {
    //     // Enable hot module replacement for reducers
    //     module.hot.accept(() => {
    //       const nextRootReducer = require('./reducer/index').default;
    //       store.replaceReducer(nextRootReducer);
    //     });
    // }

    return store
}