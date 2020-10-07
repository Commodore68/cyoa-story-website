import React from 'react';
import { render } from 'react-dom';
import './assets/index.scss';

const Application: React.FunctionComponent<any> = () => (
    <h1>Application</h1>
);

render(<Application />, document.getElementById('root'));