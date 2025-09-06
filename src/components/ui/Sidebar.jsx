import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const adminNavItems = [
    { 
      label: 'Overview', 
      path: '/admin-dashboard', 
      icon: 'BarChart3',
      description: 'Live monitoring dashboard'
    },
    { 
      label: 'Reports', 
      path: '/report-management', 
      icon: 'FileText',
      description: 'Individual case processing'
    },
    { 
      label: 'Analytics', 
      path: '/analytics-dashboard', 
      icon: 'TrendingUp',
      description: 'Strategic insights'
    }
  ];

  const secondaryItems = [
    { label: 'Settings', path: '/settings', icon: 'Settings' },
    { label: 'Help', path: '/help', icon: 'HelpCircle' },
    { label: 'Admin', path: '/admin', icon: 'Shield' }
  ];

  const isActive = (path) => location?.pathname === path;

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-1200 bg-card civic-shadow-md"
        onClick={toggleMobile}
      >
        <Icon name="Menu" size={20} />
      </Button>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-1100"
          onClick={toggleMobile}
        />
      )}
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-1200 h-full bg-card border-r border-border civic-shadow-lg
        transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        ${isCollapsed ? 'w-16' : 'w-64'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <Link to="/" className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                  <Icon name="Building2" size={20} color="white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-foreground">CivicReport</span>
                  <span className="text-xs text-muted-foreground">Admin Portal</span>
                </div>
              </Link>
            )}
            
            {isCollapsed && (
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg mx-auto">
                <Icon name="Building2" size={20} color="white" />
              </div>
            )}

            {/* Desktop Collapse Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex"
              onClick={onToggleCollapse}
            >
              <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={16} />
            </Button>

            {/* Mobile Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={toggleMobile}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {/* Primary Navigation */}
            <div className="space-y-1">
              {adminNavItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`
                    flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium civic-transition
                    ${isActive(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                    ${isCollapsed ? 'justify-center' : ''}
                  `}
                  title={isCollapsed ? item?.label : ''}
                >
                  <Icon name={item?.icon} size={18} />
                  {!isCollapsed && (
                    <div className="flex-1">
                      <div className="font-medium">{item?.label}</div>
                      <div className="text-xs opacity-75">{item?.description}</div>
                    </div>
                  )}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-border my-4" />

            {/* Secondary Navigation */}
            <div className="space-y-1">
              {secondaryItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`
                    flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium civic-transition
                    ${isActive(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                    ${isCollapsed ? 'justify-center' : ''}
                  `}
                  title={isCollapsed ? item?.label : ''}
                >
                  <Icon name={item?.icon} size={16} />
                  {!isCollapsed && <span>{item?.label}</span>}
                </Link>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className={`text-xs text-muted-foreground ${isCollapsed ? 'text-center' : ''}`}>
              {!isCollapsed && (
                <>
                  <div className="font-medium">Municipal Admin</div>
                  <div>Version 2.1.0</div>
                </>
              )}
              {isCollapsed && (
                <div className="font-mono">v2.1</div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;