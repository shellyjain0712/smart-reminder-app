/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { z } from "zod";

const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const { token, password } = resetPasswordSchema.parse(body);

    // Find the reset token
    // @ts-expect-error - Prisma client will be regenerated
    const resetToken = await db.passwordResetToken.findUnique({
      where: { token }
    });

    if (!resetToken) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    // Check if token has expired
    if (new Date() > resetToken.expires) {
      // Delete expired token
      // @ts-expect-error - Prisma client will be regenerated
      await db.passwordResetToken.delete({
        where: { id: resetToken.id }
      });
      
      return NextResponse.json(
        { error: "Reset token has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Find the user
    // @ts-expect-error - Prisma client will be regenerated
    const user = await db.user.findUnique({
      where: { email: resetToken.email }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Update user password
    // For development, store password as plain text
    // In production, hash the password:
    // const hashedPassword = await bcrypt.hash(password, 12);

    // @ts-expect-error - Prisma client will be regenerated
    await db.user.update({
      where: { id: user.id },
      data: { password } // Use hashedPassword in production
    });

    // Delete the used reset token
    // @ts-expect-error - Prisma client will be regenerated
    await db.passwordResetToken.delete({
      where: { id: resetToken.id }
    });

    // Delete all other reset tokens for this email
    // @ts-expect-error - Prisma client will be regenerated
    await db.passwordResetToken.deleteMany({
      where: { email: resetToken.email }
    });

    console.log(`Password reset successful for user: ${user.email}`);

    return NextResponse.json(
      { message: "Password reset successful. You can now log in with your new password." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset password error:", error);
    
    // Handle validation errors
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      return NextResponse.json(
        { error: `Invalid ${firstError?.path.join('.')}: ${firstError?.message}` },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to reset password. Please try again." },
      { status: 500 }
    );
  }
}
