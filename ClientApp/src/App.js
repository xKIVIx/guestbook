import React, { Component } from 'react';
import { Layout } from './components/Layout';
import { Posts } from './components/Posts';
import { Route } from "react-router-dom";

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path="/" component={Posts} />
                <Route path="/:page" component={Posts} />
            </Layout>
        );
    }
}
