import React, {useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Author } from "~../../Backend/types/Author";
import { currentUserStore } from "../../stores";
import {httpRequest} from "../../common/utils/axios";
import { Link } from "react-router-dom";
import {Button} from 'primereact/button';


const Profile = () => {
    const { user } = useAuth0();
    const { name, picture, email, bio } = user;


    useEffect(() => {
        const currentUser: Author={id: user.name,
            isAdmin: false,
            userName: user.nickname,
            picture: user.picture,
            email: user.email,
            storyBookmarks: [],
            chapterBookmarks: [],
            createdStories: [],
            createdChapters: [],
            dateJoined: new Date,
        };
        currentUserStore.currentUser= currentUser;
        
        //we have to wrap our async request in a synchronous method call bc useEffect is synchronous
        /**
         *
         */
        async function fetchData() {
            const {data} = await httpRequest({
                method: 'POST',
                endpoint: 'http://localhost:3000/api/users/',
                data: {
                    data: currentUserStore.currentUser,
                    type: 'find-one'
                }
            });
            if(data !== undefined){
                currentUserStore.currentUser = data;}
            else{
                const {data} = await httpRequest({
                    method: 'POST',
                    endpoint: 'http://localhost:3000/api/users/',
                    data: {
                        data: currentUserStore.currentUser,
                        type: 'insert-one'
                    }
                }
                );
            }

            console.log(data);


        }
        void fetchData();
    }, []);
    return (
        <div>

            <h1><div className="row align-items-center profile-header">
                <div className="col-md-2 mb-3">
                    <img
                        src={picture}
                        alt="Profile"
                        className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
                    />
                </div>
                <div className="col-md text-center text-md-left">
                    <h2>{name}</h2>
                    <div>

                    </div>
                    <div className="col-md p-text-center"></div>
                    <h3>About me</h3>

                    <div>
                        {bio}
                        <p>This is your basic Bio you can change it in the profile settings.</p>
                    </div>
                    <p className="lead text-muted">{email}</p>
                </div>
            </div></h1>
            <div className="row">
                <pre className="col-12 text-light bg-dark p-4">
                    {JSON.stringify(user, null, 2)}
                </pre>
            </div>
            <Link to="/ProfileSettings">
                <Button label="ProfileSettings" className="p-mr-2" />
            </Link>
        </div>
    );
};

export default Profile;


