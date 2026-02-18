const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendOtpEmail = async (to, otp) => {
  await transporter.sendMail({
    from: `"Freelancer App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your Password Reset OTP",
    html: `
      <div style="font-family: Arial, sans-serif">
        <h2>Password Reset OTP</h2>
        <p>Your OTP is:</p>
        <h1 style="letter-spacing: 4px">${otp}</h1>
        <p>This OTP is valid for <b>10 minutes</b>.</p>
        <p>If you didn’t request this, please ignore this email.</p>
      </div>
    `,
  });
};
