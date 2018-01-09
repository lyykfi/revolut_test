// @flow
import React from "react";
import { Form, Text, Select } from "react-form";

import "./style.less";

import type from "services/exchange_rates";

/**
 * Props
 * @type {Object}
 */
type Props = {
    currencies: ExchangeRatesList
};

/**
 * ExchangeRates component
 * @class ExchangeRates
 */
export default class ExchangeRates extends React.Component<Props> {
    /**
     * init props
     * @type {Object}
     */
    static defaultProps = {
        currencies: []
    }

    /**
     *
     * @method render
     */
    render() {
        return <Form id="exchange_rates">
            { formApi => (
              <form onSubmit={formApi.submitForm} id="form1">
                <Select field="status" id="status" options={this.props.currencies} />
                <Text field="hello" id="hello" />
              </form>
            )}
        </Form>;
    }
}
