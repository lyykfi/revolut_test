// @flow
import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Form, Text, Select} from "react-form";

import {getLatest} from "actions/exchange_rates";

import "./style.less";

import type from "services/exchange_rates";

/**
 * Props
 * @type {Object}
 */
type Props = {
    exchangeRates: ExchangeRatesList
};

/**
 * ExchangeRates component
 * @class ExchangeRates
 */
@connect(
    (state) => {
        return {
            exchangeRates: state.exchangeRates
        };
    },
    (dispatch) => {
        return bindActionCreators({getLatest}, dispatch);
    }
)
export default class ExchangeRates extends React.Component<Props> {
    /**
     *
     * @type {Number}
     */
    RATE_UPDATE = 10000;

    /**
     *
     * @type {Object}
     */
    updateInterval = null;

    /**
     *
     */
    formApi = null;

    /**
     *
     * @type {Object}
     */
    INIT_VALUES = {
        money: "",
        inputCurrency: "EUR",
        outCurrency: "RUB"
    }

    /**
     * init props
     * @type {Object}
     */
    static defaultProps = {
        exchangeRates: []
    }

    /**
     *
     * @method componentDidMount
     */
    async componentDidMount() {
        await this.props.getLatest();

        this.updateInterval = setTimeout(this.props.getLatest, this.RATE_UPDATE);

        this.formApi.setValue("money", "1");
    }

    /**
     *
     * @method componentWillUnmount
     */
    componentWillUnmount() {
        if(this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }

    /**
     *
     * @method formDidUpdate
     */
    formDidUpdate = (formState) => {
        const {exchangeRates} = this.props;

        if(!formState.values.money) {
            this.formApi.setValue("money", "1");
        }

        const money = parseInt(formState.values.money, 10);
        const inputCurrency = formState.values.inputCurrency;
        const outCurrency = formState.values.outCurrency;

        const currencyItem = exchangeRates.find((item) => item.currency === inputCurrency);
        const outCurrencyItem = exchangeRates.find((item) => item.currency === outCurrency);

        if(currencyItem && outCurrencyItem) {
            this.formApi.setValue("outMoney", (money * currencyItem.rate / outCurrencyItem.rate).toFixed(2));
        }
    }

    /**
     *
     * @method handleChange
     */
    handleChange = () => {
        const formState = this.formApi.getFormState();

        this.formApi.setAllValues({
            inputCurrency: formState.values.outCurrency,
            outCurrency: formState.values.inputCurrency,
            money: Math.ceil(parseFloat(formState.values.outMoney))
        });
    }

    /**
     *
     * @method render
     */
    render() {
        const {exchangeRates} = this.props;
        const currencies = exchangeRates.map((item) => {
            const currency = item.currency;

            return {label: currency, value: currency};
        });

        return exchangeRates.length > 0 ? <Form
            getApi={(formApi) => this.formApi = formApi}
            defaultValues={this.INIT_VALUES}
            formDidUpdate={this.formDidUpdate}>
            {formApi => (
              <form onSubmit={formApi.submitForm} id="exchange_rates">
                <p className="input">
                    <Select
                        field="inputCurrency"
                        options={currencies} />
                    <Text
                        field="money"
                        type="number"
                        min="1"
                        autoFocus={true} />
                </p>
                <p>
                    <Select
                        field="outCurrency"
                        options={currencies} />
                    <Text
                        field="outMoney"
                        type="number"
                        min="1" />

                    <i className="fa fa-repeat"
                        aria-hidden="true"
                        onClick={this.handleChange}></i>
                </p>
              </form>
            )}
        </Form> : null;
    }
}
