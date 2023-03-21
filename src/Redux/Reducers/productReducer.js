import { createStore } from "redux";
import * as actions from '../Actions/ProductsActions'

const initialState = {
    user: null,
    products: [],
    donations: [],
    invations: [],
    isManager: false
}

function reducer(state, action) {
    switch (action.type) {
        case actions.SET_PRODUCTS: {
            return { ...state, products: action.payload.products }
        }

        case actions.SET_NEW_PRODUCT: {
            const newState = { ...state }
            newState.products = [...state.products, { ...action.payload.product }]
            return newState
        }

        case actions.SET_UPDATE_PRODUCT: {
            const newState = { ...state }
            newState.products = [...state.products]
            const index = state.products.findIndex(i => i.id == action.payload.product.id)
            newState.products.splice(index, 1, action.payload.product)
            return newState

        }

        case actions.SET_USER: {
            return { ...state, user: action.payload.user };
        }

        case actions.REMOVE_USER: {
            return { ...state, user: null, isManager: false, invations: [] };
        }

        case actions.SET_IS_MANAGER: {
            return { ...state, isManager: action.payload.isManager };
        }

        case actions.SET_UPDATE_USER: {
            return { ...state, user: action.payload.user };
        }

        case actions.SET_DONATION: {
            return { ...state, donations: [...state.donations, action.payload.donation] }
        }

        case actions.GET_PRODUCT: {
            return state.products.find(p => p.id == action.payload);
        }

        case actions.ADD_INVATION: {
            return { ...state, invations: [...state.invations, action.payload.invation] }
        }

        case actions.REMOVE_INVATION: {
            const index = state.invations.findIndex(i => i.id == action.payload)
            const newState = { ...state, invations: [...state.invations] }
            newState.invations.splice(index, 1);
            return newState
        }

        case actions.PAYMENT: {
            return { ...state, invations: [] };
        }

        default:
            return state;
    }

}
export const appStore = createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());