import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

// Create transporter using environment variables
const createTransporter = () => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("SMTP credentials not configured. Email sending disabled.");
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const transporter = createTransporter();
  
  if (!transporter) {
    console.log("Email not sent: SMTP not configured");
    return false;
  }

  try {
    const info = await transporter.sendMail({
      from: `${process.env.SMTP_FROM_NAME || "Homeo Clinic"} <${process.env.SMTP_FROM || "noreply@homeoclinic.com"}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    console.log("Email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
}

export async function sendClinicWelcomeEmail(
  adminName: string,
  adminEmail: string,
  clinicName: string,
  clinicSlug: string,
  clinicCode: string,
  temporaryPassword?: string
): Promise<boolean> {
  const baseUrl = process.env.APP_URL || "http://localhost:3000";
  const loginUrl = `${baseUrl}/auth/login?clinicCode=${clinicCode}`;
  const clinicUrl = `${clinicSlug}.${process.env.APP_BASE_DOMAIN || "clinik-blush.vercel.app"}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Homeo Clinic</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .info-box { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #10b981; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to Homeo Clinic!</h1>
        </div>
        <div class="content">
          <p>Dear ${adminName},</p>
          <p>Congratulations! Your clinic <strong>${clinicName}</strong> has been successfully created.</p>
          
          <div class="info-box">
            <h3>Your Clinic Details:</h3>
            <p><strong>Clinic Name:</strong> ${clinicName}</p>
            <p><strong>Clinic Subdomain:</strong> ${clinicUrl}</p>
            <p><strong>Clinic Code:</strong> ${clinicCode}</p>
          </div>

          ${temporaryPassword ? `
          <div class="info-box">
            <h3>Your Login Credentials:</h3>
            <p><strong>Email:</strong> ${adminEmail}</p>
            <p><strong>Password:</strong> ${temporaryPassword}</p>
            <p style="color: #dc2626; font-size: 12px;">Please change your password after first login.</p>
          </div>
          ` : ''}

          <p>To access your clinic dashboard, click the button below:</p>
          <a href="${loginUrl}" class="button">Login to Your Clinic</a>
          
          <p>Or visit: <a href="${loginUrl}">${loginUrl}</a></p>
          
          <p>If you have any questions, please don't hesitate to contact our support team.</p>
          
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Homeo Clinic. All rights reserved.</p>
            <p>This is an automated email. Please do not reply.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
    Welcome to Homeo Clinic!
    
    Dear ${adminName},
    
    Congratulations! Your clinic "${clinicName}" has been successfully created.
    
    Your Clinic Details:
    - Clinic Name: ${clinicName}
    - Clinic Subdomain: ${clinicUrl}
    - Clinic Code: ${clinicCode}
    
    ${temporaryPassword ? `
    Your Login Credentials:
    - Email: ${adminEmail}
    - Password: ${temporaryPassword}
    Please change your password after first login.
    ` : ''}
    
    To access your clinic dashboard, visit: ${loginUrl}
    
    If you have any questions, please don't hesitate to contact our support team.
    
    © ${new Date().getFullYear()} Homeo Clinic. All rights reserved.
  `;

  return sendEmail({
    to: adminEmail,
    subject: `Welcome to ${clinicName} - Your Clinic is Ready`,
    html,
    text
  });
}
