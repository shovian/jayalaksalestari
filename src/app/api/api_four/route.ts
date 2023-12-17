// import { NextApiRequest, NextApiResponse } from "next";
// const sendMail = require("./mailService.js");

import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   console.log(req);
//   try {
//     switch (req.method) {
//       case "POST": {
//         //Do some thing
//         await sendMail(
//           "TEST",
//           "haqyluppalagi@gmail.com",
//           "THIS IS A TEST FOR MY MEDIUM USERS"
//         );

//         res.status(200).json({ message: "suckses" });
//         break;
//       }
//       case "GET": {
//         //Do some thing
//         res.status(200).json({ message: req.previewData!.toString() });
//         break;
//       }
//       default:
//         res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//         break;
//     }
//   } catch (err) {
//     // res.status(400).json({
//     //   message: "err",
//     // });
//   }
// };

// export default handler;

var nodemailer = require("nodemailer");
//-----------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  const body: { subject: String; toEmail: String; otpText: String } =
    await request.json();
  console.log(body.toEmail);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });
  // console.log(request.);

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: body.toEmail,
    subject: body.subject,
    text: body.otpText,
  };

  await new Promise((resolve, reject) => {
    // send mail

    transporter.sendMail(mailOptions, (err: any, response: any) => {
      console.log(err, response);
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}
