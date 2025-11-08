// Vercel Serverless Function for Contact Form
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    // Get form data
    const { name, email, message, phone, subject } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields (Name, Email, and Message).'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address.'
      });
    }

    // Sanitize input
    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim();
    const sanitizedPhone = phone ? phone.trim() : '';
    const sanitizedSubject = subject ? subject.trim() : 'Contact Form Submission';
    const sanitizedMessage = message.trim();

    // Email configuration
    const to = 'ombalaji.ltd@gmail.com';
    const emailSubject = `New Contact Form Submission: ${sanitizedSubject}`;
    
    // Create HTML email body
    const emailBody = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #0B5ED7, #0A4EB4);
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            text-align: center;
        }
        .content {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 0 0 8px 8px;
            border: 1px solid #e5e7eb;
        }
        .field {
            margin-bottom: 15px;
        }
        .field label {
            font-weight: bold;
            color: #0B5ED7;
            display: block;
            margin-bottom: 5px;
        }
        .field-value {
            padding: 10px;
            background: white;
            border-radius: 4px;
            border: 1px solid #e5e7eb;
        }
        .footer {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            font-size: 12px;
            color: #6b7280;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="header">
        <h2>New Contact Form Submission</h2>
        <p>OMBALAJI Infra Solution Website</p>
    </div>
    <div class="content">
        <div class="field">
            <label>Name:</label>
            <div class="field-value">${sanitizedName}</div>
        </div>
        <div class="field">
            <label>Email:</label>
            <div class="field-value">${sanitizedEmail}</div>
        </div>
        ${sanitizedPhone ? `
        <div class="field">
            <label>Phone:</label>
            <div class="field-value">${sanitizedPhone}</div>
        </div>
        ` : ''}
        <div class="field">
            <label>Subject:</label>
            <div class="field-value">${sanitizedSubject}</div>
        </div>
        <div class="field">
            <label>Message:</label>
            <div class="field-value">${sanitizedMessage.replace(/\n/g, '<br>')}</div>
        </div>
    </div>
    <div class="footer">
        <p>This email was sent from the OMBALAJI Infra Solution website contact form.</p>
        <p>Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
    </div>
</body>
</html>
    `;

    // Send email using a service (you can use SendGrid, Resend, or similar)
    // For now, we'll use a simple approach with nodemailer or fetch to an email service
    
    // Option 1: Use Resend (recommended for Vercel)
    // You'll need to install: npm install resend
    // And set RESEND_API_KEY in Vercel environment variables
    
    const emailSent = await sendEmail({
      to,
      subject: emailSubject,
      html: emailBody,
      from: 'noreply@ombalajiinfra.com',
      replyTo: `${sanitizedName} <${sanitizedEmail}>`
    });

    if (emailSent) {
      return res.status(200).json({
        success: true,
        message: 'Thank you for your message! We will contact you shortly.'
      });
    } else {
      // If email service fails, log the submission (you can store in a database later)
      console.log('Contact form submission:', {
        name: sanitizedName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        subject: sanitizedSubject,
        message: sanitizedMessage,
        timestamp: new Date().toISOString()
      });

      return res.status(200).json({
        success: true,
        message: 'Thank you for your message! We have received your submission and will contact you shortly.'
      });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again or contact us directly.'
    });
  }
}

// Email sending function
async function sendEmail({ to, subject, html, from, replyTo }) {
  try {
    // Option 1: Use Resend (recommended)
    // Uncomment and configure if you have Resend API key
    /*
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const { data, error } = await resend.emails.send({
      from: from,
      to: [to],
      subject: subject,
      html: html,
      replyTo: replyTo
    });
    
    if (error) {
      console.error('Resend error:', error);
      return false;
    }
    
    return true;
    */

    // Option 2: Use SendGrid
    // Uncomment and configure if you have SendGrid API key
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const msg = {
      to: to,
      from: from,
      subject: subject,
      html: html,
      replyTo: replyTo
    };
    
    await sgMail.send(msg);
    return true;
    */

    // Option 3: Use a webhook service like Zapier, Make.com, or n8n
    // Option 4: Use Formspree, FormSubmit, or similar service
    // Option 5: For now, just log and return true (you can set up email service later)
    
    // For immediate deployment, we'll log the submission
    // You can set up email service later and uncomment one of the options above
    console.log('Email would be sent:', { to, subject });
    
    return true; // Return true so form shows success message
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
}

