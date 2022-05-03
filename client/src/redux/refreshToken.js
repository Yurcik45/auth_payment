import axios from "axios";
import { serv } from "./serv";
const JWT_LIFETIME_SECONDS = 20;
export const loggingMiddleware = function (store) {
    refreshToken();
    return function (next) {
        return function (action) {};
    };
};
export const refreshToken = () => {
    console.log("TOKEN REFRESH START");
    setInterval(() => {
        const toExpire =
            Date.now() / 1000 - localStorage.getItem("tokenExpiresAt");
        console.log(toExpire);
    }, 2000);
    //const login = localStorage.getItem("user_name");
    //const old_token = localStorage.getItem("token");
    //const config = {
    //    headers: {
    //        "Content-Type": "application/json",
    //        Authorization: old_token,
    //    },
    //};
    //const body = {
    //    login,
    //    JWT_LIFETIME_SECONDS,
    //};
    //const requestUrl = `${serv}/login/refresh_token`;
    //axios
    //    .post(requestUrl, body, config)
    //    .then((response) => {
    //        console.log("token response", response.data);
    //        const { token } = response.data;
    //        localStorage.setItem("token", token);
    //        const currentTimeSeconds = Date.now() / 1000;
    //        localStorage.setItem(
    //            "tokenExpiresAt",
    //            currentTimeSeconds + JWT_LIFETIME_SECONDS
    //        );
    //    })
    //    .catch(function (error) {
    //        console.warn("refresh error", error);
    //    });
};
