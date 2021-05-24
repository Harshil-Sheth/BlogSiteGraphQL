import { GET_QUERY, POST_QUERY } from './actions';

export const reducer = (state, action) => {
    debugger
    switch (action.type) {
        case GET_QUERY:
            return {
                ...state,
                posts: action.payload,
            };
        case POST_QUERY:
            return {
                ...state,
                posts: [...state.posts,action.payload]
            };
        default:
            return {
                ...state,
            };
    };
};