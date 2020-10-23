import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {Button} from "primereact/button";

const LoginButton = (): JSX.Element => {
    const { loginWithRedirect } = useAuth0();
    return (
        <Button
            label="Login"
            className="p-mr-2"
            onClick={() => loginWithRedirect()}
        />
    );
};

export default LoginButton;
