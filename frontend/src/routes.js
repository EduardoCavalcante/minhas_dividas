import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/login';
import Debts from './pages/debts';

function routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/debts" component={Debts} />
            </Switch>
        </BrowserRouter>
    );
}

export default routes;
