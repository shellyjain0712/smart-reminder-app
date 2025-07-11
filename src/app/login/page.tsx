'use client'
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "sonner";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (status === 'loading') return; // Still loading
    if (session) router.push('/dashboard'); // Already authenticated
  }, [session, status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    
    try {
      const res = await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      console.log('SignIn result:', res);

      if (res?.error) {
        toast.error("Invalid email or password");
      } else if (res?.ok) {
        toast.success("Login successful!");
        // Force a page reload to ensure session is properly set
        window.location.href = '/dashboard?welcome=true';
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const res = await signIn('google', { 
        callbackUrl: '/dashboard',
        redirect: false 
      });
      
      if (res?.error) {
        toast.error("Google sign-in failed. Please try again.");
      }
    } catch (err) {
      console.error("Google sign-in error:", err);
      toast.error("Google sign-in failed. Please try again.");
    }
  };

  // Show loading spinner while checking authentication
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Don't render login form if already authenticated
  if (session) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Welcome Back</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button
            type="button"
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full gap-3"
          >
            <FcGoogle className="text-xl" /> Sign in with Google
          </Button>

          <div className="flex items-center gap-2">
            <hr className="flex-grow border-border" />
            <span className="text-sm text-muted-foreground">OR</span>
            <hr className="flex-grow border-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className="flex justify-between text-sm">
            <a href="/forgot-password" className="text-primary hover:text-primary/80 hover:underline">
              Forgot Password?
            </a>
            <a href="/signup" className="text-primary hover:text-primary/80 hover:underline">
              Create Account
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
