import {findOrCreateAuthorWrapper} from '../../common/utils/requests';
import {chapterStore} from '../../stores';
import {Button} from 'primereact/button';
import { Link } from "react-router-dom";
import React, {useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Editor } from 'primereact/editor';




chapterStore.chapter = {

    id:'someID',
    authorName: 'Name',
    authorId: 'Author',
    storyId: 'storyID',
    parent: 'Parent',
    heading: 'Heading',
    content: 'Content content content',
    previousQuestion: 'Previous Question', 
    nextQuestion: 'Next Question', 
    children: [],
    dateUpdated: new Date(),
    dateCreated: new Date()

};


interface ChapterCreationPageProps{
    params: {
        id:string

    }
}


const ChapterCreation = (props:ChapterCreationPageProps):JSX.Element => {

    const {isAuthenticated, user} = useAuth0();

    useEffect(() => {
    
        findOrCreateAuthorWrapper({isAuthenticated, user});
    }, []);


    
    return(
        <div>
            <h1 className="p-text-center">
                Create Your Chapter
            </h1>
            <form>
                <div className="p-d-flex p-ml-6">
                    <div style={{width:"10%"}} />
                    <div className="p-flex-column p-ml-1" style={{width:"80%"}}>
                        <label><h3>Enter Chapter Title</h3></label>
                        <input type="text" itemID="name" placeholder="Title" className="p-ml-6"></input>        
                        <label><h3>Enter Chapter Content</h3></label> 
                    </div>
                    <div style={{width:"10%"}} />
                </div>
                <div className="p-d-flex">
                    <div style={{width: "15%"}} />
                    <div className="p-flex-column" style={{width: "70%"}}>
                        <Editor style={{ height: '400px'}} />
                    </div>
                    <div style={{width: "15%"}} />
                </div>
                
                <div className="p-d-flex p-ml-6">
                    <div style={{width:"10%"}} />
                    <div className="p-flex-column p-ml-1" style={{width:"80%"}}>
                        <label><h3>Enter the Next Question</h3></label>
                        <input type="textarea" itemID="Question" placeholder="Next Question" className="p-ml-6"></input>
                        <br></br>                   
                        <p>
                        <Link to="/StoryCreation">
                            <Button label="Create Chapter" className="p-mr-2" />
                        </Link>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
 };
    

export default ChapterCreation;
