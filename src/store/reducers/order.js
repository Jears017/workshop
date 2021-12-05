const SET_PRODUCT_VALUE = 'SET_PRODUCT_VALUE'
const SET_PRODUCT_CONTAINER = 'SET_PRODUCT_CONTAINER'
const SET_EMPTY = 'SET_EMPTY'
const SET_FILTER_VALUE = 'SET_FILTER_VALUE'



const initialState = {
    productValue: null,
    container: [],
    filter: []
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_PRODUCT_VALUE:
            return {...state, productValue: action.payload}
        case SET_PRODUCT_CONTAINER:
            return {...state, container: [...state.container, action.payload]}
        case SET_EMPTY:
            return {...state, container: []}
        case SET_FILTER_VALUE:
            return {...state, filter: [...state.filter, action.payload]}
        default:
            return state
    }
}

export const setProductValue = (value) => {
    return {
        type: SET_PRODUCT_VALUE,
        payload: value
    }
}

export const setProductContainer = (product) => {
    return {
        type: SET_PRODUCT_CONTAINER,
        payload: product
    }
}

export const setContainerIsEmpty = () => {
    return {type: SET_EMPTY}
}

export const setFilterValue = (filterArr) => {
    return {type: SET_FILTER_VALUE, payload: filterArr}
}