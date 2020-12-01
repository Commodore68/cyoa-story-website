import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { Story } from '../../../../../Backend/types/Story';

interface RecentlyUpdatedProps{
    stories: Story,
}

function RecentlyUpdated(props:RecentlyUpdatedProps): JSX.Element{
    const {stories} = props;



    return(
        <div className="p-d-flex">
            <div style={{width:"5%"}} />
            <div className="p-flex-column" style={{width:"90%"}}>
                <div className="p-mt-2" style={{fontSize:"18pt"}}>
                    Recently Updated Stories:
                </div>
                <div>{stories.dateUpdated}</div>
                {/*<div style={{height:"400px", overflow:"scroll"}}>
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