const SET_LOGIN = 'SET_LOGIN'
const SET_PASSWORD = 'SET_PASSWORD'
const SET_IS_AUTH = 'SET_IS_AUTH'
const CLEAR_LOGIN_DATA = 'CLEAR_LOGIN_DATA'
const LOGOUT = 'LOGOUT'

const initialState = {
    login: '',
    password: '',
    isAuthenticated: false
}


export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN:
            return {...state, login: action.payload}
        case SET_PASSWORD:
            return {...state, password: action.payload}
        case SET_IS_AUTH:
            return {...state, isAuthenticated: action.payload}
        case CLEAR_LOGIN_DATA:
            return {...state, login: '', password: ''}
        case LOGOUT:
            return {...state, isAuthenticated: false}
        default:
            return state;
    }
}


export const setLoginData = (data) => {
    return {type: SET_LOGIN, payload: data}
}

export const setPasswordData = (data) => {
    return {type: SET_PASSWORD, payload: data}
}

export const setIsAuth = (data) => {
    return {type: SET_IS_AUTH, payload: data}
}

export const clearLoginData = () =>{
    return {type: CLEAR_LOGIN_DATA}
}

export const logout = () => {
    return {type: LOGOUT}
}