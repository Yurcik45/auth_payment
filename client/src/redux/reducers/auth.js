import { AUTH_USER_SUCCESS, AUTH_USER_PENDING, AUTH_USER_FAIL, REGISTER_USER_SUCCESS, REGISTER_USER_PENDING, REGISTER_USER_FAIL } from "../types";

const initialState = {
    name: "",
    role: "",
    loginned: false,
    pending: false,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case AUTH_USER_SUCCESS:
            return {
                name: action.login,
                role: action.role,
                loginned: true,
                pending: false
            }
        case AUTH_USER_PENDING:
            return {
                ...state,
                pending: true
            }
        case AUTH_USER_FAIL:
            return {
                name: "",
                role: '',
                loginned: false,
                pending: false
            }
        case REGISTER_USER_SUCCESS:
            return {
                name: "",
                role: '',
                loginned: false,
                pending: false
            }
        case REGISTER_USER_PENDING:
            return {
                ...state,
                pending: true
            }
        case REGISTER_USER_FAIL:
            return {
                ...state,
                pending: false
            }
        default:
            return state;
    }
};
