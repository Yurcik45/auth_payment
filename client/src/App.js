import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Auth from "./Pages/Auth";
import Home from "./Pages/Home";

const App = () => {
    const location = useLocation();
    let current_location = location.pathname;

    useEffect(() => {
        current_location = location.pathname;
    }, [location]);
    return (
        <div className="App">
            <Routes>
                <Route exec path="/" element={<Home />} />
                <Route exec path="/auth" element={<Auth />} />
            </Routes>
        </div>
    );
};

export default App;
