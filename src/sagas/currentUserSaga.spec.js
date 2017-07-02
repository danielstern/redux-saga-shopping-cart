import { currentUserSaga } from './currentUserSaga'
import { take, call, put, apply } from 'redux-saga/effects'
import {
    GET_CURRENT_USER_INFO,
    setCurrentUser
} from './../actions'

import fetch from 'isomorphic-fetch';
describe("The app",()=>{
    test("The test",()=>{
        const id = `NCC1701`;
        const user = {name:"Jean Luc"};
        const json = ()=>{};
        const response = {json};
        const gen = currentUserSaga();

        expect(gen.next().value).toEqual(take(GET_CURRENT_USER_INFO));
        expect(gen.next({id}).value).toEqual(call(fetch,`http://localhost:8081/user/${id}`));
        expect(gen.next(response).value).toEqual(apply(response, json));
        expect(gen.next(user).value).toEqual(put(setCurrentUser(user)));
    });
});