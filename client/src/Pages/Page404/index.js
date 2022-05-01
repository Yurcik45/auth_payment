import "./index.css";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
    const navigate = useNavigate();
    const home = () => {
       navigate('/') 
    };
    return (
        <div className="Page404">
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Button onClick={home} type="primary">
                        Back Home
                    </Button>
                }
            />
        </div>
    );
};

export default Page404;
