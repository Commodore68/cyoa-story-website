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
            <div className="p-d-flex p-flex-column" style={{width: "600px"}}>
                <div className="">
                    <Link to={`/StoryOverview/${recentStory.id}`} >
                        {recentStory.title}
                    </Link>
                </div>
                
                <div className="p-flex-column" style={{width: "20%"}}>
                    <Link to={`/Profile/${recentStory.authorName}`} >
                        {recentStory.authorName}
                    </Link>
                </div>
                <div className="p-flex-column" style={{width:"20%"}}>
                    {recentStory.dateUpdated.toDateString()}
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
                {/*<div>{recentStories.map((value,index)=>{
                    return <div key={`key${value.id}`}>
                        <Link to={`/Story/${value.id}`}>
                            {value.authorName}
                        </Link>
                        </div>
                })}
                </div>
                <div style={{height:"400px", overflow:"scroll"}}>
                    <div style={{fontSize:"150pt"}}>
                        something to test
                    </div>
                </div> */}
            </div>
            <div style={{width:"5%"}}/>
        </div>
    );
};

export default RecentlyUpdated; 