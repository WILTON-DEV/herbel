"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authApi } from "@/lib/api-client";

import AuthLayout from "@/components/layout/AuthLayout";

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
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-[#1a3a2e]">Verify Your Email</h1>
          <p className="text-muted-foreground">
            We've sent a verification link to your email address
          </p>
        </div>

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

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="border-gray-200"
            />
          </div>
          <Button
            onClick={handleResend}
            className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white py-6"
            disabled={loading || !email}
          >
            {loading ? "Sending..." : "Resend Verification Email"}
          </Button>
        </div>

        <div className="text-center">
          <Link href="/login" className="text-sm text-[#4CAF50] hover:underline font-medium">
            Back to Login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}

