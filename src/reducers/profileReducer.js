import { actions } from './../actions/index';

const initialState = {
    loading: false,
    user: null,
    posts: null,
    error: null
}

export default function profileReducer(state, action) {
    switch (action.type) {
        case actions.profile.PROFILE_DATA_FETCHING:
            return { ...state, loading: true };
        case actions.profile.PROFILE_DATA_FETCHED:
            return { ...state, user: action.data.user, posts: action.data.posts, loading: false }
        case actions.profile.PROFILE_DATA_FETCHED_ERROR:
            return { ...state, error: action.error, loading: false }
        case actions.profile.BIO_UPDATED:
            return { ...state, loading: false, user: action.data.user }
        default:
            return state;
    }
}

export { initialState, profileReducer };

