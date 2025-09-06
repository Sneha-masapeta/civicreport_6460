import React from 'react';
import Icon from '../../../components/AppIcon';
import StatusIndicator from '../../../components/ui/StatusIndicator';

const ReportHeader = ({ report }) => {
  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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

  return (
    <div className="bg-card border border-border rounded-lg p-6 civic-shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-semibold text-card-foreground">
              Report #{report?.id}
            </h1>
            <StatusIndicator status={report?.status} variant="badge" size="default" />
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Icon name="Calendar" size={14} />
              <span>Submitted {formatDate(report?.submittedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="User" size={14} />
              <span>By {report?.citizenName}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="MapPin" size={14} />
              <span>{report?.location?.address}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-card-foreground">Priority:</span>
            <span className={`text-sm font-semibold capitalize ${getPriorityColor(report?.priority)}`}>
              {report?.priority}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Icon name="Tag" size={14} className="text-muted-foreground" />
            <span className="text-sm font-medium text-card-foreground">{report?.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;