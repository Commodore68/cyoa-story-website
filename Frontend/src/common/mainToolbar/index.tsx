import React from 'react';
import {Button} from 'primereact/button';
import {Toolbar} from "primereact/toolbar";
import {Link} from 'react-router-dom';

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

const MyToolbar: React.FunctionComponent = () => (
    <React.Fragment>
        <Toolbar left={left} />
    </React.Fragment>
);


export default MyToolbar;
