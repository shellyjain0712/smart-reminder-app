import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { env } from "@/env";
import { z } from "zod";

const testEmailSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const { email } = testEmailSchema.parse(body);

    // Check if email is configured
    const isConfigured = env.EMAIL_SERVER_USER !== "your-actual-email@gmail.com" && 
                        env.EMAIL_SERVER_PASSWORD !== "your-actual-app-password-here" &&
                        Boolean(env.EMAIL_SERVER_USER) && 
                        Boolean(env.EMAIL_SERVER_PASSWORD);

    if (!isConfigured) {
      return NextResponse.json(
        { error: "Email is not configured. Please update your .env file with real email credentials." },
        { status: 500 }
      );
    }

    const result = await sendEmail({
      to: email,
      subject: "Test Email - Smart Reminder",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Email Configuration Test</h2>
          <p>This is a test email to verify that your email configuration is working correctly.</p>
          <p>If you received this email, your email delivery is properly configured!</p>
          <p>Timestamp: ${new Date().toLocaleString()}</p>
        </div>
      `,
      text: `Email Configuration Test\n\nThis is a test email to verify that your email configuration is working correctly.\n\nIf you received this email, your email delivery is properly configured!\n\nTimestamp: ${new Date().toLocaleString()}`
    });

    if (result.success) {
      return NextResponse.json(
        { message: "Test email sent successfully!", messageId: result.messageId },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to send test email", details: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Test email error:", error);
    return NextResponse.json(
      { error: "Failed to send test email", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
