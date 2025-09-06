import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import StatusIndicator from '../../../components/ui/StatusIndicator';

const IssueHeader = ({ issue }) => {
  return (
    <div className="bg-card rounded-lg border border-border civic-shadow-sm p-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6 space-y-4 lg:space-y-0">
        {/* Issue Image */}
        <div className="flex-shrink-0">
          <div className="w-full lg:w-48 h-48 rounded-lg overflow-hidden bg-muted">
            <Image
              src={issue?.photos?.[0]}
              alt={`${issue?.category} issue`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Issue Details */}
        <div className="flex-1 space-y-4">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{issue?.title}</h1>
              <p className="text-sm text-muted-foreground">Report ID: {issue?.id}</p>
            </div>
            <StatusIndicator status={issue?.status} variant="badge" size="lg" />
          </div>

          {/* Issue Meta Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">
                Submitted: {new Date(issue.submittedAt)?.toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">{issue?.location?.address}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Tag" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">{issue?.category}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Priority: {issue?.priority}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">Description</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {issue?.description}
            </p>
          </div>

          {/* Estimated Resolution */}
          {issue?.estimatedResolution && (
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Estimated Resolution: {new Date(issue.estimatedResolution)?.toLocaleDateString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueHeader;