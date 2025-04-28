import { Link } from 'react-router-dom';
import { ChefHat } from 'lucide-react';

const Header: React.FC = () => {
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
          <ul className="flex gap-6 text-gray-600">
            <li className="hover:text-amber-500 transition-colors">
              <Link to="/" className="py-2">Home</Link>
            </li>
            <li className="hover:text-amber-500 transition-colors">
              <Link to="/signin" className="py-2">Sign In</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
