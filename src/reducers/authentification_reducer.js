import {authentification_constants} from "../constants/authentification_constants";
import {user_data_mock} from "../mock/authentification_mock";
import history from '../history'

const INITIAL_STATE = {
    loggingIn : false,
    loggedIn : false,
    loggingInFb : false,
    loggedInFb : false,
    logginFail: false,
    isRegistered : false,
    isRegisterFail: false,
    isRegistering: false,
    user : null,
    resultDataUser : null,
    msg : ''
}

const applyLogInSuccess = (state, action) => {
    return{
        loggingIn: false,
        loggedIn : true,
        logginFail: false,
        user : action.user,
        resultDataUser: user_data_mock
    }
}

const applyLogInFbSuccess = (state, action) => {
    return{
        loggingInFb: false,
        loggedIn : true,
        logginFail: false,
        user : action.user,
    }
}


const applyLogInRequest = (state, action) => ({
    loggingIn: true,
    loggedIn : false,
    user : action.user
})

const applyLogInFbRequest = (state, action) => ({
    loggingInFb: true,
    loggedInFb : false,
    user : action.user
})

const applyRegisterRequest = (state, action) => ({
    isRegistering : true
})

const applyRegisterSuccess = (state, action) => {
    history.push('/login')
    return {
        isRegistered: true,
        isRegistering : false,
        user: action.user
    }

}
const applyLogInFaillure = (state, action) => ({
    logginFail: true,
    user: action.user,
    msgError : 'L\'e-mail et/ou le mot de passe ne sont pas corrects.'
})

const applyLogOutSuccess = (state, action) => {
    history.push('/login')
    return {
        loggedIn : false,
    }
}
function authentificationReducer (state = INITIAL_STATE, action) {

    switch (action.type) {
        //Listener login request
        case authentification_constants.LOGIN_REQUEST :
            return applyLogInRequest(state, action)
        case authentification_constants.LOGIN_FACEBOOK_REQUEST :
            return applyLogInFbRequest(state, action)
        //Listener login success
        case authentification_constants.LOGIN_SUCCESS :
            return applyLogInSuccess(state, action)
        //Listener login fb success
        case authentification_constants.LOGIN_FB_SUCCESS :
            return applyLogInFbSuccess(state, action)
        //Listener login faillure
        case authentification_constants.LOGIN_FAILLURE :
            return applyLogInFaillure(state, action)
        //Listener register request
        case authentification_constants.REGISTER_REQUEST :
            return applyRegisterRequest(state, action)
        //Listener register success
        case authentification_constants.REGISTER_SUCCESS :
            return applyRegisterSuccess(state, action)
        case authentification_constants.LOGOUT_REQUEST :
            return applyLogOutSuccess(state, action)
        default:
            return state
    }
}
export default authentificationReducer