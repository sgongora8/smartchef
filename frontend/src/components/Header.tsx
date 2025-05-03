import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


interface User {
  name: string;
  email: string;
}

const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/current_user', {
          credentials: 'include'
        });
        const data = await res.json();
        if (data?.email) setUser(data);
      } catch (err) {
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      credentials: 'include'
    });
    setUser(null);
    navigate('/');
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
        <nav>
          <ul className="flex gap-6 items-center text-gray-600">
            <li className="hover:text-amber-500 transition-colors">
              <Link to="/" className="py-2">Home</Link>
            </li>

            {!loading && user && (
              <li className="hover:text-amber-500 transition-colors">
                <Link to="/saved-recipes" className="py-2">Saved Recipes</Link>
              </li>
            )}

            {!loading && user ? (
              <>
                <li className="text-sm text-gray-700">
                  👋 Welcome <strong>{user.name}</strong>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              !loading && (
                <li className="hover:text-amber-500 transition-colors">
                  <a href="/api/auth/google" className="py-2">Sign In / Sign Up</a>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
