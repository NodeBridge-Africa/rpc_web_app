'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterInput, registerSchema } from '@/lib/validators/auth.validators';
import { useRegister, useAuthRedirect } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Github, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function RegisterPage() {
  const { mutate: register, isPending } = useRegister();
  useAuthRedirect(); // Handle redirects for authenticated users
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: RegisterInput) => {
    register(data);
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
            Join Africa's Leading Blockchain Infrastructure Provider
          </h1>

          <p className="text-gray-400 text-lg">
            Get instant access to reliable RPC endpoints, comprehensive monitoring tools, 
            and enterprise-grade node management capabilities.
          </p>
        </div>

        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
      </div>

      {/* Right side - Auth form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-white">Create an account</h2>
            <p className="text-gray-400 mt-2">Get started with your NodeBridge account</p>
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
                <Input
                  {...form.register('password')}
                  type="password"
                  placeholder="••••••••"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  disabled={isPending}
                />
                {form.formState.errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-200 block mb-2">
                  Confirm Password
                </label>
                <Input
                  {...form.register('confirmPassword')}
                  type="password"
                  placeholder="••••••••"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  disabled={isPending}
                />
                {form.formState.errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Alert className="bg-white/5 border-white/10">
                <AlertCircle className="h-4 w-4 text-[#10B981]" />
                <AlertDescription className="text-gray-400">
                  Password must contain at least 6 characters with one uppercase letter, 
                  one lowercase letter, and one number.
                </AlertDescription>
              </Alert>

              <Button 
                type="submit"
                className="w-full bg-[#10B981] hover:bg-[#059669] text-black font-medium"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create account'
                )}
              </Button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link
              href="/auth/login"
              className="text-[#10B981] hover:text-[#10B981]/80 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}