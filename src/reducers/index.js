// @flow
import {combineReducers} from "redux";

import exchangeRates from "./exchange_rates";

const rootReducer = combineReducers({
    exchangeRates
});

export default rootReducer;
