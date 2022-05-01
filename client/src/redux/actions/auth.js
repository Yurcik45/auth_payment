import { AUTH_USER_SUCCESS, AUTH_USER_PENDING, AUTH_USER_FAIL, REGISTER_USER_SUCCESS, REGISTER_USER_PENDING, REGISTER_USER_FAIL } from "../types";
import axios from "axios";
import { antdNotif } from "../../antdNotif";
const serv = "http://localhost:4000/api/v0";

const requestConfig = {
    headers: { "Content-Type": "application/json" },
};

export const registerUser =
    (login, password, remember, role = "user") =>
    (dispatch) => {
        dispatch({ type: REGISTER_USER_PENDING });
        const url = `${serv}/register`;
        const body = {
            login,
            password,
            remember,
            role,
        };
        axios
            .post(url, body, requestConfig)
            .then((res) => {
                if (res.data.msg) {
                    dispatch({type: REGISTER_USER_FAIL})
                    return antdNotif("error", res.data.msg);
                }
                dispatch({type: REGISTER_USER_SUCCESS})
                console.log(REGISTER_USER_SUCCESS, res);
                antdNotif(
                    "success",
                    `user ${res.data.login} register succesfully`
                );
                setTimeout(() => {
                    window.location.replace("/auth");
                }, 1000);
            })
            .catch((err) => {
                dispatch({type: REGISTER_USER_FAIL})
                console.error(REGISTER_USER_FAIL, err);
                antdNotif("warning", err.message)
            });
    };
export const authUser =
    (login, password, remember, role = "user") =>
    (dispatch) => {
        dispatch({ type: AUTH_USER_PENDING });
        const url = `${serv}/login`;
        const body = {
            login,
            password,
            remember,
            role,
        };
        axios
            .post(url, body, requestConfig)
            .then((res) => {
                if (res.data.msg) {
                    dispatch({type: AUTH_USER_FAIL})
                    return antdNotif("error", res.data.msg);
                }
                console.log(AUTH_USER_SUCCESS, res);
                dispatch({ type: AUTH_USER_SUCCESS, payload: res.data });
                localStorage.setItem("user_name", res.data.login);
                antdNotif(
                    "success",
                    `user ${res.data.login} loggined succesfully`
                );
                setTimeout(() => {
                    window.location.replace("/");
                }, 1000);
            })
            .catch((err) => {
                console.error(AUTH_USER_FAIL, err);
                dispatch({ type: AUTH_USER_FAIL, payload: err });
            });
    };
export const checkAuth = (login) => (dispatch) => {
    dispatch({ type: AUTH_USER_PENDING });
    const url = `${serv}/check_login`;
    const body = {
        login,
    };
    axios
        .post(url, body, requestConfig)
        .then((res) => {
            if (res.data.msg) {
                window.location.replace("/auth");
                dispatch({ type: AUTH_USER_FAIL });
                localStorage.removeItem("user_name");
                return antdNotif("warning", res.data.msg);
            }
            dispatch({ type: AUTH_USER_SUCCESS, payload: res.data });
        })
        .catch((err) => {
            console.error(AUTH_USER_FAIL, err);
            dispatch({ type: AUTH_USER_FAIL, payload: err });
        });
};
