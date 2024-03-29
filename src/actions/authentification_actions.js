import {authentification_constants} from '../constants/authentification_constants'

function doLoginRequest (user) {
    return {type : authentification_constants.LOGIN_REQUEST, user}
}
function doLoginFacebookRequest (user) {
    return {type : authentification_constants.LOGIN_FACEBOOK_REQUEST, user}
}
function doLoginFaillure (user) {
    return {type: authentification_constants.LOGIN_FAILLURE, user}
}
function doLogoutRequest () {
    return {type: authentification_constants.LOGOUT_REQUEST}
}
function doLoginSuccess (user) {
    return {type: authentification_constants.LOGIN_SUCCESS, user}
}
function doLoginFbSuccess (user) {
    return {type: authentification_constants.LOGIN_FB_SUCCESS, user}
}
function doRegister (user) {
    return {type: authentification_constants.REGISTER_REQUEST, user}
}
function doRegisterSuccess (user) {
    return {type: authentification_constants.REGISTER_SUCCESS, user}
}
function doRegisterFaillure (user) {
    return {type: authentification_constants.REGISTER_FAILLURE, user}
}

export {
    doLoginRequest,
    doLoginFacebookRequest,
    doLoginSuccess,
    doLoginFbSuccess,
    doLoginFaillure,
    doRegister,
    doRegisterSuccess,
    doRegisterFaillure,
    doLogoutRequest,
}

