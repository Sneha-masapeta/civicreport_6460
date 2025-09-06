import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressTimeline = ({ statusHistory, currentStatus }) => {
  const getStatusConfig = (status) => {
    const configs = {
      submitted: {
        label: 'Submitted',
        icon: 'FileText',
        color: 'bg-secondary text-secondary-foreground',
        description: 'Report submitted successfully'
      },
      under_review: {
        label: 'Under Review',
        icon: 'Eye',
        color: 'bg-warning text-warning-foreground',
        description: 'Being reviewed by municipal staff'
      },
      assigned: {
        label: 'Assigned',
        icon: 'UserCheck',
        color: 'bg-primary text-primary-foreground',
        description: 'Assigned to field crew'
      },
      in_progress: {
        label: 'In Progress',
        icon: 'Clock',
        color: 'bg-accent text-accent-foreground',
        description: 'Work is currently underway'
      },
      completed: {
        label: 'Completed',
        icon: 'CheckCircle',
        color: 'bg-success text-success-foreground',
        description: 'Work has been completed'
      },
      closed: {
        label: 'Closed',
        icon: 'CheckCircle2',
        color: 'bg-muted text-muted-foreground',
        description: 'Report has been closed'
      }
    };
    return configs?.[status] || configs?.submitted;
  };

  return (
    <div className="bg-card rounded-lg border border-border civic-shadow-sm p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">Progress Timeline</h2>
      <div className="space-y-6">
        {statusHistory?.map((entry, index) => {
          const config = getStatusConfig(entry?.status);
          const isLatest = index === 0;
          const isCompleted = entry?.status === currentStatus || index > 0;
          
          return (
            <div key={entry?.id} className="relative">
              {/* Connecting Line */}
              {index < statusHistory?.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-8 bg-border" />
              )}
              {/* Timeline Item */}
              <div className="flex items-start space-x-4">
                {/* Status Icon */}
                <div className={`
                  flex items-center justify-center w-12 h-12 rounded-full border-2 
                  ${isCompleted ? config?.color : 'bg-muted text-muted-foreground border-border'}
                  ${isLatest ? 'ring-4 ring-primary/20' : ''}
                `}>
                  <Icon name={config?.icon} size={20} />
                </div>
                
                {/* Status Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">
                      {config?.label}
                    </h3>
                    <span className="text-xs text-muted-foreground font-mono">
                      {new Date(entry.timestamp)?.toLocaleString()}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-1">
                    {entry?.description || config?.description}
                  </p>
                  
                  {entry?.assignedTo && (
                    <div className="flex items-center space-x-2 mt-2">
                      <Icon name="User" size={14} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Assigned to: {entry?.assignedTo}
                      </span>
                    </div>
                  )}
                  
                  {entry?.notes && (
                    <div className="mt-2 p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">{entry?.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTimeline;