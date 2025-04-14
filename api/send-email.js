const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Only POST requests allowed");
  }

  const { name, email, message } = req.body;

  try {
    // Email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    // Email options
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `New Enquiry from ${name}`,
      text: `Email: ${email}\n\nMessage:\n${message}`
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email failed:", error);
    return res.status(500).json({ error: "Email send failed" });
  }
};
