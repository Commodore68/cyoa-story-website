import React from "react";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

import { useAuth0 } from "@auth0/auth0-react";
import SignupButton from "./SignupButton";

const AuthenticationButton = (): JSX.Element => {
    const { isAuthenticated } = useAuth0();

    return isAuthenticated
        ? <LogoutButton />
        : <React.Fragment>
            <SignupButton />
            <LoginButton />
        </React.Fragment>;
};

export default AuthenticationButton;
