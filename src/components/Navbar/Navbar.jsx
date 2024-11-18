import { useId, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { 
  faHome, 
  faShoppingCart, 
  faClipboardList, 
  faSearch, 
  faSignInAlt, 
  faSignOutAlt, 
  faUserPlus 
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Navbar({ onSearchChange }) {
  const inputId = useId();
  const { isLoggedIn, login, logout } = useUser();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchInput = (e) => {
    onSearchChange(e.target.value);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const NavLink = ({ to, children, icon }) => (
    <Link
      to={to}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full
        transition-all duration-300 ease-in-out
        ${isActivePath(to) 
          ? 'bg-pink-100 text-pink-700 shadow-sm' 
          : 'text-pink-700 hover:bg-pink-100'}
        hover:scale-105 active:scale-95
      `}
    >
      <FontAwesomeIcon icon={icon} className="text-sm" />
      {children}
    </Link>
  );

  return (
    <nav 
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-in-out
        ${isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-md' 
          : 'bg-gradient-to-r from-pink-100 to-pink-200'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Home */}
          <div className="flex-shrink-0">
            <NavLink to="/" icon={faHome}>
              <span className="font-semibold text-lg">Home</span>
            </NavLink>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <FontAwesomeIcon 
                icon={faSearch} 
                className={`
                  absolute left-3 top-1/2 transform -translate-y-1/2
                  transition-colors duration-300
                  ${searchFocused ? 'text-pink-500' : 'text-pink-400'}
                `}
              />
              <input
                type="text"
                className={`
                  w-full pl-10 pr-4 py-2 rounded-full
                  border-2 transition-all duration-300 ease-in-out
                  ${searchFocused 
                    ? 'border-pink-400 ring-2 ring-pink-200 bg-white' 
                    : 'border-pink-200 bg-pink-50'}
                  focus:outline-none placeholder-pink-300
                `}
                name="search"
                id={inputId}
                placeholder="Search products..."
                onChange={handleSearchInput}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            {!isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button 
                  onClick={login}
                  className="flex items-center gap-2 px-4 py-2 rounded-full
                    bg-pink-500 text-white hover:bg-pink-600
                    transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <FontAwesomeIcon icon={faSignInAlt} />
                  Sign in
                </button>
                <NavLink to="/signup" icon={faUserPlus}>
                  Sign up
                </NavLink>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <NavLink to="/cart" icon={faShoppingCart}>
                  Cart
                </NavLink>
                <NavLink to="/orders" icon={faClipboardList}>
                  Orders
                </NavLink>
                <button 
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 rounded-full
                    text-pink-700 hover:bg-pink-100
                    transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}