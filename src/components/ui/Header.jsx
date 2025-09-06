import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import NotificationCenter from './NotificationCenter';
import UserProfileMenu from './UserProfileMenu';

const Header = ({ userRole = 'citizen' }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const citizenNavItems = [
    { label: 'Dashboard', path: '/citizen-dashboard', icon: 'Home' },
    { label: 'Report Issue', path: '/issue-tracking', icon: 'Plus' },
    { label: 'My Reports', path: '/citizen-dashboard', icon: 'FileText' }
  ];

  const isActive = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-1000 bg-card border-b border-border civic-shadow-sm">
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="Building2" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground">CivicReport</span>
              <span className="text-xs text-muted-foreground hidden sm:block">Municipal Services</span>
            </div>
          </Link>

          {/* Citizen Navigation - Desktop */}
          {userRole === 'citizen' && (
            <nav className="hidden md:flex items-center space-x-1">
              {citizenNavItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium civic-transition ${
                    isActive(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </nav>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            <NotificationCenter />
            <UserProfileMenu userRole={userRole} />
            
            {/* Mobile Menu Button - Citizen Only */}
            {userRole === 'citizen' && (
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={toggleMobileMenu}
              >
                <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation - Citizen */}
        {userRole === 'citizen' && isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <nav className="px-4 py-3 space-y-1">
              {citizenNavItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium civic-transition ${
                    isActive(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;