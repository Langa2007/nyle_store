// services/emailQueue.js
import { Queue, Worker } from "bullmq";
import nodemailer from "nodemailer";

const connection = {
  host: "127.0.0.1",
  port: 6379,
};

export const emailQueue = new Queue("emailQueue", { connection });

// Worker that processes queued jobs
const worker = new Worker(
  "emailQueue",
  async (job) => {
    const { to, subject, html } = job.data;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Nyle Team" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log(` Email sent to ${to}`);
  },
  { connection }
);

worker.on("failed", (job, err) => {
  console.error(` Job failed ${job.id}:`, err.message);
});
