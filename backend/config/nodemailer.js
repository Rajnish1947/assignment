// Nodemailer is a module for Node.js applications that allows easy email sending


// import nodemailer from 'nodemailer'

// const transporter=nodemailer.createTransport({

//     host:'smtp-relay.brevo.com',
//     port:587,
// auth:{
//     user:process.env.SMTP_USER,
//     pass:process.env.SMTP_PASSWORD
// }

// });
//  export default transporter;
import nodemailer from 'nodemailer';

// Create the nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

// Send an email function
const sendWelcomeEmail = async (toEmail, userName) => {
    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: toEmail,
        subject: 'Welcome to Rajnish',
        text: `Welcome to Rajnish website! Your account has been created with the email: ${toEmail}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${toEmail}`);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email could not be sent.');
    }
};

export default sendWelcomeEmail;
