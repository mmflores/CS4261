const defaultState = {
    user: {}
}

export default function reducer(state = defaultState, {type , payload}: 
    {type: string, payload: any}): any{
    //work with state

    switch(type) {
        case 'SET_USER_State':
            return {
                ...state,
                user: {
                    username: payload
                }
            }
    }

    return state;
}