import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { authAPI } from '../services/api';
import type { LoginFormData } from '../types';

interface LoginPageProps {
  onLogin: (token: string) => void;
}

/**
 * Login page component based on the Ambitious Capital design
 * Handles user authentication with email and password
 */
const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  // Formik form handling
  const formik = useFormik<LoginFormData>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await authAPI.login(values.email, values.password);
        onLogin(response.token);
      } catch (error) {
        console.error('Login failed:', error);
        formik.setFieldError('password', 'Invalid email or password');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="flex-1 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center p-12">
        <div className="max-w-md text-white">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
                <span className="text-green-600 font-bold text-xl">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">AMBITIOUS</h1>
                <p className="text-green-100 text-sm">CAPITAL LIMITED</p>
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-4">
            Elevate the way to profitable trading
          </h2>
          
          {/* Dashboard preview mockup */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mt-8">
            <div className="bg-white/20 rounded h-32 mb-3"></div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/20 rounded h-16"></div>
              <div className="bg-white/20 rounded h-16"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center p-12 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Log In</h2>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
              icon={<Mail className="h-5 w-5 text-gray-400" />}
              required
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && formik.errors.password ? formik.errors.password : undefined}
                icon={<Lock className="h-5 w-5 text-gray-400" />}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 underline">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify'}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="#" className="font-medium text-green-600 hover:text-green-500">
                  Sign up now
                </a>
              </p>
            </div>
          </form>

          {/* Demo credentials info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 font-medium mb-2">Demo Credentials:</p>
            <p className="text-sm text-blue-700">Email: demo@ambitious.com</p>
            <p className="text-sm text-blue-700">Password: password123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
