// import { NextApiRequest, NextApiResponse } from "next";
// import sendMail from "./api_four/page";
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     try {
//       await sendMail(
//         "TEST",
//         "haqyluppalagi@gmail.com",
//         "THIS IS A TEST FOR MY MEDIUM USERS"
//       );
//       res.status(200).json("success");
//     } catch (error) {
//       console.error("Error retrieving :", error);
//       res.status(500).json({ error: "Failed to retrieve" });
//     }
//   } else {
//     res.setHeader("Allow", ["GET"]);
//     res.status(405).end("Method Not Allowed");
//   }
// }
