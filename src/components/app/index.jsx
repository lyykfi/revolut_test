// @flow
import React from "react";
import {Provider} from "react-redux";

import configureStore from "store/index";


/**
 * Props
 * @type {Object}
 */
type Props = {
    store: Object
};

/**
 * App component
 * @class App
 */
export default class App extends React.Component<Props> {
    /**
     * default Props
     * @type {Object}
     */
    static defaultProps = {
        store: configureStore()
    }

    /**
     *
     * @method render
     */
    render() {
        return <Provider store={this.props.store}>
            {this.props.children}
        </Provider>;
    }
}
