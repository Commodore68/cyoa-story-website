import React from 'react';
import {storyStore} from "../../stores/index";
import '../../../src/StoryOverview.scss';
import {Button} from 'primereact/button';
import { Link } from "react-router-dom";


const StoryOverview: React.FunctionComponent = (props) => {
    storyStore.story= {
        id: 'someID',
        authorName: 'someAuthor',
        authorId: 'someAuthorID',
        dateUpdated: new Date(),
        dateCreated: new Date(),
        title: 'Title',
        summary: 'someSummary',
        tags: [],
        genre: 'string',
        subGenre: undefined,
        contentRating: null,
        firstNode: 'string'
    };


    return (
        <div style = {{padding: 30}}>
            <div className="center">
            <h1>
                {storyStore.story.title}
            </h1>
            <p>
                By {storyStore.story.authorName} <br></br>
            </p>
            </div>
            <div style = {{marginLeft: 300}}>
                <br></br>
                <br></br>
                Summary: {storyStore.story.summary}
            </div>
            <div className ="sidediv"> 
                <div className = "center">
                    Date Created: {storyStore.story.dateCreated.toDateString()} <br></br><br></br>
                    Date Updated: {storyStore.story.dateUpdated.toDateString()} <br></br><br></br>
                    Genre: {storyStore.story.genre} <br></br><br></br>
                    Subgenre: {storyStore.story.subGenre} <br></br><br></br>
                    Content Rating: {storyStore.story.contentRating} <br></br><br></br>
                    Tags: {storyStore.story.tags} <br></br>
                </div>
            </div>
            <div className = "center">
            <Link to = {`/Chapter/${storyStore.story.firstNode}`}>
                <Button label="Begin Story" className="p-mr-2" />
            </Link>
            </div>
        </div>
    );
};

export default StoryOverview