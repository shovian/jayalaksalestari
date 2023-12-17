// var nodemailer = require("nodemailer");
// //-----------------------------------------------------------------------------
// module.exports = async (subject, toEmail, otpText) => {
//   // console.log("kamu seperti jelly");
//   var transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.NODEMAILER_EMAIL,
//       pass: process.env.NODEMAILER_PW,
//     },
//   });
//   // console.log(transporter);

//   const mailOptions = {
//     from: process.env.NODEMAILER_EMAIL,
//     to: "haqyluppalagi@gmail.com",
//     subject: subject,
//     text: otpText,
//   };

//   console.log(mailOptions);
//   await new Promise((resolve, reject) => {
//     // send mail
//     transporter.sendMail(mailOptions, (err, response) => {
//       // console.log(err, response);
//       if (err) {
//         reject(err);
//       } else {
//         resolve(response);
//       }
//     });
//   });
// };
