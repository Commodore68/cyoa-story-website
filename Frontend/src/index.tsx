import React from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import Auth0ProviderWithHistory from "./auth/auth0ProviderWithHistory";
import App from './App';
import {configure} from 'mobx';

configure({
    enforceActions: "never"
});

render(
    <Router>
        <Auth0ProviderWithHistory>
            <App />
        </Auth0ProviderWithHistory>
    </Router>,
    document.getElementById('root')
);
