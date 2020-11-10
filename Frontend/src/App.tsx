import React from 'react';
import {Switch, Route} from "react-router-dom";
import MyToolbar from './common/MainToolbar';
import './assets/index.scss';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';


import { useAuth0 } from "@auth0/auth0-react";


const Loading = () => (
    <div>Loading...</div>
);

const SomeOtherPage: React.FunctionComponent = () => (
    <h2>Some Other Page</h2>
);

const Home = () => (
    <h1>Home</h1>
);

//this will end up being unnecessary
const Login = () => (
    <React.Fragment>
        <section id="login-box">
            <div className="p-fluid p-formgrid" id="login-form">
                <label htmlFor="firstname">Firstname</label>
                <input id="firstname" type="text"/>
                <label htmlFor="lastname">Lastname</label>
                <input id="lastname" type="text"/>
                <label htmlFor="password">Password</label>
                <input id="initialPass" type="password"/>
                <label htmlFor="verifyPass">Verify Password</label>
                <input id="verify-me" type="password"/>
            </div>
        </section>
    </React.Fragment>
);
const App: React.FunctionComponent = () => {
    const { isLoading } = useAuth0();

    if(isLoading) {
        return <Loading />;
    }

    return (
        <React.Fragment>
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
                <Route path="/Login">
                    <Login/>
                </Route>
            </Switch>
        </React.Fragment>
    );
};

export default App;
