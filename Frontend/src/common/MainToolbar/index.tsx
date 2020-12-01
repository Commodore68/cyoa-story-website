import React, {useEffect, useState} from 'react';
import {Button} from 'primereact/button';
import {Toolbar} from "primereact/toolbar";
import {Link, useHistory} from 'react-router-dom';
import AuthenticationButton from "../AuthenticationButton";
import { Dropdown } from 'primereact/dropdown';
import {dataSample} from './sampleHomePageAuthors';
import {Story} from "../../../../Backend/types/Story";
import {httpRequest} from "../utils/axios";

const left = () => (
    <React.Fragment>
        <Link to="/home">
            <Button icon="pi pi-home" className="p-mr-2 p-button-lg" />
        </Link>
        <Link to="/StoryCreation">
            <Button icon="pi pi-plus" label={"Add a New Story"} className="p-mr-2 p-button-success p-button-lg" />
        </Link>
    </React.Fragment>
);

// const SearchBar = () => {
//     const [story, setStory] = useState<Story>();
//     const [stories, setStories] = useState<Array<Story>>();
//
//     useEffect(() => {
//         async function fetchData() {
//             const response = await httpRequest({
//                 method: 'POST',
//                 endpoint: '/api/stories/',
//                 data: {
//                     type: 'find-many'
//                 }
//             });
//
//             setStories(response.data);
//         }
//         void fetchData();
//     }, []);
//
//     const onStoryChange = (e: { value: any}) => {
//         setStory(e.value);
//     };
//
//     const history = useHistory();
//
//     useEffect(() => {
//         if (story) {
//             history.push(`/StoryOverview/${story.id}`);
//         }
//     }, [story]);
//
//     return (
//         <div className="dropdown">
//             <div>
//                 <Dropdown value={story} options={stories} onChange={onStoryChange} optionLabel="title" filter showClear filterBy="title" placeholder="Select a story"/>
//             </div>
//         </div>
//     );
// };

const right = () => (
    <React.Fragment>
        {/*<SearchBar/>*/}
        <Button icon="pi pi-search" className="p-mr-2 p-button-lg" />
        <AuthenticationButton />
    </React.Fragment>
);

const MyToolbar: React.FunctionComponent = () => (
    <React.Fragment>
        <Toolbar left={left} right={right}/>
    </React.Fragment>
);

export default MyToolbar;
