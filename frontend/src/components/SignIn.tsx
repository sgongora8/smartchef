import { useState } from 'react';

const SignIn: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignIn && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (isSignIn) {
      console.log('Signing in with:', { email, password });
    } else {
      console.log('Creating account with:', { email, password });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignIn ? 'Sign In' : 'Create Account'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          {!isSignIn && (
            <div className="mb-6">
              <label className="block text-gray-700">Confirm Password</label>
              <input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-amber-500 text-white py-2 rounded hover:bg-amber-600"
          >
            {isSignIn ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          {isSignIn ? (
            <p className="text-sm">
              Don't have an account?{" "}
              <button 
                onClick={() => setIsSignIn(false)}
                className="text-amber-500 hover:underline"
              >
                Create Account
              </button>
            </p>
          ) : (
            <p className="text-sm">
              Already have an account?{" "}
              <button 
                onClick={() => setIsSignIn(true)}
                className="text-amber-500 hover:underline"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
