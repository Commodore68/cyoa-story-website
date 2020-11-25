import React from "react";



const ProfileSettings = () => {
return(
<form onSubmit={UpdateUserProfile}>
    <label><h4>Change Your Username</h4></label>

    <input type= "text" itemID= "name" placeholder= "Change username here!"></input>
    <br/>
    <label><h4>Update Your Bio</h4></label>
    
    <input type= "textarea" itemID = "Bio" placeholder="Change Bio here!"></input>
    <br/>
    <input type="submit" value="Submit"/>
    
    </form>
)
}

const PsItems =[
    {name: "name"},
    {name: "Bio"},
    {name: "email"},
    {name: "picture"}
]



export default ProfileSettings;

