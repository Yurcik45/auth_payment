import { useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../../Components/AuthForm/index";
import AuthServices from "../../Components/AuthServices/index";
import "./index.css";

const Auth = ({ type }) => {
    const location = useLocation().pathname;
    const navigation = useNavigate();
    const authRedirect = () => {
        if (location === "/auth") {
            navigation("/register");
        }
        if (location === "/register") {
            navigation("/auth");
        }
    };
    return (
        <div className="Auth">
            <div className="AuthContainer">
                <AuthForm type={type} />
                <div onClick={authRedirect} className="AuthRedirect">
                    {(location === "/auth" &&
                        "If you doesn't have account, click here") ||
                        (location === "/register" &&
                            "If you already have account, click here")}
                </div>
                <AuthServices />
            </div>
        </div>
    );
};

export default Auth;
