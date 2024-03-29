import { call, put, delay } from 'redux-saga/effects';
import {doLoginFaillure, doLoginSuccess, doRegisterSuccess, doRegisterFaillure, doLoginFbSuccess} from "../actions/authentification_actions";
import {login, register, fbAuth} from '../api/authentification_api'

//login action
function *handleLoginRequest(action) {
    try{
        const {user} = action
        const result = yield call (login, user)
        yield delay(5000);
        yield put(doLoginSuccess(result))
    }catch (e) {
        yield delay(5000);
        yield put(doLoginFaillure(e))
    }

}
//login with facebook account
function *handleLoginFacebookRequest(action) {
    try{
        const {user} = action
        const result = yield call (fbAuth, user)
        console.log(result)
        yield put(doLoginFbSuccess(result.data.body[0]))
    }catch (e) {
        yield put(doLoginFaillure(e))
    }

}

//register action
function *handleRegisterRequest(action) {
    try{
        const {user} = action
        const result = yield call (register, user)
        yield delay(5000);
        yield put(doRegisterSuccess(result))
    }catch (e) {
        yield delay(5000);
        yield put(doRegisterFaillure(e))
    }

}

export {
    handleLoginRequest,
    handleRegisterRequest,
    handleLoginFacebookRequest
}