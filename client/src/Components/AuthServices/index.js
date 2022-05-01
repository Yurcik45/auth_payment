import {
    GoogleOutlined,
    FacebookOutlined,
    LinkedinOutlined,
    GithubOutlined,
} from "@ant-design/icons";
import {useSelector} from "react-redux";
import Loader from "../Loader/index";
import "./index.css";

const AuthServices = () => {
    const servicesList = [
        {
            icon: <GoogleOutlined />,
            name: "",
            action: "",
        },
        {
            icon: <GithubOutlined />,
            name: "",
            action: "",
        },
        {
            icon: <LinkedinOutlined />,
            name: "",
            action: "",
        },
        {
            icon: <FacebookOutlined />,
            name: "",
            action: "",
        },
    ];
    const isLoading = useSelector(state => state.auth.pending)
    return (
        <div className="AuthServices">
            <div className="AuthText">You can auth use services below</div>
            <div className="AuthIcons">
                {servicesList.map((service, id) => {
                    return (
                        <div className="AuthIcon" key={id}>
                            {service.icon}
                        </div>
                    );
                })}
            </div>
            {isLoading && <Loader />}
        </div>
    );
};

export default AuthServices;
