import React, {useEffect} from 'react';
import {chapterStore, storyStore} from "../../stores/index";
import './StoryOverview.scss';
import {Button} from 'primereact/button';
import {Link, useParams} from "react-router-dom";
import {findOrCreateAuthorWrapper} from "../../common/utils/requests";
import {useAuth0} from "@auth0/auth0-react";
import {httpRequest} from "../../common/utils/axios";
import {ProgressSpinner} from "primereact/progressspinner";
import {observer} from "mobx-react";

interface StoryOverviewRouteParams {
    id: string
}

export const StoryOverview = observer((): JSX.Element => {
    const {isAuthenticated, user} = useAuth0();
    const {id} = useParams<StoryOverviewRouteParams>();

    useEffect(() => {
        async function fetchData() {
            storyStore._isLoading = true;

            const response = await httpRequest({
                method: 'POST',
                endpoint: '/api/stories/',
                data: {
                    data: {
                        id: id,
                    },
                    type: 'find-one'
                }
            });
            storyStore.story = response.data;
            storyStore._isLoading = false;
        }
        void fetchData();
        findOrCreateAuthorWrapper({isAuthenticated, user});
    }, []);

    if (storyStore._isLoading) {
        return <ProgressSpinner />;
    }

    return (
        <div style = {{padding: 30}}>
            <div className="center">
                <h1>
                    {storyStore.story.title}
                </h1>
                <p>
                    By <Link to={`/Profile/${storyStore.story.authorName}`}>{storyStore.story.authorName}</Link><br/>
                </p>
            </div>
            <div style = {{marginLeft: 300}}>
                <br/>
                <br/>
                Summary: {storyStore.story.summary}
            </div>
            <div className ="sidediv"> 
                <div className = "center">
                    Date Created: {storyStore.story.dateCreated.toDateString()} <br/><br/>
                    Date Updated: {storyStore.story.dateUpdated.toDateString()} <br/><br/>
                    Genre: {storyStore.story.genre} <br/><br/>
                    Subgenre: {storyStore.story.subGenre} <br/><br/>
                    Content Rating: {storyStore.story.contentRating} <br/><br/>
                    Tags: {storyStore.story.tags} <br/>
                </div>
            </div>
            <div className = "center">
                <Link to = {`/Chapter/${storyStore.story.firstNode}`}>
                    <Button label="Begin Story" className="p-mr-2" />
                </Link>
            </div>
        </div>
    );
});
