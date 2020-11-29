import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {Button} from "primereact/button";
import {Link} from "react-router-dom";

const ChapterCreationButton = (): JSX.Element => {
    const { isAuthenticated } = useAuth0();

    return (
         <React.Fragment>
            <Link to="/ChapterCreation">
                <Button icon="pi pi-check" className="p-button-success p-mr-2" />
            </Link>
           
        </React.Fragment>
        

        )
};

export default ChapterCreationButton;
