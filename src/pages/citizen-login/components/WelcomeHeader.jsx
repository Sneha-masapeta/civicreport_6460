import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo and App Name */}
      <div className="flex items-center justify-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl civic-shadow-md">
          <Icon name="Building2" size={28} color="white" />
        </div>
        <div className="text-left">
          <h1 className="text-2xl font-bold text-foreground">CivicReport</h1>
          <p className="text-sm text-muted-foreground">Municipal Services Portal</p>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">Welcome Back</h2>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Sign in to your account to report issues, track submissions, and stay connected with your community.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 p-4 bg-muted/30 rounded-lg border border-border">
        <div className="text-center">
          <div className="text-lg font-bold text-primary">2,847</div>
          <div className="text-xs text-muted-foreground">Issues Resolved</div>
        </div>
        <div className="text-center border-x border-border">
          <div className="text-lg font-bold text-success">94%</div>
          <div className="text-xs text-muted-foreground">Success Rate</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-accent">24h</div>
          <div className="text-xs text-muted-foreground">Avg Response</div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;