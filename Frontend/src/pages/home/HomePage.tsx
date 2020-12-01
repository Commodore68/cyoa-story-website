import React, {useEffect, useState} from 'react';

import {findOrCreateAuthorWrapper} from "../../common/utils/requests";
import {useAuth0} from "@auth0/auth0-react";
import RecentlyUpdated from "./components/RecentlyUpdated";
import { httpRequest } from '../../common/utils/axios';
import { Story } from '../../../../Backend/types/Story';

export const HomePage = (): JSX.Element => {
    const {isAuthenticated, user} = useAuth0();

    const [recentStories, setRecentStories] = useState<Array<Story>>([]);

    //this useEffect will only happen on the first page load as there are no values it is dependent on
    useEffect(() => {
        async function fetchData(){
            const response = await httpRequest({
                method: 'POST',
                endpoint: '/api/stories/',
                data:{
                    type: 'find-many'
                }
            });
            setRecentStories(response.data);
        }
        void fetchData();
        findOrCreateAuthorWrapper({isAuthenticated, user});
    }, []);

    return (
        <div>
            <div className="p-text-center p-mt-6 p-mb-1" style={{fontSize:"60pt"}}>The Path</div>
            <div className="p-text-center p-m-1">
                Create and share your own choose-your-own-adventures
            </div>
            <br/>
            <RecentlyUpdated recentStories={recentStories}/>
        </div>

    );

};


