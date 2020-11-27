import {currentAuthorStore} from "../../stores";
import {httpRequest} from "./axios";
import {action} from "mobx";
import {Author} from "../../../../Backend/types/Author";


export function findOrCreateAuthorWrapper({isAuthenticated, user}: {isAuthenticated: boolean, user: any}) {
    if (isAuthenticated) {
        currentAuthorStore._isLoading = true;

        const currentAuthor: Author = {
            bio: "",
            chapterBookmarks: [],
            createdChapters: [],
            createdStories: [],
            dateJoined: new Date(),
            email: user.email,
            id: user.sub,
            isAdmin: false,
            picture: user.picture,
            storyBookmarks: [],
            userName: user.name
        };

        currentAuthorStore.author = currentAuthor;

        //we have to wrap our async request in a synchronous method call bc useEffect is synchronous
        void findOrCreateAuthor();
    }
}

export const findOrCreateAuthor =  action('findOrCreateAuthor', async () => {
    const response = await httpRequest({
        method: 'POST',
        endpoint: '/api/authors/',
        data: {
            data: currentAuthorStore.author,
            type: 'find-one'
        }
    });

    if (response.data.length === 0) {
        await httpRequest({
            method: 'POST',
            endpoint: '/api/authors/',
            data: {
                data: currentAuthorStore.author,
                type: 'insert-one'
            }
        });
    } else {
        currentAuthorStore.author = response.data[0]; //todo: think about passing the object not wrapped in an array
    }

    currentAuthorStore._isLoading = false;
    console.log(response.data);
});
