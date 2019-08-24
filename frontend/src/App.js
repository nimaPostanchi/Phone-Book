import React, {Component} from 'react';
import './App.css';
import Home from './Home';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AddPhone from './AddPhone';
import EditEntity from './EditEntity';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path='/add' exact={true} component={AddPhone}/>
                    <Route path='/edit/:id' component={EditEntity}/>
                </Switch>
            </BrowserRouter>
        )
    }
}
