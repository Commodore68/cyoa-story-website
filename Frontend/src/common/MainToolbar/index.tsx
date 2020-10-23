import React from 'react';
import {Button} from 'primereact/button';
import {Toolbar} from "primereact/toolbar";
import {Link} from 'react-router-dom';
import AuthenticationButton from "../AuthenticationButton";

const left = () => (
    <React.Fragment>
        <Link to="/home">
            <Button label="Home" className="p-mr-2" />
        </Link>
        <Link to="/some-other-page">
            <Button label="Some Other Page" className="p-button-link" />
        </Link>
    </React.Fragment>
);

const right = () => (
    <React.Fragment>
        <AuthenticationButton />
        <Button icon="pi pi-home" className="p-mr-2" />
        <Link to="/Login">
            <Button icon="pi pi-users" className="p-button-success p-mr-2" />
        </Link>
        <Button icon="pi pi-search" className="p-button-danger" />
    </React.Fragment>
);
const MyToolbar: React.FunctionComponent = () => (
    <React.Fragment>
        <Toolbar left={left} right={right}/>
    </React.Fragment>
);


export default MyToolbar;
