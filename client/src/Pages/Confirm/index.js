import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmEmail } from "../../redux/actions/auth";
import "./index.css";

const Confirm = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const name = location.pathname.split("/")[3];
        const code = location.pathname.split("/")[4];
        dispatch(
            confirmEmail(name, code, () => {
                const timeout = setTimeout(() => {
                    navigate("/auth");
                    clearTimeout(timeout);
                }, 1500);
            })
        );
    }, []);
    return <div className="Confirm">Confirm Page</div>;
};

export default Confirm;
