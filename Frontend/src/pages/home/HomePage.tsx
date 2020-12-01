import React, {useEffect, useState} from 'react';

import {Author} from "../../../../Backend/types/Author";
import {findOrCreateAuthorWrapper} from "../../common/utils/requests";
import {useAuth0} from "@auth0/auth0-react";
import RecentlyUpdated from "./components/RecentlyUpdated";
import { storyStore } from '../../stores';
import { httpRequest } from '../../common/utils/axios';

var data = {
    storyTitle: ["Title1", "Title2", "Title3"],
    dateUpdated: [new Date(), new Date(), new Date()],
    author: ["Spongebob Squarepants", "Patrick Star", "Squidward Tentacles"]
}

interface RecentlyUpdatedProps{
    params:{
        id:string
    }
}

export const HomePage = (props: RecentlyUpdatedProps) => {
    const {isAuthenticated, user} = useAuth0();

    //this useEffect will only happen on the first page load as there are no values it is dependent on
    useEffect(() => {
        async function fetchData(){
            const response = await httpRequest({
                method: 'POST',
                endpoint: '/api/stories/',
                data:{
                    data:{
                        id: props.params.id,
                    },
                    type: 'find-one'
                }
            });
            storyStore.story = response.data;
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
            <div className="p-m-2" style={{bottom:"0%", position:"fixed", fontSize:"10.5pt"}}>
                Created by: Only Drew Fleming, no one else
            </div>
            <RecentlyUpdated stories={storyStore.story} />
        </div>

    );

};


