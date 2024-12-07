import React from 'react'

function Login() {
  return (
    <div className="h-screen bg-gradient-to-b from-[#242424] to-[#080808] flex flex-col justify-center items-center text-white">
      {/* Login Box with Gradient Background */}
      <div className="bg-[#121112] rounded-lg shadow-lg w-[400px] p-9"> {/* Increased width here */}
        <h2 className="text-2xl font-semibold mb-6">Log in to Connectify</h2>

        {/* Login Form */}
        <form className="space-y-6">
          {/* Email or Username Input */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-gray-300 mb-2">
              Email or Username
            </label>
            <input
              id="email"
              type="text"
              placeholder="Email or Username"
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
              className="w-full p-2 bg-transparent text-white border-[0.5px] border-white rounded-md focus:outline-none focus:border-white focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Submit Button */}
          <button className="w-full py-3 bg-green-500 rounded-full text-white font-semibold hover:bg-green-600 focus:outline-none">
            Log In
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
          <button className="w-full py-3 bg-blue-600 rounded-md text-white font-semibold hover:bg-blue-700 focus:outline-none">
            Continue with Facebook
          </button>
          <button className="w-full py-3 bg-red-600 rounded-md text-white font-semibold hover:bg-red-700 focus:outline-none">
            Continue with Google
          </button>
        </div>
      </div>

      {/* Sign Up Link */}
      <p className="mt-6 text-sm text-gray-400">
        Don't have an account?{' '}
        <a href="/signup" className="text-green-500 hover:underline">
          Sign up here
        </a>
      </p>
    </div>
  );
}

export default Login;
