"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function EmailTestPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTestEmail = async () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/test-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json() as { error?: string; message?: string };

      if (response.ok) {
        toast.success("Test email sent successfully! Check your inbox.");
      } else {
        toast.error(data.error ?? "Failed to send test email");
      }
    } catch (error) {
      toast.error("Failed to send test email");
      console.error("Email test error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Email Configuration Test</CardTitle>
          <CardDescription>
            Test your email configuration by sending a test email
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button 
            onClick={handleTestEmail} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Sending..." : "Send Test Email"}
          </Button>
          
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <p><strong>Before testing:</strong></p>
            <ol className="list-decimal list-inside space-y-1 text-xs">
              <li>Update your .env file with real email credentials</li>
              <li>Restart your development server</li>
              <li>Enter your email address above</li>
              <li>Click &quot;Send Test Email&quot;</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
