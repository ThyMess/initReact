import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Home from '../views/home';
import About from '../views/about';

const BasicRoute = () => {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/about" component={About}></Route>
            </Switch>
        </HashRouter>
    )
}

export default BasicRoute;