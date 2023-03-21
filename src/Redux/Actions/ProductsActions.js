export const SET_PRODUCTS = '@products/SET_PRODUCTS'
export const SET_IS_MANAGER = '@products/SET_IS_MANAGER'
export const SET_NEW_PRODUCT = '@products/SET_NEW_PRODUCT'
export const SET_UPDATE_PRODUCT = '@products/SET_UPDATE_PRODUCT'
export const SET_USER = '@products/SET_USER'
export const REMOVE_USER = '@products/REMOVE_USER'
export const SET_UPDATE_USER = "@products/SET_UPDATE_USER"
export const SET_DONATION = '@products/SET_DONATIONS'
export const GET_PRODUCT = '@products/GET_PRODUCT'
export const ADD_INVATION = "@products/ADD_INVATION"
export const REMOVE_INVATION = "@products/REMOVE_INVATION"
export const PAYMENT = "@products/PAYMENT"


export const setProducts = (products) => ({
    type: SET_PRODUCTS,
    payload: { products }
})

export const setIsManager = (isManager) => ({
    type: SET_IS_MANAGER,
    payload: { isManager }
})

export const setNewProduct = (product) => ({
    type: SET_NEW_PRODUCT,
    payload: { product }
})

export const updateProduct = (product) => ({
    type: SET_UPDATE_PRODUCT,
    payload: { product }
})

export const setUser = (user) => ({
    type: SET_USER,
    payload: { user }
})

export const updateUser = (user) => ({
    type: SET_UPDATE_USER,
    payload: { user }
})

export const setDonation = (donation) => ({
    type: SET_DONATION,
    payload: { donation }
})

export const getProduct = (id) => ({
    type: GET_PRODUCT,
    payload: { id }
})

export const removeUser = () => ({
    type: REMOVE_USER
})

export const addInvation = (invation) => ({
    type: ADD_INVATION,
    payload: { invation }
})

export const removeInvation = (id) => ({
    type: REMOVE_INVATION,
    payload: { id }
})

export const payment = () => ({
    type: PAYMENT,
})