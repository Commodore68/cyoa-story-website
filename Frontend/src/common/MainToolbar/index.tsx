import React, {useEffect, useState} from 'react';
import {Button} from 'primereact/button';
import {Toolbar} from "primereact/toolbar";
import {Link, useHistory} from 'react-router-dom';
import AuthenticationButton from "../AuthenticationButton";
import { Dropdown } from 'primereact/dropdown';
import {dataSample} from './sampleHomePageAuthors';
import {Story} from "../../../../Backend/types/Story";



const left = () => (
    <React.Fragment>
        <Link to="/home">
            <Button icon="pi pi-home" className="p-mr-2" />
        </Link>
        <Link to = "/ChapterCreation">
            <Button icon="pi pi-check" className="p-button-success p-mr-2" />
        </Link>
    </React.Fragment>
);
const SearchBar = () => {
    const [story, setStory] = useState<Story>();

    const stories = dataSample.data;
    const onStoryChange = (e: { value: any}) => {
        setStory(e.value);
    };
    const history = useHistory();
    useEffect(()=> {
        history.push(`/StoryOverview/${story.id}`);
    }, [story]);
        
    return (
        <div className="dropdown">
            <div>
                <Dropdown value={story} options={stories} onChange={onStoryChange} optionLabel="title" filter showClear filterBy="title" placeholder="Select a story"/>
            </div>
        </div>
    );
};

const right = () => (

    <React.Fragment>
        <SearchBar/>
        <Button icon="pi pi-search" className="p-button-danger" />
        <AuthenticationButton />
    </React.Fragment>
);

const MyToolbar: React.FunctionComponent = () => (
    <React.Fragment>
        <Toolbar left={left} right={right}/>
    </React.Fragment>
);
export default MyToolbar;
