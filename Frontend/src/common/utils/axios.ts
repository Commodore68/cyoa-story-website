/* eslint-disable
@typescript-eslint/no-unsafe-call,
@typescript-eslint/no-unsafe-member-access,
@typescript-eslint/no-unsafe-return,
@typescript-eslint/no-unsafe-assignment
*/


import axios, {AxiosInstance} from 'axios';

export type getURLFunction = () => string;

interface RequestParams {
    getURL?: getURLFunction,
    method: 'GET' | 'POST' | 'PUT', //type of request
    endpoint: string, //the url to request to. This is may include the querystring in get requests
    headers?: {[key: string]: string} //this will be required for authorization of the api if we do that
    data?: {[key: string]: any} //data to be added in a post or put request
}

const instance: AxiosInstance = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
});

instance.interceptors.response.use(function (response) {
    //todo: potentially deal with errors from the http request
    return response;
}, function (error) {
    return Promise.reject(error);
});

export function httpRequest(args: RequestParams) {
    //todo: we may need to get the uid of the current user


    return instance({
        url: args.endpoint,
        method: args.method,
        headers: args.headers,
        data: args.data,
    }).then((res) => {
        const {data} = res;
        return data;
    }).catch((err) => {
        console.log('an error occurred in the request');
        console.log(err);
    });

}
