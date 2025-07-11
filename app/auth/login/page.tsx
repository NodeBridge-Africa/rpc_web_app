'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginInput, loginSchema } from '@/lib/validators/auth.validators';
import { useLogin, useAuthRedirect } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Github, Loader2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const { mutate: login, isPending } = useLogin();
  useAuthRedirect(); // Handle redirects for authenticated users
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginInput) => {
    login(data);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      {/* Left side - Preview/Marketing */}
      <div className="hidden lg:flex lg:w-1/2 p-8 items-center justify-center relative bg-gradient-to-br from-black to-[#0A0A0A]">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 rounded-full bg-[#10B981]/10 flex items-center justify-center">
              <span className="text-[#10B981] font-bold">N</span>
            </div>
            <span className="text-white/90 font-medium">Nodebridge</span>
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">
            Build, Deploy, Scale: Web3 Infrastructure Made Simple
          </h1>

          <p className="text-gray-400 text-lg">
            From single-node setups to enterprise-grade deployments, our
            powerful infrastructure solutions let you launch and manage
            blockchain nodes effortlessly anywhere, anytime.
          </p>
        </div>

        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
      </div>

      {/* Right side - Auth form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-white">Welcome back</h2>
            <p className="text-gray-400 mt-2">Sign in to your account</p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Button
              type="button"
              variant="outline"
              className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-white"
              onClick={() => console.log("GitHub auth not available in static export")}
              disabled
            >
              <Github className="mr-2 h-4 w-4" />
              Continue with GitHub
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0A0A0A] px-2 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-200 block mb-2">
                  Email
                </label>
                <Input
                  {...form.register('email')}
                  type="email"
                  placeholder="you@example.com"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  disabled={isPending}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-200 block mb-2">
                  Password
                </label>
                <div className="relative">
                  <Input
                    {...form.register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 pr-10"
                    disabled={isPending}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-white/5 text-gray-400 hover:text-gray-200"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isPending}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {form.formState.errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    href="#"
                    className="text-[#10B981] hover:text-[#10B981]/80"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button 
                type="submit"
                className="w-full bg-[#10B981] hover:bg-[#059669] text-black font-medium"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </Button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-400">
            Don&apos;t have an account?{' '}
            <Link
              href="/auth/register"
              className="text-[#10B981] hover:text-[#10B981]/80 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}