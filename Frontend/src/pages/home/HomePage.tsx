import React, {useEffect, useState} from 'react';
import {httpRequest} from "../../common/utils/axios";
import {Author} from "../../../../Backend/types/Author";


const fakeAuthor: Author = {
    chapterBookmarks: [],
    createdChapters: [],
    createdStories: [],
    dateJoined: new Date(),
    email: "someEmail@test.com",
    id: "thisisobviouslynotarealid",
    isAdmin: false,
    storyBookmarks: [],
    userName: "someUserName",
};

export const HomePage = (): JSX.Element => {
    const [testValue, setTestValue] = useState({});

    //this useEffect will only happen on the first page load as there are no values it is dependent on
    useEffect(() => {
        //we have to wrap our async request in a synchronous method call bc useEffect is synchronous
        async function fetchData() {
            const {data} = await httpRequest({
                method: 'POST',
                endpoint: 'http://localhost:3000/api/users/',
                data: {
                    user: fakeAuthor,
                    type: 'find-one'
                }
            });

            console.log(data);

            setTestValue(data);
        }
        void fetchData();
    }, []);

    const dataOutput = (data: { [key: string]: any }) => {
        return Object.keys(data).map((value, index) => {
            return <div key={`key${index}`}>{value}: {data[value]}</div>;
        });
    };

    return (
        <div>
            <h1>HomePage</h1>
            {testValue && dataOutput(testValue)}
        </div>
    );
};
