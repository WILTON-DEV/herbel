"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authApi } from "@/lib/api-client";

export default function VerifyEmailPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleResend = async () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      await authApi.resendVerificationEmail(email);
      setMessage("Verification email sent! Please check your inbox.");
    } catch (err: any) {
      setError(err.message || "Failed to resend verification email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Verify Your Email</CardTitle>
          <CardDescription className="text-center">
            We've sent a verification link to your email address
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {message && (
            <div className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg p-3">
              {message}
            </div>
          )}

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-3">
              {error}
            </div>
          )}

          <div className="text-sm text-muted-foreground text-center space-y-2">
            <p>
              Please check your email inbox and click on the verification link to activate your account.
            </p>
            <p>Didn't receive the email?</p>
          </div>

          <div className="space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
            <Button
              onClick={handleResend}
              className="w-full"
              disabled={loading || !email}
            >
              {loading ? "Sending..." : "Resend Verification Email"}
            </Button>
          </div>

          <div className="text-center">
            <Link href="/admin/auth/login" className="text-sm text-primary hover:underline">
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

