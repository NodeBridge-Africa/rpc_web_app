import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
import { authUseCase } from '@/usecases/auth.usecase';
import { LoginInput, RegisterInput } from '@/lib/validators/auth.validators';
import { useEffect } from 'react';

export const useLogin = () => {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (credentials: LoginInput) => {
      const result = await signIn('credentials', {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      return result;
    },
    onSuccess: (result) => {
      if (result?.ok) {
        toast({
          title: 'Login successful',
          description: 'Welcome back!',
        });
        
        // NextAuth will handle the redirect automatically
        router.push('/dashboard');
      }
    },
    onError: (error) => {
      toast({
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    },
  });
};

export const useRegister = () => {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (credentials: RegisterInput) => {
      // First register with the backend
      const registerResult = await authUseCase.register(credentials);
      
      // Then sign in with NextAuth
      const signInResult = await signIn('credentials', {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      });

      if (signInResult?.error) {
        throw new Error(signInResult.error);
      }

      return { registerResult, signInResult };
    },
    onSuccess: ({ signInResult }) => {
      if (signInResult?.ok) {
        toast({
          title: 'Registration successful',
          description: 'Your account has been created.',
        });
        
        // NextAuth will handle the redirect automatically
        router.push('/dashboard');
      }
    },
    onError: (error) => {
      toast({
        title: 'Registration failed',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await signOut({ redirect: false });
    },
    onSuccess: () => {
      queryClient.clear();
      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out.',
      });
      router.push('/auth/login');
    },
    onError: (error) => {
      toast({
        title: 'Logout failed',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    },
  });
};

// Hook to handle redirects based on user role
export const useAuthRedirect = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      const { isAdmin } = session.user;
      const currentPath = window.location.pathname;
      
      // Redirect admin users to admin dashboard
      if (isAdmin && !currentPath.startsWith('/admin')) {
        router.replace('/admin/dashboard');
      }
      
      // Redirect regular users to user dashboard  
      if (!isAdmin && !currentPath.startsWith('/dashboard') && currentPath.startsWith('/admin')) {
        router.replace('/dashboard');
      }
    }
  }, [session, status, router]);

  return { session, status };
};