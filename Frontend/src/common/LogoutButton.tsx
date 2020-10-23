import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {Button} from "primereact/button";

const LogoutButton = (): JSX.Element => {
    const { logout } = useAuth0();
    return (
        <Button
            label="Log Out"
            className="p-mr-2"
            onClick={() =>
                logout({
                    returnTo: window.location.origin,
                })
            }
        />
    );
};

export default LogoutButton;
