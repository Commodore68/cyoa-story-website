import React, {useEffect, useState} from "react";
import {currentAuthorStore} from "../../../stores";
import {Button} from "primereact/button";
import {httpRequest} from "../../../common/utils/axios";
import {findOrCreateAuthorWrapper} from "../../../common/utils/requests";
import {useAuth0} from "@auth0/auth0-react";
import {ProgressSpinner} from "primereact/progressspinner";


const ProfileSettings = (): JSX.Element => {
    const {isAuthenticated, user} = useAuth0();

    const [bio, setBio] = useState<string | null>(null);

    useEffect(() => {
        findOrCreateAuthorWrapper({isAuthenticated, user});
    }, []);

    useEffect(() => {
        async function setData() {
            const response = await httpRequest({
                method: 'POST',
                endpoint: '/api/authors/',
                data: {
                    data: currentAuthorStore.author,
                    type: 'update-one'
                }
            });

            try {
                const value = response.data;

                document.getElementById('response').innerText = 'New Chapter Created';
            } catch (e) {
                document.getElementById('response').innerText = 'Chapter Creation failed';
            }
        }
        void setData();
    }, [currentAuthorStore.author.bio]);

    function updateAuthorInfo() {
        if (bio) {
            currentAuthorStore.author.bio = bio;
        }
    }

    if (currentAuthorStore._isLoading) {
        return <ProgressSpinner />;
    }

    return(
        <div>
            <form>
                {/*<label><h4>Change Your Username</h4></label>*/}

                {/*<input type= "text" itemID= "name" placeholder= "Change username here!"/>*/}
                {/*<br/>*/}
                <label><h4>Update Your Bio</h4></label>
                <input
                    type= "textarea"
                    id = "Bio"
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Change Bio here!"
                />
                <br/>
            </form>
            <Button label="Submit" onClick={(e) => updateAuthorInfo()} className="p-mr-2"/>
            <p id="response"></p>
        </div>
    );
};



export default ProfileSettings;

