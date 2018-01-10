// @flow
let instance = null;

/**
 *
 * @type {String}
 */
const SOURCE_URL = "https://www.cbr-xml-daily.ru/daily_json.js";

/**
 *
 * @type {Object}
 */
const ERRORS = {
    "SERVER_DONT_RESPONSE": 1
}

/**
 *
 */
export type ExchangeRatesList = Array<ExchangeRatesListItem>;

/**
 *
 */
export type ExchangeRatesListItem = {
    currency: string,
    rate: number
}

/**
 * Exchange rate service class
 * @class ExchangeRatesService
 */
export default class ExchangeRatesService {
    /**
     *
     * @method constructor
     */
    constructor() {
        if(!instance) {
            instance = this;
        }

        return instance;
    }

    /**
     *
     * @method getLatest
     * @return {Object}
     */
    async getLatest() {
        const result = await fetch(SOURCE_URL);

        if(result.ok) {
            const json = await result.json();

            const currents: ExchangeRatesList = [];

            if(json && json.Valute) {
                const valute = json.Valute;

                currents.push({
                    currency: "RUB",
                    rate: 1
                });

                for(let key in valute) {
                    const item = valute[key];

                    currents.push({
                        currency: item.CharCode,
                        rate: item.Value
                    });
                }
            }

            return currents;
        } else {
            throw ERRORS.SERVER_DONT_RESPONSE;
        }
    }
}
