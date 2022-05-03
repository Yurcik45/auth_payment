import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { antdNotif } from "./antdNotif";
import Auth from "./Pages/Auth";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Page404 from "./Pages/Page404";
import { checkAuth, getDashboardData, initialAuth } from "./redux/actions/auth";
import axios from "axios";
import { notification } from "antd";
import Confirm from "./Pages/Confirm";

const style = {
    display: "flex",
    position: "absolute",
    bottom: 20,
    left: 20,
    width: 100,
    height: 30,
    border: "1px solid black",
    borderRadius: 10,
};
const App = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginned = useSelector((state) => state.auth.loginned);
    useCallback(() => {
        console.log("use memo");
    }, []);
    useEffect(() => {
        if (
            !localStorage.getItem("token") ||
            !localStorage.getItem("user_name")
        ) {
            if (
                location.pathname !== "/register" &&
                location.pathname !== "/auth" &&
                location.pathname.split("/")[2] !== "confirm"
            ) {
                //navigate("/auth");
                antdNotif("error", "unauthorized");
            }
        } else {
            dispatch(
                initialAuth(
                    localStorage.getItem("token"),
                    localStorage.getItem("user_name")
                )
            );
        }
        //dispatch(getDashboardData(() => navigate("/auth")));
    }, []);
    return (
        <div className="App">
            <div style={style} onClick={() => localStorage.clear()}>
                clear LS
            </div>
            <Routes>
                <Route exect path="/" element={<Home />} />
                <Route exect path="/auth" element={<Auth type="auth" />} />
                <Route
                    exect
                    path="/register"
                    element={<Auth type="register" />}
                />
                {loginned && (
                    <Route exect path="/dashboard" element={<Dashboard />} />
                )}

                <Route
                    exect
                    path="/auth/confirm/:user/:code"
                    element={<Confirm />}
                />
                <Route exect path="/*" element={<Page404 />} />
            </Routes>
        </div>
    );
};

export default App;
