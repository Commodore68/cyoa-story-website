import React, { ComponentType } from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
//import { Loading } from "../components/index";

interface ProtectedRouteProps {
    component: ComponentType<any>,
    path: string,
}

const ProtectedRoute = ({ component, ...args }: ProtectedRouteProps): JSX.Element => (
    <Route
        component={withAuthenticationRequired(component, {
            onRedirecting: () =><div>loading...</div>
        })}
        {...args}
    />
);

export default ProtectedRoute;
