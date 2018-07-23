import * as fromAuth from '../store/auth.actions'

export interface State {
    token: string;
    authenticated: boolean;
}

const initialState: State = {
    token: null,
    authenticated: false
};

export function authReducer(state = initialState, action: fromAuth.AuthActions) {
    switch (action.type) {
        case fromAuth.SIGNIN:
        case fromAuth.SIGNUP: {
            return{
                ...state,
                authenticated: true
            };
        }
        case fromAuth.LOGOUT: {
            return {
                ...state,
                token: null,
                authenticated: false
            };
        }
        case fromAuth.SET_TOKEN: {
            return{
                ...state,
                token: action.payload
            };
        }
        default:
            return state;
    }
}
