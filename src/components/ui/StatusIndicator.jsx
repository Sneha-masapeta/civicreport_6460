import React from 'react';
import Icon from '../AppIcon';

const StatusIndicator = ({ 
  status, 
  variant = 'badge', 
  showIcon = true, 
  showText = true,
  size = 'default',
  className = '' 
}) => {
  
  const statusConfig = {
    submitted: {
      label: 'Submitted',
      icon: 'FileText',
      color: 'bg-secondary text-secondary-foreground',
      dotColor: 'bg-secondary',
      description: 'Report has been submitted and is awaiting review'
    },
    under_review: {
      label: 'Under Review',
      icon: 'Eye',
      color: 'bg-warning text-warning-foreground',
      dotColor: 'bg-warning',
      description: 'Report is being reviewed by municipal staff'
    },
    assigned: {
      label: 'Assigned',
      icon: 'UserCheck',
      color: 'bg-primary text-primary-foreground',
      dotColor: 'bg-primary',
      description: 'Report has been assigned to field crew'
    },
    in_progress: {
      label: 'In Progress',
      icon: 'Clock',
      color: 'bg-accent text-accent-foreground',
      dotColor: 'bg-accent',
      description: 'Work is currently in progress'
    },
    completed: {
      label: 'Completed',
      icon: 'CheckCircle',
      color: 'bg-success text-success-foreground',
      dotColor: 'bg-success',
      description: 'Work has been completed successfully'
    },
    closed: {
      label: 'Closed',
      icon: 'CheckCircle2',
      color: 'bg-muted text-muted-foreground',
      dotColor: 'bg-muted-foreground',
      description: 'Report has been closed'
    },
    rejected: {
      label: 'Rejected',
      icon: 'XCircle',
      color: 'bg-error text-error-foreground',
      dotColor: 'bg-error',
      description: 'Report was rejected or could not be processed'
    },
    on_hold: {
      label: 'On Hold',
      icon: 'Pause',
      color: 'bg-warning text-warning-foreground',
      dotColor: 'bg-warning',
      description: 'Work has been temporarily paused'
    }
  };

  const config = statusConfig?.[status] || statusConfig?.submitted;

  const sizeClasses = {
    sm: {
      badge: 'px-2 py-1 text-xs',
      icon: 12,
      dot: 'w-2 h-2'
    },
    default: {
      badge: 'px-3 py-1 text-sm',
      icon: 14,
      dot: 'w-3 h-3'
    },
    lg: {
      badge: 'px-4 py-2 text-base',
      icon: 16,
      dot: 'w-4 h-4'
    }
  };

  const currentSize = sizeClasses?.[size] || sizeClasses?.default;

  if (variant === 'badge') {
    return (
      <span 
        className={`inline-flex items-center space-x-1.5 rounded-full font-medium ${config?.color} ${currentSize?.badge} ${className}`}
        title={config?.description}
      >
        {showIcon && (
          <Icon name={config?.icon} size={currentSize?.icon} />
        )}
        {showText && <span>{config?.label}</span>}
      </span>
    );
  }

  if (variant === 'dot') {
    return (
      <div className={`flex items-center space-x-2 ${className}`} title={config?.description}>
        <div className={`rounded-full ${config?.dotColor} ${currentSize?.dot}`} />
        {showText && (
          <span className="text-sm font-medium text-foreground">{config?.label}</span>
        )}
      </div>
    );
  }

  if (variant === 'timeline') {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${config?.color}`}>
          <Icon name={config?.icon} size={16} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">{config?.label}</p>
          <p className="text-xs text-muted-foreground">{config?.description}</p>
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`p-4 rounded-lg border border-border bg-card ${className}`}>
        <div className="flex items-center space-x-3">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${config?.color}`}>
            <Icon name={config?.icon} size={20} />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-card-foreground">{config?.label}</h3>
            <p className="text-xs text-muted-foreground mt-1">{config?.description}</p>
          </div>
        </div>
      </div>
    );
  }

  // Default to simple text with icon
  return (
    <div className={`flex items-center space-x-2 ${className}`} title={config?.description}>
      {showIcon && (
        <Icon name={config?.icon} size={currentSize?.icon} className={config?.dotColor?.replace('bg-', 'text-')} />
      )}
      {showText && (
        <span className="text-sm font-medium text-foreground">{config?.label}</span>
      )}
    </div>
  );
};

// Progress Timeline Component for showing status progression
export const StatusTimeline = ({ currentStatus, statuses = [], className = '' }) => {
  const defaultStatuses = ['submitted', 'under_review', 'assigned', 'in_progress', 'completed'];
  const statusList = statuses?.length > 0 ? statuses : defaultStatuses;
  
  const currentIndex = statusList?.indexOf(currentStatus);

  return (
    <div className={`space-y-4 ${className}`}>
      {statusList?.map((status, index) => {
        const isCompleted = index <= currentIndex;
        const isCurrent = index === currentIndex;
        
        return (
          <div key={status} className="relative">
            {/* Connecting Line */}
            {index < statusList?.length - 1 && (
              <div 
                className={`absolute left-4 top-8 w-0.5 h-8 ${
                  isCompleted ? 'bg-success' : 'bg-border'
                }`} 
              />
            )}
            {/* Status Item */}
            <StatusIndicator
              status={status}
              variant="timeline"
              className={`relative ${
                isCurrent ? 'opacity-100' : isCompleted ? 'opacity-75' : 'opacity-50'
              }`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default StatusIndicator;