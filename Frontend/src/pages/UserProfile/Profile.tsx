import React, {useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Link } from "react-router-dom";
import {Button} from 'primereact/button';
import {findOrCreateAuthorWrapper} from "../../common/utils/requests";
import {currentAuthorStore} from "~stores";


const Profile = (): JSX.Element => {
    const {isAuthenticated, user} = useAuth0();

    //this useEffect will only happen on the first page load as there are no values it is dependent on
    useEffect(() => {
        findOrCreateAuthorWrapper({isAuthenticated, user});
    }, []);

    return (
        <div>
            <div className="row align-items-center profile-header">
                <div className="col-md-2 mb-3">
                    <img
                        src={currentAuthorStore.author.picture}
                        alt="Profile"
                        className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
                    />
                </div>
                <div className="col-md text-center text-md-left">
                    <h2>{currentAuthorStore.author.userName}</h2>
                    <div>

                    </div>
                    <div className="col-md p-text-center"></div>
                    <h3>About me</h3>

                    <div>
                        {currentAuthorStore.author.bio}
                        <p>This is your basic Bio you can change it in the profile settings.</p>
                    </div>
                    <p className="lead text-muted">{currentAuthorStore.author.email}</p>
                </div>
            </div>
            <Link to="/ProfileSettings">
                <Button label="Edit Your Profile" className="p-mr-2" />
            </Link>
        </div>
    );
};

export default Profile;


