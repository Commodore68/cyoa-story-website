import React from 'react';
import {Switch, Route} from "react-router-dom";
import MyToolbar from './common/MainToolbar';
import {HomePage} from './pages/home/HomePage';
import './assets/index.scss';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import ProtectedRoute from './auth/protected-route';

import { useAuth0 } from "@auth0/auth0-react";
import Profile from './pages/UserProfile/Profile';
import ProfileSettings from './pages/UserProfile/ProfileComponents/ProfileSettings';


const Loading = () => (
    <div>Loading...</div>
);

const SomeOtherPage: React.FunctionComponent = () => (
    <h2>Some Other Page</h2>
);

// const Home = () => (
//     <h1>Home</h1>
// );

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
                    <HomePage />
                </Route>
                <Route path="/home" >
                    <HomePage />
                </Route>
                <Route path="/some-other-page">
                    <SomeOtherPage />
                </Route>
                <ProtectedRoute path="/Profile" component={Profile}/>
                <ProtectedRoute path="/ProfileSettings" component={ProfileSettings}/>
                <Route path="/Login">
                    <Login/>
                </Route>
            </Switch>
        </React.Fragment>
    );
};

export default App;
