import React from "react";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

import { useAuth0 } from "@auth0/auth0-react";
import {Button} from "primereact/button";
import {Link} from "react-router-dom";
import {currentAuthorStore} from "../stores";
import {observer} from "mobx-react";

const AuthenticationButton = (): JSX.Element => {
    const { isAuthenticated } = useAuth0();
    const {userName} = currentAuthorStore.author;

    return isAuthenticated
        ? <React.Fragment>
            <Link to={`/Profile/${userName}`}>
                <Button icon="pi pi-users" className="p-button-success p-mr-2 p-button-lg" />
            </Link>
            <LogoutButton />
        </React.Fragment>
        : <LoginButton />;
};

export default AuthenticationButton;
