const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Only POST requests allowed");
  }

  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.EMAIL_RECIPIENT, // Corrected line
      subject: `New Enquiry from ${name}`,
      text: `Email: ${email}\n\nMessage:\n${message}`
    });

    return res.status(200).json({ success: true, message: "Email sent!" });
  } catch (error) {
    console.error("Email Error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
};