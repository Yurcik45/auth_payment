import {
    AUTH_USER_SUCCESS,
    AUTH_USER_PENDING,
    AUTH_USER_FAIL,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_PENDING,
    REGISTER_USER_FAIL,
    ACCOUNT_STATUS_ACTIVE,
    ACCOUNT_STATUS_PENDING,
    ACCOUNT_STATUS_BLOCKED,
    INITIAL_AUTH_SUCCESS,
    INITIAL_AUTH_FAIL,
} from "../types";

const initialState = {
    name: "",
    role: "",
    status: "", //ACTIVE | PENDING | BLOCKED
    loginned: false,
    pending: false,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case INITIAL_AUTH_SUCCESS:
            return {
                ...state,
                name: action.payload.login,
                role: action.payload.role,
                token: action.payload.token,
                loginned: true,
                pending: false,
            };
        case INITIAL_AUTH_FAIL:
            return {
                name: "",
                role: "",
                status: "",
                token: "",
                loginned: false,
                pending: false,
            };
        case AUTH_USER_SUCCESS:
            return {
                ...state,
                name: action.payload.db.login,
                role: action.payload.db.role,
                token: action.payload.token,
                loginned: true,
                pending: false,
            };
        case AUTH_USER_PENDING:
            return {
                ...state,
                pending: true,
            };
        case AUTH_USER_FAIL:
            return {
                name: "",
                role: "",
                status: "",
                token: "",
                loginned: false,
                pending: false,
            };
        case REGISTER_USER_SUCCESS:
            return {
                name: "",
                role: "",
                status: "",
                token: "",
                loginned: false,
                pending: false,
            };
        case REGISTER_USER_PENDING:
            return {
                ...state,
                pending: true,
            };
        case REGISTER_USER_FAIL:
            return {
                name: "",
                role: "",
                status: "",
                token: "",
                loginned: false,
                pending: false,
            };
        case ACCOUNT_STATUS_ACTIVE:
            return {
                ...state,
                status: action.payload,
            };
        case ACCOUNT_STATUS_PENDING:
            return {
                ...state,
                status: action.payload,
            };
        case ACCOUNT_STATUS_BLOCKED:
            return {
                ...state,
                status: action.payload,
            };
        default:
            return state;
    }
};
