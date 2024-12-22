import { useLoginUser, useVerifyEmail } from '@/hooks/auth';
import { Loader } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Input {
  password: string;
  usernameOrEmail: string;
  verificationCode: string
}

function LoginPage() {
  const { mutateAsync: loginUser, isPending: isLoginSubmitting } = useLoginUser();
  const { mutateAsync: verifyEmail, isPending: isVerifySubmitting } = useVerifyEmail();
  const [email, setEmail] = useState("")
  const [isLoginPage, setIsLoginPage] = useState(true);  // Initially on signup page

  // Set up React Hook Form
  const {
    register,
    handleSubmit
  } = useForm<Input>();

  // Handle form submission for signup
  const handleLoginUser = async (data: Input) => {
    try {
      const loginResponse = await loginUser(data);  // Attempt signup

      if (!loginResponse?.isVerified) {
        // If signup is successful, toggle to the Verify Email page
        setIsLoginPage(false);
        setEmail(loginResponse.email)
      }
    } catch (error) {
      console.log(error);
      setIsLoginPage(true);
    }
  };

  // Handle email verification form submission
  const handleVerifyEmail = async (data: Input) => {
    await verifyEmail({ code: data.verificationCode, email })
  };

  // Show the Signup Form or the Verify Email page
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#242424] to-[#080808] flex flex-col items-center justify-center text-white overflow-hidden">
      {isLoginPage ? (
        // Signup Page
        <div className="bg-[#121112] rounded-lg shadow-lg w-full max-w-md p-9">
          <h2 className="text-2xl font-semibold mb-6 text-center">Signup to Connectify</h2>

          {/* Signup Form */}
          <form className="space-y-6" onSubmit={handleSubmit(handleLoginUser)}>
            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-xs font-semibold text-gray-300 mb-2">
                Username Or Email
              </label>
              <input
                id="usernameOrEmail"
                type="text"
                placeholder="Username Or Email"
                {...register('usernameOrEmail')}
                className="w-full p-2 bg-transparent text-white border-[0.5px] border-white rounded-md focus:outline-none focus:border-white focus:ring-2 focus:ring-white"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                {...register('password')}
                className="w-full p-2 bg-transparent text-white border-[0.5px] border-white rounded-md focus:outline-none focus:border-white focus:ring-2 focus:ring-white"
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full py-3 bg-green-500 rounded-full text-white font-semibold hover:bg-green-600 focus:outline-none">
              {isLoginSubmitting ? <Loader className="animate-spin mx-auto" size={25} /> : 'Log in'}
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-600" />
            <span className="px-2 text-sm text-gray-400">OR</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-4">
            <button className="w-full py-3 bg-red-600 rounded-md text-white font-semibold hover:bg-red-700 focus:outline-none">
              Continue with Google
            </button>
          </div>

          {/* Already have an account? */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="text-green-500 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      ) : (
        // Verify Email Page
        <div className="bg-[#121112] rounded-lg shadow-lg w-full max-w-md p-9 mt-32">
          <h2 className="text-2xl font-semibold mb-6">Verify Your Email</h2>
          <p className="text-gray-400 mb-4">A verification email has been sent to your email address. Please check your inbox to complete the registration process.</p>

          {/* Email Verification Form */}
          <form className="space-y-6" onSubmit={handleSubmit(handleVerifyEmail)}>
            <div>
              <label htmlFor="verificationCode" className="block text-xs font-semibold text-gray-300 mb-2">
                Verification Code
              </label>
              <input
                id="verificationCode"
                type="text"
                placeholder="Enter Verification Code"
                {...register('verificationCode')}
                className="w-full p-2 bg-transparent text-white border-[0.5px] border-white rounded-md focus:outline-none focus:border-white focus:ring-2 focus:ring-white"
              />
            </div>

            {/* Submit Button for Verification */}
            <button type="submit" className="w-full py-3 bg-green-500 rounded-full text-white font-semibold hover:bg-green-600 focus:outline-none">
              {isVerifySubmitting ? <Loader className="animate-spin mx-auto" size={25} /> : 'Verify Email'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
