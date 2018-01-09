// @flow
import React from "react";
import ReactDOM from "react-dom";

import App from "components/app";
import ExchangeRates from "components/exchange_rates/index";

import "assets/styles/main.less";

const container = document.getElementById("app");

if(container) {
    ReactDOM.render(<App><ExchangeRates /></App>, container);
}
