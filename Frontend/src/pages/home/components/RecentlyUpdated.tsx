import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { DataScroller } from 'primereact/datascroller';
import { Story } from '../../../../../Backend/types/Story';
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import './RecentlyUpdated.scss';

interface RecentlyUpdatedProps{
    recentStories: Array<Story>,
}

function RecentlyUpdated(props:RecentlyUpdatedProps): JSX.Element{
    const {recentStories} = props;

    const itemTemplate = (recentStory:Story) =>{
        return(
            <div className="p-d-flex" style={{width: "600px"}}>
                <div className="p-flex-column card p-p-2 p-m-2 p-shadow-5" style={{minWidth:"60%"}}>
                    <div className="">
                        <Link to={`/StoryOverview/${recentStory.id}`} >
                            {recentStory.title}
                        </Link>
                    </div>
                    
                    <div className="">
                        by:&nbsp;
                        <Link to={`/Profile/${recentStory.authorName}`} >
                            {recentStory.authorName}
                        </Link>
                    </div>
                    <div className="">
                        Last Updated:&nbsp;
                        {recentStory.dateUpdated.toDateString()}
                    </div>
                    <br/>
                </div>
            </div>
        )
    }

    return(
        <div className="p-d-flex">
            <div style={{width:"5%"}} />
            <div className="p-flex-column" style={{width:"90%"}}>
                <div className="p-mt-2" style={{fontSize:"18pt"}}>
                    Recently Updated Stories:
                </div>
                <div>
                    <DataScroller value={recentStories} itemTemplate={itemTemplate} rows={2} />
                </div>
            </div>
            <div style={{width:"5%"}}/>
        </div>
    );
};

export default RecentlyUpdated; 