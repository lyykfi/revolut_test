// @flow
//
import "isomorphic-fetch";
import ExchangeRatesService from "services/exchange_rates";

import type ExchangeRatesList from "services/exchange_rates";

test('get exchange rates latest', async () => {
    const exchangeRatesService = new ExchangeRatesService();
    const result = await exchangeRatesService.getLatest();

    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
});
