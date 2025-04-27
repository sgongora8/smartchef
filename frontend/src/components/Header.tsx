import React, { useState, useEffect } from 'react';
import { ChefHat, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import AuthModal from './AuthModal';
import toast from 'react-hot-toast';

const Header: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl" role="img" aria-label="Chef emoji">👨‍🍳</span>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-red-500 bg-clip-text text-transparent">
            SmartChef
          </h1>
        </div>
        <nav className="flex items-center gap-6">
          <ul className="flex gap-6 text-gray-600">
            <li className="hover:text-amber-500 transition-colors">
              <a href="#" className="py-2">Home</a>
            </li>
            <li className="hover:text-amber-500 transition-colors">
              <a href="#" className="py-2">Recipes</a>
            </li>
            <li className="hover:text-amber-500 transition-colors">
              <a href="#" className="py-2">About</a>
            </li>
          </ul>
          
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-600">{user.email}</span>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 text-gray-600 hover:text-amber-500 transition-colors"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
            >
              Sign In
            </button>
          )}
        </nav>
      </div>
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
};

export default Header;