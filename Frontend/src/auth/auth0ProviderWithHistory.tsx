import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react"; //todo: AppState type should be usable in a new auth0 release soon

interface Props {
    children: React.ReactNode
}

const Auth0ProviderWithHistory = ({ children }: Props): JSX.Element => {
    const domain = process.env.REACT_APP_AUTH0_DOMAIN !== undefined ? process.env.REACT_APP_AUTH0_DOMAIN : '';
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID !== undefined ? process.env.REACT_APP_AUTH0_CLIENT_ID : '';

    const history = useHistory();

    const onRedirectCallback = (appState: { returnTo?: string; }) => { //todo: waiting for new release of the SDK to expose the AppState Type
        history.push(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;
