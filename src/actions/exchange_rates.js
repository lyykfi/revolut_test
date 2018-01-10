// @flow
import EXCHANGE_RATES from "constants/exchange_rates";
import ExchangeRatesService from "services/exchange_rates";

/**
 *
 * @method getLatest
 */
export function getLatest() {
    return async (dispatch) => {
        const exchangeRatesService = new ExchangeRatesService();
        const result = await exchangeRatesService.getLatest();

        return dispatch(getLatestSuccess(result));
    };
}

/**
 *
 * @method getLatestSuccess
 */
function getLatestSuccess(result) {
    return {
        type: EXCHANGE_RATES.GET_LATEST_SUCCESS,
        payload: result
    };
}
