import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Auth context
  const { currentUser, userRole, logout } = useAuth();

  const navItems = [
    { to: '/', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { to: '/features', label: 'Docs', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { to: '/dashboard', label: 'Analyze', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  ];

  async function handleLogout() {
    if (logout) {
      await logout();
      navigate('/login');
    }
  }

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
      <nav className="nav-pill group/nav">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 pr-4 border-r border-foreground-light/10 dark:border-foreground-dark/10 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-white font-bold text-xs">AI</span>
          </div>
          <span className="text-sm font-bold tracking-tight hidden lg:block">
            Resume<span className="text-primary">Pro</span>
          </span>
        </Link>

        {/* Nav Items */}
        <div className="flex items-center gap-1 md:gap-4">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}
              className={`relative px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-2 group/item ${location.pathname === item.to
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'text-foreground-light/60 dark:text-foreground-dark/60 hover:text-primary hover:bg-primary/5'
                }`}
            >
              <svg className="w-4 h-4 md:hidden lg:block transition-transform duration-300 group-hover/item:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              <span className="hidden sm:block">{item.label}</span>
              {location.pathname === item.to && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
              )}
            </Link>
          ))}

          {/* HR Mode link — only for HR users */}
          {userRole === 'hr' && (
            <Link to="/hr"
              className={`relative px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-2 group/item ${location.pathname === '/hr'
                ? 'bg-secondary text-white shadow-lg shadow-secondary/20'
                : 'text-foreground-light/60 dark:text-foreground-dark/60 hover:text-secondary hover:bg-secondary/5'
                }`}
            >
              <svg className="w-4 h-4 md:hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="hidden sm:block">HR Mode</span>
              {location.pathname === '/hr' && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
              )}
            </Link>
          )}
        </div>

        {/* Separator */}
        <div className="h-4 w-px bg-foreground-light/10 dark:border-foreground-dark/10 mx-2" />

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Dark mode toggle */}
          <button onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-foreground-light/5 dark:hover:bg-foreground-dark/5 transition-all text-foreground-light/60 dark:text-foreground-dark/60"
            aria-label="Toggle dark mode">
            {darkMode ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Auth button */}
          {currentUser ? (
            <button onClick={handleLogout}
              className="hidden sm:flex px-4 py-2 bg-foreground-light/10 dark:bg-foreground-dark/10 text-xs font-bold rounded-full hover:bg-red-500/10 hover:text-red-400 transition-all duration-300">
              Logout
            </button>
          ) : (
            <Link to="/login"
              className="hidden sm:flex px-4 py-2 bg-secondary text-white text-xs font-bold rounded-full shadow-lg shadow-secondary/20 hover:bg-secondary/90 transition-all duration-300 hover:scale-[1.05] active:scale-95">
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
