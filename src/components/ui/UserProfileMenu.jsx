import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const UserProfileMenu = ({ userRole = 'citizen' }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Mock user data based on role
  const userData = {
    citizen: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      avatar: null,
      role: 'Citizen',
      joinDate: 'Member since 2023'
    },
    admin: {
      name: 'Michael Chen',
      email: 'michael.chen@cityname.gov',
      avatar: null,
      role: 'Municipal Administrator',
      department: 'Public Works Department'
    }
  };

  const user = userData?.[userRole] || userData?.citizen;

  const citizenMenuItems = [
    { label: 'My Profile', path: '/profile', icon: 'User' },
    { label: 'My Reports', path: '/citizen-dashboard', icon: 'FileText' },
    { label: 'Notification Settings', path: '/notifications', icon: 'Bell' },
    { label: 'Help & Support', path: '/help', icon: 'HelpCircle' }
  ];

  const adminMenuItems = [
    { label: 'My Profile', path: '/admin/profile', icon: 'User' },
    { label: 'Account Settings', path: '/admin/settings', icon: 'Settings' },
    { label: 'Team Management', path: '/admin/team', icon: 'Users' },
    { label: 'System Settings', path: '/admin/system', icon: 'Cog' },
    { label: 'Help & Support', path: '/admin/help', icon: 'HelpCircle' }
  ];

  const menuItems = userRole === 'admin' ? adminMenuItems : citizenMenuItems;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
    setIsOpen(false);
  };

  const getInitials = (name) => {
    return name?.split(' ')?.map(word => word?.charAt(0))?.join('')?.toUpperCase()?.slice(0, 2);
  };

  return (
    <div className="relative">
      {/* Profile Button */}
      <Button
        variant="ghost"
        onClick={toggleMenu}
        className="flex items-center space-x-2 px-3 py-2 h-auto"
      >
        {/* Avatar */}
        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
          {user?.avatar ? (
            <img 
              src={user?.avatar} 
              alt={user?.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            getInitials(user?.name)
          )}
        </div>
        
        {/* Name and Role - Hidden on mobile */}
        <div className="hidden sm:block text-left">
          <div className="text-sm font-medium text-foreground">{user?.name}</div>
          <div className="text-xs text-muted-foreground">{user?.role}</div>
        </div>
        
        <Icon 
          name={isOpen ? 'ChevronUp' : 'ChevronDown'} 
          size={16} 
          className="text-muted-foreground"
        />
      </Button>
      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div 
            className="fixed inset-0 z-1100 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Panel */}
          <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg civic-shadow-lg z-1200">
            {/* User Info Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                  {user?.avatar ? (
                    <img 
                      src={user?.avatar} 
                      alt={user?.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    getInitials(user?.name)
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-popover-foreground truncate">
                    {user?.name}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {user?.email}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {user?.department || user?.joinDate}
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted civic-transition"
                >
                  <Icon name={item?.icon} size={16} className="text-muted-foreground" />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Logout */}
            <div className="py-2">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-2 text-sm text-error hover:bg-muted civic-transition w-full text-left"
              >
                <Icon name="LogOut" size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfileMenu;