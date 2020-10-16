import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import MyToolbar from './mainToolbar';
import '../assets/index.scss';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const SomeOtherPage: React.FunctionComponent = () => (
    <h2>Some Other Page</h2>
);

const Home = () => (
    <h1>Home</h1>
);

const App: React.FunctionComponent = () => (
    <Router>
        <MyToolbar />
        <Switch>
            <Route exact path="/" >
                <Home />
            </Route>
            <Route path="/home" >
                <Home />
            </Route>
            <Route path="/some-other-page">
                <SomeOtherPage />
            </Route>
        </Switch>
    </Router>
);

export default App;
