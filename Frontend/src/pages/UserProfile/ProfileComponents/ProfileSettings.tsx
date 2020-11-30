import React from "react";

function updateAuthorInfo() {
    //todo: finish the request function
   const formData = new FormData(document.forms.updateForm);

    if ( )
    formData.get.username
}

const ProfileSettings = (): JSX.Element => {
    return(
        <form name="updateForm" id="updateForm" onSubmit={updateAuthorInfo}>
            <label><h4>Change Your Username</h4></label>

            <input type= "text" itemID= "name" placeholder= "Change username here!"></input>
            <br/>
            <label><h4>Update Your Bio</h4></label>
    
            <input type= "textarea" itemID = "Bio" placeholder="Change Bio here!"></input>
            <br/>
            <input type="submit" value="Submit"/>
    
        </form>
    );
};



export default ProfileSettings;

