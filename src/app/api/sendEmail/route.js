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
        user: "contact.thedigitaltoolkit@gmail.com",
        pass: "alfl crjb koud xhmi",
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

    await transporter.sendMail({
      from: "contact.thedigitaltoolkit@gmail.com",
      to: "amankapil60@gmail.com",
      subject: "New Form Submission From DTK",
      text: message,
    });

    await transporter.sendMail({
      from: "contact.thedigitaltoolkit@gmail.com",
      to: email || "aman@codelinear.com",
      subject: "Your Submission Confirmation",
      text: message,
    });

    return NextResponse.json({ data: submission, status: 201, success: true });
  } catch (err) {
    console.error("❌ API error:", err);
    return NextResponse.json(
      { status: 500, success: false, error: err.message },
      { status: 500 }
    );
  }
}
