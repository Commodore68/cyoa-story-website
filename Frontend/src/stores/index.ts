import {observable} from 'mobx';

export const currentUserStore = observable({
    _isloading: false,
    currentUser:{}
});