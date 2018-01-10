// @flow
import thunk from "redux-thunk";
import {createStore, applyMiddleware} from "redux";

import rootReducer from "reducers";

/**
 *
 * @method configureStore
 */
export default function configureStore() {
    const store = createStore(rootReducer, applyMiddleware(thunk));
    return store;
}
