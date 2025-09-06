import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustBadges = [
    {
      id: 1,
      icon: 'Shield',
      title: 'SSL Secured',
      description: 'Your data is encrypted and secure'
    },
    {
      id: 2,
      icon: 'Lock',
      title: 'Privacy Protected',
      description: 'GDPR & CCPA compliant'
    },
    {
      id: 3,
      icon: 'CheckCircle',
      title: 'Government Verified',
      description: 'Official municipal platform'
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      {/* Municipal Endorsement */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-3 mb-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="Building2" size={24} color="white" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-semibold text-foreground">City of Cityname</h3>
            <p className="text-xs text-muted-foreground">Official Municipal Portal</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Trusted by over 50,000 residents for civic issue reporting
        </p>
      </div>
      {/* Trust Badges */}
      <div className="grid grid-cols-1 gap-3">
        {trustBadges?.map((badge) => (
          <div
            key={badge?.id}
            className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg border border-border"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-success/10 rounded-full">
              <Icon name={badge?.icon} size={16} className="text-success" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-foreground">{badge?.title}</h4>
              <p className="text-xs text-muted-foreground">{badge?.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Security Notice */}
      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-primary mb-1">Secure Access</h4>
            <p className="text-xs text-muted-foreground">
              Your login credentials are encrypted and never shared with third parties. 
              All communications are secured with industry-standard SSL encryption.
            </p>
          </div>
        </div>
      </div>
      {/* Contact Support */}
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Need help? Contact support at{' '}
          <a href="mailto:support@cityname.gov" className="text-primary hover:underline">
            support@cityname.gov
          </a>
        </p>
      </div>
    </div>
  );
};

export default TrustSignals;