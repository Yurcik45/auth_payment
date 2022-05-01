import { notification } from "antd";
export const antdNotif = (type, message, description) => {
        notification[type]({
            message,
            description,
        });
    };

