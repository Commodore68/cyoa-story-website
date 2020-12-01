import React, {useEffect, useState} from 'react';
import {findOrCreateAuthorWrapper} from "../../common/utils/requests";
import {useAuth0} from "@auth0/auth0-react";

export const HomePage = (): JSX.Element => {
    const {isAuthenticated, user} = useAuth0();

    useEffect(() => {
        findOrCreateAuthorWrapper({isAuthenticated, user});
    }, []);
    
    return (
        <>
            <div>
                <h1>HomePage</h1>
            </div>
        </>
    );

};
