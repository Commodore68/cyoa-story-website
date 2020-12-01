import React, {useEffect} from "react";
import { Button } from 'primereact/button';
import { ChildChapter } from "../../../../../Backend/types/Chapter";
import { Link } from "react-router-dom";

interface NextChapterButtonsProps {
    nextChapters: Array<ChildChapter>,
}

function NextChapterButtons(props: NextChapterButtonsProps): JSX.Element {
    const {nextChapters} = props;

    return (
        <div className="p-d-flex p-flex-column p-p-2">
            {nextChapters.map((value, index) => {
                return <div key={`key${value.id}`}>
                    <Link to={`/Chapter/${value.id}`}>
                        <Button label={value.heading} className="p-button-link p-mr-2"/>
                    </Link>
                </div>;
            })}
        </div>
    );
}

export default NextChapterButtons;
