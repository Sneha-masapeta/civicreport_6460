import React from 'react';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import StatusIndicator from '../../../components/ui/StatusIndicator';

const ReportCard = ({ report, onViewDetails, onTrackProgress }) => {
  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'AlertCircle';
      case 'low':
        return 'Info';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg civic-shadow-sm hover:civic-shadow-md civic-transition">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Thumbnail Image */}
          <div className="flex-shrink-0">
            <div className="w-full sm:w-20 h-32 sm:h-20 rounded-lg overflow-hidden bg-muted">
              <Image
                src={report?.thumbnail}
                alt={report?.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Report Details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-2 sm:space-y-0">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-card-foreground truncate">
                  {report?.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Report #{report?.id}
                </p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>{formatDate(report?.submittedDate)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span className="truncate max-w-32">{report?.location}</span>
                  </div>
                </div>
              </div>

              {/* Priority Indicator */}
              <div className="flex items-center space-x-2">
                <div className={`flex items-center space-x-1 ${getPriorityColor(report?.priority)}`}>
                  <Icon name={getPriorityIcon(report?.priority)} size={16} />
                  <span className="text-sm font-medium capitalize">{report?.priority}</span>
                </div>
              </div>
            </div>

            {/* Status and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 space-y-3 sm:space-y-0">
              <StatusIndicator 
                status={report?.status} 
                variant="badge" 
                size="default"
              />

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewDetails(report)}
                  iconName="Eye"
                  iconPosition="left"
                >
                  View Details
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onTrackProgress(report)}
                  iconName="MapPin"
                  iconPosition="left"
                >
                  Track
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;