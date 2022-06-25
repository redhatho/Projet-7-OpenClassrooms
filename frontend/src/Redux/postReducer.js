const INITIAL_STATE = {
    postArray: [],
};

function postReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'GET_POST': {
            return {
                ...state,
                postArray: action.payload,
            };
        }

        case 'NEW_POST': {
            //On fait un nouvel array avec tout ce qui est déjà dans postArray
            const newArray = [...state.postArray];
            //Unshift va mettre un élément au début de l'array
            newArray.unshift(action.payload);
            //Puis on retourne avec la propriété postArray qui va être égal à newArray
            return {
                ...state,
                postArray: newArray
            };
        }

        case 'DELETE_POST': {
            let newArray = [...state.postArray].filter((postId) => {
                return postId !== action.payload;
            });
            return {
                ...state,
                postArray: newArray,
            };
        }

        case 'UPDATE_POST': {
            let newArray = [...state.postArray];
            let findIndex = newArray.findIndex(
                (post) => post.postId === action.payload.postId
            );
            newArray[findIndex].description = action.payload.description;
            return {
                ...state,
                postArray: newArray,
            };
        }
        default:
            return state;
    }
}

export default postReducer