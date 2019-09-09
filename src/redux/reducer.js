const initialState = {
    username: '',
    id: 0,
    profile_pic: ''
}

const UPDATE_USER = 'UPDATE_USER'

export function updateUser(id, username, profile_pic) {

    return {
        type: UPDATE_USER,
        payload: {
            id,
            username,
            profile_pic
        }
    }
}

export default function reducer(state = initialState, action) {

    const { type, payload } = action

    switch(type) {

        case UPDATE_USER:
            return Object.assign({}, state, {...payload})
        
        default:
            return state
    }
    
}