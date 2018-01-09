// @flow
import {createStore} from "redux";

import rootReducer from "reducers";

/**
 *
 * @method configureStore
 */
export default function configureStore(initialState = {}) {
  const store = createStore(rootReducer, initialState)
  return store;
}
