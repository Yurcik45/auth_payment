const nodemailer = require("nodemailer");
const sendMail = (name, email, confirmationCode) => {
    const transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    console.log("Check", {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    });
    transport
        .sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Please confirm your account",
            html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:3000/auth/confirm/${name}/${confirmationCode}> Click here</a>
        </div>`,
        })
        .catch((err) => console.log(err));
};

module.exports = { sendMail };
