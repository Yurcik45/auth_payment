import { notification } from "antd";
export const antdNotif = (type, message, description) => {
    notification.destroy();
    notification[type]({
        message,
        description,
    });
};
