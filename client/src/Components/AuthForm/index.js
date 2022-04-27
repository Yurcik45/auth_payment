import { Form, Input, Button, Checkbox, notification } from "antd";
import "antd/dist/antd.css";
import "./index.css";

const AuthForm = ({ type }) => {
    const antdNotif = (type, message, description) => {
        notification[type]({
            message,
            description,
        });
    };
    const onFinish = (values) => {
        console.log("Success:", values);
        if (type !== "register")
            return antdNotif("success", "requested to auth");
        if (values.password !== values.password_confirm) {
            return antdNotif("warning", "passwords not the same");
        }
        if (values.username.length < 5)
            return antdNotif("warning", "too short name");
        if (values.password.lenght < 5)
            return antdNotif("warning", "too short password");
        return antdNotif("success", "requested to register");
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
                    <Input />
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
