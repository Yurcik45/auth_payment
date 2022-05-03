import { Form, Input, Button, Checkbox } from "antd";
import "antd/dist/antd.css";
import { antdNotif } from "../../antdNotif";
import { useDispatch } from "react-redux";
import { authUser, registerUser } from "../../redux/actions/auth";
import "./index.css";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ type }) => {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const onFinish = (values) => {
        console.log("Success:", values);
        if (type === "auth") {
            console.log("auth type");
            dispatch(
                authUser(
                    values.username,
                    values.password,
                    values.remember,
                    "user",
                    () => {
                        navigator("/");
                    }
                )
            );
        }
        if (type === "register") {
            console.log("register type");
            if (values.password !== values.password_confirm) {
                return antdNotif("warning", "passwords not the same");
            }
            if (values.username.length < 5)
                return antdNotif("warning", "too short name");
            if (values.password.lenght < 5)
                return antdNotif("warning", "too short password");

            dispatch(
                registerUser(
                    values.username,
                    values.password,
                    values.remember,
                    "user",
                    () => {
                        navigator("/auth");
                    }
                )
            );
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="AuthBasicForm">
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <Input value="yurcik45"/>
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                {type === "register" && (
                    <Form.Item
                        label="PasswordConfirm"
                        name="password_confirm"
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                )}
                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AuthForm;
