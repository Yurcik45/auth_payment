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
import axios from "axios";
import { antdNotif } from "../../antdNotif";
import { serv } from "../../constants";
import { JWT_LIFETIME_SECONDS } from "../../constants";

const requestConfig = {
    headers: { "Content-Type": "application/json" },
};

export const registerUser =
    (login, password, remember, role = "user", callback) =>
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
                    dispatch({ type: REGISTER_USER_FAIL });
                    return antdNotif("error", res.data.msg);
                }
                dispatch({ type: REGISTER_USER_SUCCESS });
                console.log(REGISTER_USER_SUCCESS, res);
                antdNotif(
                    "success",
                    `user ${res.data.login} register succesfully`
                );
                setTimeout(() => {
                    callback();
                }, 1000);
            })
            .catch((err) => {
                dispatch({ type: REGISTER_USER_FAIL });
                console.error(REGISTER_USER_FAIL, err);
                antdNotif("warning", err.message);
            });
    };
export const initialAuth = (token, login) => (dispatch) => {
    requestConfig.headers["Authorization"] = token;
    const url = `${serv}/initialAuth`;
    const body = { login };
    axios
        .post(url, body, requestConfig)
        .then((res) => {
            console.log(INITIAL_AUTH_SUCCESS, res);
            dispatch({ type: INITIAL_AUTH_SUCCESS, payload: res.data });
        })
        .catch((err) => {
            console.log(INITIAL_AUTH_FAIL, err);
            dispatch({ type: INITIAL_AUTH_FAIL });
        });
};
export const getDashboardData = (callback) => (dispatch) => {
    requestConfig.headers["Authorization"] = localStorage.getItem("token");
    const timeToEnd =
        Date.now() / 1000 - localStorage.getItem("tokenExpiresAt");
    console.log("tte", timeToEnd);
    const url = `${serv}/dashboard`;
    axios
        .get(url, requestConfig)
        .then((res) => {
            console.log("GET DASHBOARD DATA SUCCESS", res);
            antdNotif("success", "token is in actual condition");
        })
        .catch((err) => {
            if (err.response.status == 401 || err.response.status == 403) {
                dispatch({ type: AUTH_USER_FAIL });
                antdNotif("error", err.response.data.msg);
                setTimeout(() => {
                    antdNotif("warning", "please, login one more time");
                }, 500);
                setTimeout(() => {
                    callback();
                }, 1000);
            }
            callback(err);
        });
};
export const confirmEmail = (login, code, callback) => (dispatch) => {
    const body = { login, code };
    const url = `${serv}/auth/confirm`;
    axios
        .post(url, body, requestConfig)
        .then((res) => {
            console.log(ACCOUNT_STATUS_ACTIVE, res);
            dispatch({ type: ACCOUNT_STATUS_ACTIVE });
            antdNotif("success", res.data.msg);
            callback();
        })
        .catch((err) => {
            console.log(ACCOUNT_STATUS_PENDING, err);
        });
};
export const authUser =
    (login, password, remember, role = "user", callback) =>
    (dispatch) => {
        dispatch({ type: AUTH_USER_PENDING });
        const url = `${serv}/login`;
        const body = {
            login,
            password,
            remember,
            role,
            JWT_LIFETIME_SECONDS,
        };
        axios
            .post(url, body, requestConfig)
            .then((res) => {
                console.log("USER AUTH RES", res);
                const { status } = res;
                if (status == 200) {
                    dispatch({
                        type: ACCOUNT_STATUS_ACTIVE,
                        payload: res.data.status,
                    });
                    const currentTimeSeconds = Date.now() / 1000;
                    localStorage.setItem(
                        "tokenExpiresAt",
                        currentTimeSeconds + JWT_LIFETIME_SECONDS
                    );
                    console.log(AUTH_USER_SUCCESS, res.data);
                    dispatch({ type: AUTH_USER_SUCCESS, payload: res.data });
                    localStorage.setItem("user_name", res.data.db.login);
                    localStorage.setItem("token", res.data.token);
                    antdNotif("success", res.data.msg);
                    setTimeout(() => {
                        callback();
                    }, 1000);
                }
            })
            .catch((err) => {
                console.log(AUTH_USER_FAIL, err);

                const { status } = err.response;
                if (status == 400) {
                    dispatch({ type: AUTH_USER_FAIL });
                    antdNotif("error", err.response.data.msg);
                }
                if (status == 403) {
                    dispatch({ type: AUTH_USER_FAIL });
                    dispatch({
                        type: ACCOUNT_STATUS_PENDING,
                        payload: err.response.data.status,
                    });
                    localStorage.setItem(
                        "user_name",
                        err.response.data.db.login
                    );
                    antdNotif("warning", err.response.data.msg);
                }
                if (status == 405) {
                    dispatch({ type: AUTH_USER_FAIL });
                    dispatch({
                        type: ACCOUNT_STATUS_BLOCKED,
                        payload: err.response.data.status,
                    });
                    antdNotif("error", err.response.data.msg);
                }
            });
    };
