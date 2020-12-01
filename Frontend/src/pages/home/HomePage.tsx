import React, {useEffect, useState} from 'react';

import {Author} from "../../../../Backend/types/Author";
import {findOrCreateAuthorWrapper} from "../../common/utils/requests";
import {useAuth0} from "@auth0/auth0-react";
import RecentlyUpdated from "./components/RecentlyUpdated";
import { httpRequest } from '../../common/utils/axios';
import { Story } from '../../../../Backend/types/Story';
import StoryOverview from '~pages/StoryOverview/StoryOverview';


const recentStoriesSample: Array<Story> = [
    {
        id: "blah",
        authorId: "meh",
        authorName: "Spooky Joe",
        dateUpdated: new Date(),
        dateCreated: new Date(),
        title: "The Menacing Bro",
        summary: "He's just doing it to 'em...menacingly.",
        tags: ["bruh", "bro", "bro-down"],
        genre: "Horror",
        subGenre: "Supernatural",
        contentRating: 'PG',
        firstNode: "poggers"
    },
    {
        id: "tired",
        authorId: "dumb",
        authorName: "Stephen Hawking",
        dateUpdated: new Date(),
        dateCreated: new Date(),
        title: "Hawking Deez Nuts",
        summary: "Fucking gateem",
        tags: ["gateem", "u wot", "old memes"],
        genre: "Comedy",
        subGenre: "Antiquated",
        contentRating: 'Mature',
        firstNode: "uh"
    }
]


export const HomePage = () => {
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
        //void fetchData();
        setRecentStories(recentStoriesSample);
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
            <RecentlyUpdated recentStories={recentStoriesSample}/>
        </div>

    );

};


