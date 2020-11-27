import React from 'react';
import {Button} from 'primereact/button';
import {Toolbar} from "primereact/toolbar";
import {Link} from 'react-router-dom';
import AuthenticationButton from "../AuthenticationButton";

const left = () => (
    <React.Fragment>
        <Link to="/home">
            <Button icon="pi pi-home" className="p-mr-2" />
        </Link>
    </React.Fragment>
);

const right = () => (
    <React.Fragment>
        <Link to="./SearchPage">
            <Button icon="pi pi-search" className="p-button-danger" />
        </Link>
        <AuthenticationButton />
    </React.Fragment>
);
const MyToolbar: React.FunctionComponent = () => (
    <React.Fragment>
        <Toolbar left={left} right={right}/>
    </React.Fragment>
);


export default MyToolbar;
