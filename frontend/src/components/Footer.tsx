import { Link } from 'react-router-dom';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 text-gray-600 py-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">SmartChef</h3>
            <p className="text-sm">AI-powered recipe assistant that helps you find the perfect meal based on your preferences and skill level.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-amber-500 transition-colors">Home</Link></li>
              <li><Link to="/recipes" className="hover:text-amber-500 transition-colors">Recipes</Link></li>
              <li><Link to="/about" className="hover:text-amber-500 transition-colors">About</Link></li>
              <li><Link to="/signin" className="hover:text-amber-500 transition-colors">Sign In</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/blog" className="hover:text-amber-500 transition-colors">Blog</Link></li>
              <li><Link to="/cooking-tips" className="hover:text-amber-500 transition-colors">Cooking Tips</Link></li>
              <li><Link to="/ingredients-guide" className="hover:text-amber-500 transition-colors">Ingredients Guide</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Stay Updated</h3>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-l focus:outline-none focus:border-amber-500"
              />
              <button className="bg-amber-500 text-white px-4 py-2 text-sm rounded-r hover:bg-amber-600 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-xs mt-2">Subscribe to get weekly recipe inspiration.</p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-center">
          &copy; {new Date().getFullYear()} SmartChef. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
