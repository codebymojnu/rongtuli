import { actions } from "../actions";

const initialState = {
    loading: false,
    error: null,
    posts: []
};

function postReducer(state = initialState, action) {
    switch (action?.type) {
        case actions.post.DATA_FETCHING:
            return { ...state, loading: true };
        case actions.post.DATA_FETCHED:
            return { ...state, posts: action?.data, loading: false };
        case actions.post.DATA_FETCH_ERROR:
            return { ...state, error: action.err };
        case actions.post.DATA_CREATED:
            return { ...state, posts: [...state.posts, action?.data] };
        case actions.post.DELETE:
            return { ...state, posts: action?.data };
        case actions.post.DATA_UPDATED:
            return {
                ...state,
                posts: state?.posts?.map((p) => {
                    if (p.id === action?.data.id) {
                        return action?.data;
                    } else {
                        return p;
                    }
                }),
            };
        default:
            return state;
    }
}

export { initialState, postReducer };

