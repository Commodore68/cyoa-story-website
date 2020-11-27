import React from "react";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

import { useAuth0 } from "@auth0/auth0-react";
import {Button} from "primereact/button";
import {Link} from "react-router-dom";

const AuthenticationButton = (): JSX.Element => {
    const { isAuthenticated } = useAuth0();

    return isAuthenticated
        ? <React.Fragment>
            <Link to="/Profile">
                <Button icon="pi pi-users" className="p-button-success p-mr-2" />
            </Link>
            <LogoutButton />
        </React.Fragment>
        : <LoginButton />;
};

export default AuthenticationButton;
