import { GoogleOutlined, FacebookOutlined, LinkedinOutlined, GithubOutlined } from '@ant-design/icons';
import './index.css';

const AuthServices = () => {
    const servicesList = [
        {
            icon: <GoogleOutlined />,
            name: '',
            action: '',
        },
        {
            icon: <GithubOutlined />,
            name: '',
            action: '',
        },
        {
            icon: <LinkedinOutlined />,
            name: '',
            action: '',
        },
        {
            icon: <FacebookOutlined />,
            name: '',
            action: '',
        },
    ];
    return (
        <div className="AuthServices">
            <div className="AuthText">
                You can auth use services below
            </div>
            <div className="AuthIcons">
                {servicesList.map((service, id) => {
                    return (
                        <div className="AuthIcon" key={id}>
                            {service.icon}
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}

export default AuthServices;

