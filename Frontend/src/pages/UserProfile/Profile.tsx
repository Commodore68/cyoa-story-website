import React, {useEffect, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {Link, useParams} from "react-router-dom";
import {Button} from 'primereact/button';
import {findOrCreateAuthorWrapper} from "../../common/utils/requests";
import {currentAuthorStore, viewingAuthorStore} from "../../stores";
import {httpRequest} from "../../common/utils/axios";
import {ProgressSpinner} from "primereact/progressspinner";
import {Story} from "../../../../Backend/types/Story";
import {observer} from "mobx-react";

interface ProfilePageRouteParams {
    username: string
}


const Profile = observer((): JSX.Element => {
    const {isAuthenticated, user} = useAuth0();
    const {username} = useParams<ProfilePageRouteParams>();

    const [stories, setStories] = useState<Array<Story>>();

    //this useEffect will only happen on the first page load as there are no values it is dependent on
    useEffect(() => {
        findOrCreateAuthorWrapper({isAuthenticated, user});
        async function fetchData() {
            viewingAuthorStore._isLoading = true;
            const response = await httpRequest({
                method: 'POST',
                endpoint: '/api/authors/',
                data: {
                    data: [username],
                    type: 'find-many'
                }
            });

            viewingAuthorStore.author = response.data[0];
            viewingAuthorStore._isLoading = false;

            const storyResponse = await httpRequest({
                method: "POST",
                endpoint: '/api/stories/',
                data: {
                    author: viewingAuthorStore.author.id,
                    type: 'find-many'
                }
            });

            setStories(storyResponse.data[0]);
        }
        void fetchData();
    }, []);

    if (viewingAuthorStore._isLoading || currentAuthorStore._isLoading) {
        return <ProgressSpinner />;
    }

    return (
        <div>
            <div className="row align-items-center profile-header">
                <div className="col-md-2 mb-3">
                    <img
                        src={viewingAuthorStore.author.picture}
                        alt="Profile"
                        className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
                    />
                </div>
                <div className="col-md text-center text-md-left">
                    <h2>{viewingAuthorStore.author.userName}</h2>
                    <div>

                    </div>
                    <div className="col-md p-text-center"></div>
                    <h3>About me</h3>

                    <div>
                        {viewingAuthorStore.author.bio}
                        <p>This is your basic Bio you can change it in the profile settings.</p>
                    </div>
                    <p className="lead text-muted">{viewingAuthorStore.author.email}</p>
                </div>
                
            </div>
            <div className="p-mr-6">
                Stories
                {stories && stories.map((story) => {
                    return (
                        <div key={`story${story.id}`}>
                            <Link to={`/StoryOverview/${story.id}`} >
                                {story.title}
                            </Link>
                        </div>
                    );
                })}
            </div>
            {viewingAuthorStore.author.id === currentAuthorStore.author.id && <Link to="/ProfileSettings">
                <Button label="Edit Your Profile" className="p-mr-2"/>
            </Link>}
        </div>
    );
});

export default Profile;


