const INTIAL_STATE = {
    userForm: [],
};

function inputReducer(state = INTIAL_STATE, action) {
    switch (action.type) {
        case 'GET_REGISTER': {
            return {
                ...state,
                userForm: action.payload,
            };
        }

        case 'GET_LOGIN': {
            return {
                ...state,
                userForm: action.payload,
            };
        }

        default:
            return state;
    }
}

export default inputReducer;