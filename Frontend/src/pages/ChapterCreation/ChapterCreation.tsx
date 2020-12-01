import {findOrCreateAuthorWrapper} from '../../common/utils/requests';
import {chapterStore, currentAuthorStore, storyStore} from '../../stores';
import {Button} from 'primereact/button';
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Editor } from 'primereact/editor';
import {httpRequest} from "../../common/utils/axios";
import {ProgressSpinner} from "primereact/progressspinner";
import {Chapter} from "../../../../Backend/types/Chapter";
import { v4 as uuidv4 } from 'uuid';
import {observer} from "mobx-react";

interface ChapterCreationPageRouteParams {
    id: string
}

export const ChapterCreation = observer((): JSX.Element => {
    const {isAuthenticated, user} = useAuth0();
    const {id} = useParams<ChapterCreationPageRouteParams>();

    const [successResponse, setSuccessResponse] = useState<boolean>(false);
    const [newChapter, setNewChapter] = useState<Chapter>();
    const [heading, setHeading] = useState<string | null>(null);
    const [content, setContent] = useState<string | null>(null);
    const [nextQuestion, setNextQuestion] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            if (id.includes('newStory')) {
                const newStoryId = id.replace('newStory', '');

                storyStore._isLoading = true;

                const response = await httpRequest({
                    method: 'POST',
                    endpoint: '/api/stories/',
                    data: {
                        data: {
                            id: newStoryId,
                        },
                        type: 'find-one'
                    }
                });
                storyStore.story = response.data;
                storyStore._isLoading = false;

                chapterStore.chapter = {
                    authorId: "",
                    authorName: "",
                    children: [],
                    content: "",
                    dateCreated: new Date(),
                    dateUpdated: new Date(),
                    heading: "",
                    id: "",
                    nextQuestion: "This is the First Chapter",
                    parent: "",
                    previousQuestion: "",
                    storyId: storyStore.story.id
                };


            } else {
                chapterStore._isLoading = true;
                const response = await httpRequest({
                    method: 'POST',
                    endpoint: '/api/chapters/',
                    data: {
                        data: {
                            id: id,
                        },
                        type: 'find-one'
                    }
                });
                chapterStore.chapter = response.data;
                chapterStore._isLoading = false;

                storyStore._isLoading = true;
                response = await httpRequest({
                    method: 'POST',
                    endpoint: '/api/stories/',
                    data: {
                        data: {
                            id: chapterStore.chapter.storyId,
                        },
                        type: 'find-one'
                    }
                });
                storyStore.story = response.data;
                storyStore._isLoading = false;
            }
        }
        void fetchData();
        findOrCreateAuthorWrapper({isAuthenticated, user});
    }, []);

    useEffect(() => {
        async function setData() {
            const response = await httpRequest({
                method: 'POST',
                endpoint: '/api/chapters/',
                data: {
                    data: newChapter,
                    type: 'insert-one'
                }
            });

            let response2;
            if (newChapter && newChapter.parent !== '') {

                response2 = await httpRequest({
                    method: 'POST',
                    endpoint: '/api/chapters/',
                    data: {
                        data: newChapter,
                        type: 'update-one'
                    }
                });
            } else if (newChapter && newChapter.parent === '') {
                storyStore.story.firstNode = newChapter.id;

                response2 = await httpRequest({
                    method: 'POST',
                    endpoint: '/api/stories/',
                    data: {
                        data: storyStore.story,
                        type: 'update-one'
                    }
                });
            }

            try {
                const value = response.data;
                const value2 = response2.data;
                setSuccessResponse(true);

                document.getElementById('response').innerText = 'New Chapter Created';
            } catch (e) {
                setSuccessResponse(false);
                document.getElementById('response').innerText = 'Chapter Creation failed';
            }
        }
        void setData();
    }, [newChapter]);

    function addNewChapter() {
        if (heading && content && nextQuestion) {
            const tempChapter: Chapter = {
                authorId: currentAuthorStore.author.id,
                authorName: currentAuthorStore.author.userName,
                children: [],
                content: content,
                dateCreated: new Date(),
                dateUpdated: new Date(),
                heading: heading,
                id: uuidv4(),
                nextQuestion: nextQuestion,
                parent: chapterStore.chapter.id,
                previousQuestion: chapterStore.chapter.nextQuestion,
                storyId: chapterStore.chapter.storyId
            };

            setNewChapter(tempChapter);
        } else {
            alert('Please enter text for heading content and nextQuestion');
        }
    }


    if (chapterStore._isLoading || currentAuthorStore._isLoading || storyStore._isLoading) {
        return <ProgressSpinner />;
    }

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
                        <input
                            type="text"
                            id="heading"
                            name="heading"
                            placeholder="Chapter Heading"
                            onChange={(e) => setHeading(e.target.value)}
                            className="p-ml-6"
                        />
                        <label><h3>Enter Chapter Content</h3></label> 
                    </div>
                    <div style={{width:"10%"}} />
                </div>
                <div className="p-d-flex">
                    <div style={{width: "15%"}} />
                    <div className="p-flex-column" style={{width: "70%"}}>
                        <Editor
                            id="content"
                            style={{ height: '400px'}}
                            onTextChange={(e) => setContent(e.htmlValue)}
                        />
                    </div>
                    <div style={{width: "15%"}} />
                </div>
                
                <div className="p-d-flex p-ml-6">
                    <div style={{width:"10%"}} />
                    <div className="p-flex-column p-ml-1" style={{width:"80%"}}>
                        <label><h3>Enter the Next Question</h3></label>
                        <input
                            type="textarea"
                            id="nextQuestion"
                            name="nextQuestion"
                            onChange={(e) => setNextQuestion(e.target.value)}
                            placeholder="Next Question" className="p-ml-6"
                        />
                        <br/>
                    </div>
                </div>
            </form>
            <p>
                <Button
                    id="createChapterButton"
                    label="Create Chapter"
                    className="p-mr-2"
                    onClick={(e) => addNewChapter()}
                />
                {successResponse && <Link to={`/Chapter/${newChapter.id}`}>
                    <Button label="Go To New Chapter" className="p-mr-2 p-button-success"/>
                </Link>}
            </p>
            <p id="response"></p>
        </div>
    );
});
