import React, {useEffect, useState} from 'react';

import {Author} from "../../../../Backend/types/Author";
import {findOrCreateAuthorWrapper} from "../../common/utils/requests";
import {useAuth0} from "@auth0/auth0-react";

export const HomePage = (): JSX.Element => {
    const {isAuthenticated, user} = useAuth0();

    //this useEffect will only happen on the first page load as there are no values it is dependent on
    useEffect(() => {
        findOrCreateAuthorWrapper({isAuthenticated, user});
    }, []);

    return (
        <div>
            <h1>HomePage</h1>
        </div>
    );
};
