const nodemailer = require('nodemailer');
const fs = require('fs');
const ejs = require('ejs');
const sendResponse = async (
    email,
    first_name,
    last_name,
    emp_id,
    start_date,
    end_date,
    is_half_day,
    leave_type,
    reason,
    status
) => {
    let sender = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secureConnection: true,
        // tls: {
        //   maxVersion: 'TLSv1.3',
        //   minVersion: 'TLSv1.2',
        //   ciphers: 'TLS_AES_128_GCM_SHA256',
        // },
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASSWORD
        },
        secureProtocol: 'TLSv1_2_method'
        // tls: {
        //   rejectUnauthorized: true
        // }
    });
    let templatePath = './public/leave_approved.ejs'; // Default template path

    if (status === 'cancelled') {
        templatePath = './public/leave_cancelled.ejs'; // Custom template path for cancelled status
    }
    const templateString = fs.readFileSync(templatePath, 'utf-8');

    // Dynamic data
    const data = {
        first_name: first_name,
        last_name: last_name,
        emp_id: emp_id,
        start_date: start_date,
        end_date: end_date,
        is_half_day: is_half_day,
        leave_type: leave_type,
        reason: reason,
        status: status
    };
    const html = ejs.render(templateString, data);
    let mail = {
        from: process.env.EMAIL_ID,
        to: 'memorytemp5@gmail.com',
        subject: 'Leave Application -Gratia',
        html: html,

    };

    await sender.sendMail(mail, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent successfully: ' +
                info.response);
        }
    });
}
module.exports = {
    sendResponse
}