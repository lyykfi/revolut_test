// @flow
import EXCHANGE_RATES from "constants/exchange_rates";

/**
 *
 * @method exchangeRates
 */
export default function exchangeRates(state = [], action) {
    switch (action.type) {
        case EXCHANGE_RATES.GET_LATEST_SUCCESS:
          return action.payload;
        default:
          return state;
    }
}
