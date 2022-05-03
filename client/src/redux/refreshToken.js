import axios from "axios";
import { antdNotif } from "../antdNotif";
import { serv } from "../constants";
import { JWT_LIFETIME_SECONDS } from "../constants";
export const loggingMiddleware = function (store) {
    console.log("TOKEN REFRESH START");
    refreshToken();
    return function (next) {
        return function (action) {};
    };
};
export const refreshToken = () => {
    setInterval(() => {
        if (
            !(
                localStorage.getItem("token") ||
                localStorage.getItem("user_login") ||
                localStorage.getItem("tokenExpiresAt")
            )
        ) {
            localStorage.clear();
            console.warn("TOKEN NOT DEFINED");
        }
        const toExpire =
            Date.now() / 1000 - localStorage.getItem("tokenExpiresAt");
        console.log(toExpire);
        if (toExpire >= 0) {
            localStorage.clear();
            return console.warn("TOKEN IS EXPIRE");
        }
        if (toExpire > -35) {
            console.log("time to update");
            const login = localStorage.getItem("user_name");
            const old_token = localStorage.getItem("token");
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: old_token,
                },
            };
            const body = {
                login,
                JWT_LIFETIME_SECONDS,
            };
            const requestUrl = `${serv}/login/refresh_token`;
            axios
                .post(requestUrl, body, config)
                .then((response) => {
                    console.log("token response", response.data);
                    const { token, msg } = response.data;
                    localStorage.setItem("token", token);
                    const currentTimeSeconds = Date.now() / 1000;
                    localStorage.setItem(
                        "tokenExpiresAt",
                        currentTimeSeconds + JWT_LIFETIME_SECONDS
                    );
                    antdNotif("success", msg);
                })
                .catch(function (err) {
                    console.warn("refresh error", err);
                    if (err.response.status == 403) {
                        localStorage.clear();
                        return antdNotif("error", err.response.data.msg);
                    }
                });
        }
    }, 20000);
};
