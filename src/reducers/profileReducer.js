import { actions } from './../actions/index';

const initialState = {
    loading: false,
    user: null,
    posts: null,
    error: null,
};

export default function profileReducer(state = initialState, action) {
    console.log(state, action.type, action.data)
    switch (action.type) {
        case actions.profile.PROFILE_DATA_FETCHING:
            return { ...state, loading: true };
        case actions.profile.PROFILE_DATA_FETCHED:
            return {
                ...state,
                user: action.data.user,
                posts: action.data.posts,
                loading: false,
            };
        case actions.profile.PROFILE_DATA_FETCHED_ERROR:
            return { ...state, error: action.error, loading: false };
        case actions.profile.BIO_UPDATED:
            return {
                ...state,
                user: action.data,
                loading: false,
            };
        case actions.profile.IMAGE_UPDATE:
            return { ...state, user: { ...state.user, avatar: action.data.avatar } };

        case actions.profile.POST_DELETE:
            return { ...state, posts: state?.posts.filter(p => p.id !== action?.data) }
        case actions.profile.DATA_UPDATED:
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

export { initialState };

