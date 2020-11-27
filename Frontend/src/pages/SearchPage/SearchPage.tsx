import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Author } from "../../../../Backend/types/Author";
import { AutoComplete } from 'primereact/autocomplete';
import { Story } from "../../../../Backend/types/Story";


const SeachPage = (author: Author,story: Story) => {

    return(
        <>
            <h1>Search for Story or Author</h1>
        </>
    );
};

export default SeachPage;