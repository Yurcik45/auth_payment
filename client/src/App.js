import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Auth from "./Pages/Auth";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Page404 from "./Pages/Page404";
import { checkAuth } from "./redux/actions/auth";

const App = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const loginned = useSelector((state) => state.auth.loginned);
    useEffect(() => {
        if (localStorage.getItem("user_name") && !loginned) {
            dispatch(checkAuth(localStorage.getItem("user_name")));
        }
    }, [location.pathname]);
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
