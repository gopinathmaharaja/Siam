import { FETCH_IMAGES, IMAGE_DETAIL } from "../actions/actionTypes"

const initialstate = {
    images: null,
    image_detail: null
}

export default function (state = initialstate, action) {
    switch (action.type) {
        case FETCH_IMAGES:
            return {
                ...state,
                images: action.data
            }
        case IMAGE_DETAIL:
            return {
                ...state,
                image_detail: action.data
            }
        default:
            return state;
    }
}