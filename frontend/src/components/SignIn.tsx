import React from 'react';

const SignIn: React.FC = () => {
  const handleGoogleSignIn = () => {
    window.location.href = '/api/auth/google';
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mb-4"
        >
          Sign in with Google
        </button>

        <div className="text-gray-400 text-center my-4">or</div>

        {}
        <form>
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 mb-3 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 mb-4 rounded"
          />
          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          Don't have an account? <a href="#" className="text-amber-500">Create Account</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
