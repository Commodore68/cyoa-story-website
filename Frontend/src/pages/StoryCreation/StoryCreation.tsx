import React, {useEffect, useState} from 'react';
import { Dropdown } from 'primereact/dropdown';
import {httpRequest} from "../../common/utils/axios";
import {findOrCreateAuthorWrapper} from "../../common/utils/requests";
import {useAuth0} from "@auth0/auth0-react";

import {Story} from "../../../../Backend/types/Story";
import {currentAuthorStore, storyStore} from "../../stores";
import {v4 as uuidv4} from "uuid";
import {Button} from "primereact/button";
import {Link} from "react-router-dom";
import {observer} from "mobx-react";

const contentRatingOptions = [
    {name: 'PG', code: 'pg'},
    {name: 'PG-13', code: 'p13'},
    {name: 'Mature', code: 'old'},
    {name: 'Corn', code: 'corn'}
];

const genreOptions = [
    {name: 'action', code: 'act'},
    {name: 'adventure', code: 'adv'},
    {name: 'crime', code: 'crim'},
    {name: 'fantasy', code: 'fan'},
    {name: 'other', code: 'other'}

];

const subGenreOptions = [
    {name: 'action', code: 'act'},
    {name: 'adventure', code: 'adv'},
    {name: 'crime', code: 'crim'},
    {name: 'fantasy', code: 'fan'},
    {name: 'other', code: 'other'}
];


const StoryCreation = observer((): JSX.Element => {
    const {isAuthenticated, user} = useAuth0();

    const [successResponse, setSuccessResponse] = useState<boolean>(false);
    const [newStory, setNewStory] = useState<Story>();
    const [genre, setGenre] = useState<string>();
    const [subGenre, setSubGenre] = useState<string | null>(null);
    const [contentRating, setContentRating] = useState<'PG' | 'PG-13' | 'Mature' | 'Corn' | null>();
    const [summary, setSummary] = useState<string>();
    const [title, setTitle] = useState<string>();

    useEffect(() => {
        findOrCreateAuthorWrapper({isAuthenticated, user});
    }, []);

    useEffect(() => {
        async function setData() {
            if(newStory) {
                const response = await httpRequest({
                    method: 'POST',
                    endpoint: '/api/stories/',
                    data: {
                        data: newStory,
                        type: 'insert-one'
                    }
                });

                try {
                    const value = response.data;

                    storyStore.story = newStory;

                    setSuccessResponse(true);

                    document.getElementById('response').innerText = 'New Story Created';
                } catch (e) {
                    setSuccessResponse(false);
                    document.getElementById('response').innerText = 'Story Creation failed';
                }
            }
        }
        void setData();
    }, [newStory]);

    function addNewStory() {
        if (genre && title && contentRating && summary) {
            const tempStory: Story = {
                authorId: currentAuthorStore.author.id,
                authorName: currentAuthorStore.author.userName,
                contentRating: contentRating ? contentRating : null,
                dateCreated: new Date(),
                dateUpdated: new Date(),
                firstNode: "",
                genre: genre,
                id: uuidv4(),
                subGenre: subGenre,
                summary: summary,
                tags: [],
                title: title
            };

            setNewStory(tempStory);
        } else {
            alert('Please enter text for all the required fields for a story');
        }
    }

    return (
        <>
            <div className = "creation">
                <div className = "node">
                <h1 className="p-text-center">Story Creation Page</h1>
                        <br/>
                    <div className="p-field p-grid p-flex-column" style={{marginLeft:"200px"}}>
                        

                        <h3>Title</h3>
                    
                        <div className="p-field p-col-12 p-md-2">
                            <span className="p-float-label">
                                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Input text" style={{minWidth:"500px", fontSize:"12pt"}}/>
                                {/* <label htmlFor="text">InputText</label> */}
                            </span>
                        </div>
                        <h3>Summary</h3>
                        
                        <div className="p-field p-col-12 p-md-2">
                            <span className="p-float-label">
                                <textarea id="summary" value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Summary" rows={3} style={{minWidth:"500px", minHeight:"200px", fontSize:"12pt"}}/>
                                {/* <label htmlFor="Summary">Summary</label> */}
                            </span>
                        </div>
                        {/* tags, gene, sub gen and content rating will be drop down menu view */}

                        {/* <h3>Tags</h3>
                        <br/> */}

                        <h3>Genre</h3>
                        
                        <div className="p-field p-col-12 p-md-2">
                            <span className="p-float-label">
                                <Dropdown id="dropdown" value={genre} options={genreOptions} placeholder="Genre" onChange={(e) => setGenre(e.value.name)} optionLabel="name" style={{minWidth:"200px"}}/>
                                {/* <label htmlFor="Genre">Dropdown</label> */}
                            </span>
                        </div>

                        <h3>Sub-Genre</h3>
                        
                        <div className="p-field p-col-12 p-md-2">
                            <span className="p-float-label">
                                <Dropdown id="dropdown" value={subGenre} options={subGenreOptions} placeholder="Sub Genre" onChange={(e) => setSubGenre(e.value.name)} optionLabel="name" style={{minWidth:"200px"}}/>
                                {/* <label htmlFor="dropdown">subGenre</label> */}
                            </span>
                        </div>

                        <h3>Content Rating</h3>
                        
                        <div className="p-field p-col-12 p-md-2">
                            <span className="p-float-label">
                                <Dropdown id="dropdown" value={contentRating} options={contentRatingOptions} placeholder="Content Rating" onChange={(e) => setContentRating(e.value.name)} optionLabel="name" style={{minWidth:"200px"}}/>
                                {/* <label htmlFor="Content Rating">Content Rating</label> */}
                            </span>
                        </div>
                    </div>
                    <p style={{marginLeft:"200px"}}>
                        <Button
                            id="createStoryButton"
                            label="Create Story"
                            className=" p-mb-4"
                            onClick={(e) => addNewStory()}
                        />
                        {successResponse && <Link to={`/ChapterCreation/newStory${storyStore.story.id}`}>
                            <Button label="Create First Chapter" className="p-mr-2 p-button-success"/>
                        </Link>}
                    </p>
                    <p id="response"></p>
                </div>
            </div>
        </>
    );
});

export default StoryCreation;
