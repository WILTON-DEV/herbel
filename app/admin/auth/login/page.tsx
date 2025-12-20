"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        router.push("/admin");
      } else {
        setError(result.error || "Invalid email or password");
      }
    } catch (err: any) {
      const errorMessage = err?.message || "An error occurred during login";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("password");
    setError("");
    setLoading(true);

    try {
      const result = await login(demoEmail, "password");
      if (result.success) {
        router.push("/admin");
      } else {
        setError(result.error || "Demo login failed. Try resetting data below.");
      }
    } catch (err: any) {
      const errorMessage = err?.message || "An error occurred during login";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResetData = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("herbel_token");
      setError("");
      alert("Auth token cleared! Please try logging in again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full space-y-6 ">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground mb-4 shadow-lg">
            <span className="text-2xl font-semibold">H</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Herbel Admin
          </h1>
          <p className="text-muted-foreground mt-2">
            Sign in to your dashboard
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
              </div>

              {error && (
                <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-muted/50 border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <span className="text-lg">🎯</span>
              Demo Credentials
            </CardTitle>
            <CardDescription>
              Click below to login with demo accounts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start text-left"
                onClick={() => handleDemoLogin("admin@example.com")}
                disabled={loading}
              >
                <div>
                  <div className="font-medium">Admin Account</div>
                  <div className="text-xs text-muted-foreground">
                    admin@example.com / password
                  </div>
                </div>
              </Button>
            </div>
            <div>
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start text-left"
                onClick={() => handleDemoLogin("attendant@kampala.example")}
                disabled={loading}
              >
                <div>
                  <div className="font-medium">Kampala Attendant</div>
                  <div className="text-xs text-muted-foreground">
                    attendant@kampala.example / password
                  </div>
                </div>
              </Button>
            </div>
            <div>
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start text-left"
                onClick={() => handleDemoLogin("attendant@ntinda.example")}
                disabled={loading}
              >
                <div>
                  <div className="font-medium">Ntinda Attendant</div>
                  <div className="text-xs text-muted-foreground">
                    attendant@ntinda.example / password
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground space-y-2">
          <p>This is a demo system with mock data.</p>
          <p>Any password will work for demo accounts.</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleResetData}
            className="mt-4 text-xs"
          >
            🔄 Reset Demo Data
          </Button>
        </div>
      </div>
    </div>
  );
}
