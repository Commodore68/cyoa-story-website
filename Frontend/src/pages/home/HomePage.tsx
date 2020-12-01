import React, {useEffect, useState} from 'react';
import SampleStories from '../../common/MainToolbar/DataTable';
import {Author} from "../../../../Backend/types/Author";
import {findOrCreateAuthorWrapper} from "../../common/utils/requests";
import {useAuth0} from "@auth0/auth0-react";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

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
