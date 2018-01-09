// @flow
let instance = null;

/**
 *
 * @type {String}
 */
const SOURCE_URL = "http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml";

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
            const text = await result.text();

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, "text/xml");
            const cubes = xmlDoc.getElementsByTagName("Cube");
            const currents: ExchangeRatesList = [];

            for (let i = 0; i < cubes.length; i++) {
                const cube = cubes[i];

                if(cube) {
                    const currency = cube.getAttribute("currency");

                    if(currency) {
                        currents.push({
                            currency,
                            rate: parseFloat(cube.getAttribute("rate"))
                        });
                    }
                }
            }

            return currents;
        } else {
            throw ERRORS.SERVER_DONT_RESPONSE;
        }
    }
}
