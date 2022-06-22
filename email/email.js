"use strict";
const nodemailer = require("nodemailer");

exports.sendEmail = async(email_id,otp) =>{
    try {
        let transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "projectauction12@gmail.com",
              pass: "auction12",
            },
          });
          
          var msg = `Reset Password <br><h1 style="color:red;">${otp}</h1>  `
          let data = await transport.sendMail({
            to: email_id,
            html: msg,
            subject: "aNoted reset password",
          });
      
    } catch (error) {
        return error
    }
}