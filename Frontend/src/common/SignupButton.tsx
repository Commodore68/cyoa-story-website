import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {Button} from "primereact/button";

const SignupButton = (): JSX.Element => {
    const { loginWithRedirect } = useAuth0();
    return (
        <Button
            label="Sign Up"
            className="p-mr-2"
            onClick={() =>
                loginWithRedirect({
                    screen_hint: "signup",
                })
            }
        />
    );
};

export default SignupButton;
