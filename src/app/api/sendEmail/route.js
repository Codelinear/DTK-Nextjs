// // app/api/sendEmail/route.js
// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";
// import clientPromise from "../lib/mongodb";

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     console.log("Received data:", body);

//     const {
//       companyName,
//       companySize,
//       companyType,
//       email,
//       services,
//       totalCost,
//       undercharging,
//       averagePrice,
//       overcharging,
//       ourCost,
//     } = body;

//     const client = await clientPromise;
//     const db = client.db("dtk"); // same as above
//     const collection = db.collection("formSubmissions");

//     const result = await collection.insertOne({
//       companyName,
//       companySize,
//       companyType,
//       email,
//       services,
//       totalCost,
//       undercharging,
//       averagePrice,
//       overcharging,
//       ourCost,
//       createdAt: new Date(),
//     });
//     console.log(result);

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const serviceList = Object.values(services)
//       .map((s) => `${s.ServiceName} - Total: $${s.totalCharges}`)
//       .join("\n");

//     const message = `
// Company: ${companyName}
// Size: ${companySize}
// Type: ${companyType}
// Email: ${email}

// Services:
// ${serviceList}

// Total: $${totalCost}
// Undercharging: ${undercharging}
// Average Price: ${averagePrice}
// Overcharging: ${overcharging}
// Our Cost: $${ourCost}
//     `;

//     console.log(message);
//     // await transporter.sendMail({
//     //   from: process.env.EMAIL_USER,
//     //   to: process.env.ADMIN_EMAIL,
//     //   subject: "New Form Submission",
//     //   text: message,
//     // });

//     // await transporter.sendMail({
//     //   from: process.env.EMAIL_USER,
//     //   to: email,
//     //   subject: "Your Submission Confirmation",
//     //   text: message,
//     // });

//     return NextResponse.json({ data: result, status: 201, success: true });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ status: 401, success: false }, { status: 500 });
//   }
// }

// app/api/sendEmail/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
// import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";
import connectDB from "../lib/mongodb";

// Define schema
const FormSchema = new mongoose.Schema(
  {
    companyName: String,
    companySize: String,
    companyType: String,
    email: String,
    services: Object,
    totalCost: Number,
    undercharging: String,
    averagePrice: String,
    overcharging: String,
    ourCost: Number,
  },
  { timestamps: true }
);

// Prevent model overwrite in dev
const FormSubmission =
  mongoose.models.FormSubmission ||
  mongoose.model("FormSubmission", FormSchema);

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Received data:", body);

    const {
      companyName,
      companySize,
      companyType,
      email,
      services,
      totalCost,
      undercharging,
      averagePrice,
      overcharging,
      ourCost,
    } = body;

    // connect to db
    await connectDB();

    // save to db
    const submission = await FormSubmission.create({
      companyName,
      companySize,
      companyType,
      email,
      services,
      totalCost,
      undercharging,
      averagePrice,
      overcharging,
      ourCost,
    });

    console.log("Saved:", submission);

    // setup nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // build services list
    const serviceList = Object.values(services || {})
      .map((s) => `${s.ServiceName} - Total: $${s.totalCharges}`)
      .join("\n");

    const message = `
Company: ${companyName}
Size: ${companySize}
Type: ${companyType}
Email: ${email}

Services:
${serviceList}

Total: $${totalCost}
Undercharging: ${undercharging}
Average Price: ${averagePrice}
Overcharging: ${overcharging}
Our Cost: $${ourCost}
    `;

    console.log("Message ready:\n", message);

    // Uncomment when you want emails to send
    /*
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "New Form Submission",
      text: message,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Submission Confirmation",
      text: message,
    });
    */

    return NextResponse.json({ data: submission, status: 201, success: true });
  } catch (err) {
    console.error("❌ API error:", err);
    return NextResponse.json(
      { status: 500, success: false, error: err.message },
      { status: 500 }
    );
  }
}
