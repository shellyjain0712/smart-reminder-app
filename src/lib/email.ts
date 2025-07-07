/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import nodemailer from 'nodemailer';
import { env } from '@/env';

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: env.EMAIL_SERVER_HOST,
  port: parseInt(env.EMAIL_SERVER_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: env.EMAIL_SERVER_USER,
    pass: env.EMAIL_SERVER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false // For development only
  }
});

export interface EmailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions) {
  try {
    const mailOptions = {
      from: `"Smart Reminder" <${env.EMAIL_FROM}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export function generatePasswordResetEmail(resetUrl: string, userName?: string) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset - Smart Reminder</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          margin: 0;
          padding: 0;
          background-color: #f8fafc;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        .email-card {
          background: white;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .logo {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo h1 {
          color: #1e40af;
          margin: 0;
          font-size: 28px;
          font-weight: bold;
        }
        .content {
          color: #374151;
          font-size: 16px;
        }
        .reset-button {
          display: inline-block;
          background: #1e40af;
          color: #ffffff !important;
          padding: 14px 32px;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          margin: 24px 0;
          text-align: center;
        }
        .reset-button:hover {
          background: #1d4ed8;
          color: #ffffff !important;
        }
        .security-note {
          background: #f3f4f6;
          border-left: 4px solid #fbbf24;
          padding: 16px;
          margin: 24px 0;
          border-radius: 4px;
        }
        .footer {
          text-align: center;
          color: #6b7280;
          font-size: 14px;
          margin-top: 32px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="email-card">
          <div class="logo">
            <h1>Smart Reminder</h1>
          </div>
          
          <div class="content">
            <h2>Password Reset Request</h2>
            
            <p>Hello${userName ? ` ${userName}` : ''},</p>
            
            <p>We received a request to reset your password for your Smart Reminder account. If you made this request, click the button below to reset your password:</p>
            
            <div style="text-align: center;">
              <a href="${resetUrl}" class="reset-button" style="display: inline-block; background: #1e40af; color: #ffffff !important; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 24px 0; text-align: center;">Reset Your Password</a>
            </div>
            
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #1e40af;">${resetUrl}</p>
            
            <div class="security-note">
              <strong>Security Note:</strong> This password reset link will expire in 1 hour for your security. If you didn't request this password reset, you can safely ignore this email.
            </div>
            
            <p>If you continue to have problems, please contact our support team.</p>
            
            <p>Best regards,<br>The Smart Reminder Team</p>
          </div>
          
          <div class="footer">
            <p>This email was sent from Smart Reminder. If you have any questions, please contact us.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
    Password Reset Request - Smart Reminder

    Hello${userName ? ` ${userName}` : ''},

    We received a request to reset your password for your Smart Reminder account.
    
    Reset your password by clicking this link: ${resetUrl}
    
    This link will expire in 1 hour for your security.
    
    If you didn't request this password reset, you can safely ignore this email.
    
    Best regards,
    The Smart Reminder Team
  `;

  return { html, text };
}
