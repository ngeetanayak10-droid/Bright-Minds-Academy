// =====================================================
//  . — Express Backend Server
//  Handles contact form submissions & sends emails
//  Run: node server.js
// =====================================================

const express    = require('express');
const nodemailer = require('nodemailer');
const path       = require('path');
const fs         = require('fs');

// ✏️ FILL IN: Set these environment variables in your .env file (see README)
const PORT       = process.env.PORT || 3000;
const EMAIL_USER = process.env.EMAIL_USER;  // e.g. hello@brightmindsacademy.com
const EMAIL_PASS = process.env.EMAIL_PASS;  // App password for your email account
const EMAIL_TO   = process.env.EMAIL_TO || EMAIL_USER; // where form submissions go

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (your HTML/CSS/JS)
// The server expects to be run from the project root folder
app.use(express.static(__dirname));

// Serve pages subfolder
app.use('/pages', express.static(path.join(__dirname, 'pages')));

// ---- Root route ----
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ---- Contact form API route ----
app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, phone, service, message } = req.body;

  // Basic validation
  if (!firstName || !email || !message || !service) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  // Configure nodemailer transporter
  // ✏️ FILL IN: If using Gmail, enable "App Passwords" in your Google account.
  //    For other providers (Outlook, Zoho, etc.) update 'service' or 'host'/'port' below.
  const transporter = nodemailer.createTransport({
    service: 'gmail', // ✏️ Change to 'Outlook365', or use host/port for custom SMTP
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `". Website" <${EMAIL_USER}>`,
    to:   EMAIL_TO,
    replyTo: email,
    subject: `New Enquiry — ${service} — ${firstName} ${lastName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; color: #1e293b;">
        <h2 style="color:#2563eb;">New Contact Form Submission</h2>
        <table style="width:100%; border-collapse:collapse;">
          <tr><td style="padding:8px 0; font-weight:600; width:140px;">Name:</td><td>${firstName} ${lastName}</td></tr>
          <tr><td style="padding:8px 0; font-weight:600;">Email:</td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px 0; font-weight:600;">Phone:</td><td>${phone || 'Not provided'}</td></tr>
          <tr><td style="padding:8px 0; font-weight:600;">Service:</td><td>${service}</td></tr>
        </table>
        <hr style="margin:20px 0; border:none; border-top:1px solid #e2e8f0;" />
        <h3 style="margin-bottom:8px;">Message:</h3>
        <p style="background:#f8fafc; padding:16px; border-radius:8px; line-height:1.7;">${message.replace(/\n/g, '<br/>')}</p>
        <p style="color:#94a3b8; font-size:12px; margin-top:24px;">Sent from brightmindsacademy.com contact form</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Contact form email sent from ${email}`);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('❌ Email send error:', err.message);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
});

// 404 fallback
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 . server running at http://localhost:${PORT}`);
});
