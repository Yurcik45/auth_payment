import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { antdNotif } from "./antdNotif";
import Auth from "./Pages/Auth";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Page404 from "./Pages/Page404";
import { checkAuth, getDashboardData } from "./redux/actions/auth";

const App = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginned = useSelector((state) => state.auth.loginned);
    useEffect(() => {
        //if (!localStorage.getItem("token")) {
        //    navigate("/auth");
        //    antdNotif("error", "unauthorized");
        //}
        getDashboardData((err) => {
            console.log("GET DASHBOARD DATA ERROR", err);
            if (
                err.response.status == 401 &&
                location.pathname !== "/auth" &&
                location.pathname !== "/register"
            ) {
                navigate("/auth");
                antdNotif("error", err.response.data);
            }
        });
    }, []);
    return (
        <div className="App">
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
                <Route exect path="/*" element={<Page404 />} />
            </Routes>
        </div>
    );
};

export default App;
