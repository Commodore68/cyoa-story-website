import React, {useEffect} from 'react';
import NextChapterButtons from './subcomponents/NextChapterButtons';
import { chapterStore } from '../../stores';
import { Chapter } from '../../../../Backend/types/Chapter';
import { httpRequest } from '../../common/utils/axios';
import { findOrCreateAuthorWrapper } from '../../common/utils/requests';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'primereact/button';
import './ChapterReadingPage.scss';
import { Link, useParams } from 'react-router-dom';
import {ProgressSpinner} from "primereact/progressspinner";
import {observer} from "mobx-react";

interface ChapterReadingPageRouteParams {
    id: string
}

const ChapterReadingPage = observer((): JSX.Element => {
    
    const {isAuthenticated, user} = useAuth0();
    const {id} = useParams<ChapterReadingPageRouteParams>();

    useEffect(() => {
        async function fetchData() {
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
            chapterStore.chapter = response.data[0];
            chapterStore._isLoading = false;
        }
        void fetchData();
        findOrCreateAuthorWrapper({isAuthenticated, user});
    }, []);

    if (chapterStore._isLoading) {
        return <ProgressSpinner />;
    }

    return(
        <div>
            <div className="p-d-flex buttonHeading p-m-2">
                <Link to={`/Chapter/${chapterStore.chapter.parent}`}>
                    <Button label="Previous Chapter" className="p-button-raised p-button-rounded p-button-sm p-mr-2" />
                </Link>
            </div>
            <div className="p-d-flex p-flex-column">
                <div>
                    <div className = "center " style={{fontSize: "20px"}}>
                        {chapterStore.chapter.previousQuestion}
                    </div>
                    <div className="heading p-p-1 center">
                        {chapterStore.chapter.heading}
                    </div>
                    <div className="p-p-1 center" style={{fontSize: "18px"}}>
                        by:&nbsp;
                        <Link to={`/Profile/${chapterStore.chapter.authorName}`}>
                            { chapterStore.chapter.authorName }
                        </Link>
                    </div>
                    <div className="center dates p-m-1" style={{fontSize: "18px"}}>
                        {"Date Created: " + chapterStore.chapter.dateCreated.toDateString() + ", " + "Last Updated: " + chapterStore.chapter.dateUpdated.toDateString()}
                    </div>
                </div>
                <div className="p-d-flex p-mb-6">
                    <div style={{width: "15%"}} />
                    <div className="p-d-flex p-flex-column" style={{width:"70%"}}>
                        <div className="p-d-flex content p-p-2" style={{minHeight: "400px", fontSize: "20px"}}>
                            {chapterStore.chapter.content}
                        </div>
                        <div className="p-pl-4 p-pt-3 question">
                            {chapterStore.chapter.nextQuestion}
                        </div>
                        <div className="p-pl-5" style={{minHeight: "50px"}}>
                            <NextChapterButtons nextChapters={chapterStore.chapter.children} />
                        </div>
                        <div style={{width: "225px"}}>
                            <Link to={`/ChapterCreation/${chapterStore.chapter.id}`}>
                                <Button label="Add a New Chapter" icon="pi pi-plus"/>
                            </Link>
                        </div>
                    </div>
                    <div style={{width:"15%"}} />
                </div>
            </div>
        </div>      
    );
});

export default ChapterReadingPage;
