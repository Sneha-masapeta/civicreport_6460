import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import StatusIndicator, { StatusTimeline } from '../../../components/ui/StatusIndicator';

const StatusManagement = ({ report, onStatusUpdate }) => {
  const [selectedStatus, setSelectedStatus] = useState(report?.status);
  const [comment, setComment] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const statusActions = [
    {
      status: 'under_review',
      label: 'Mark Under Review',
      icon: 'Eye',
      variant: 'outline',
      requiresComment: false
    },
    {
      status: 'assigned',
      label: 'Mark as Assigned',
      icon: 'UserCheck',
      variant: 'default',
      requiresComment: true
    },
    {
      status: 'in_progress',
      label: 'Start Work',
      icon: 'Clock',
      variant: 'default',
      requiresComment: true
    },
    {
      status: 'completed',
      label: 'Mark Completed',
      icon: 'CheckCircle',
      variant: 'success',
      requiresComment: true
    },
    {
      status: 'on_hold',
      label: 'Put on Hold',
      icon: 'Pause',
      variant: 'warning',
      requiresComment: true
    },
    {
      status: 'rejected',
      label: 'Reject Report',
      icon: 'XCircle',
      variant: 'destructive',
      requiresComment: true
    }
  ];

  const handleStatusUpdate = async (newStatus) => {
    const action = statusActions?.find(a => a?.status === newStatus);
    
    if (action?.requiresComment && !comment?.trim()) {
      alert('Please provide a comment for this status update.');
      return;
    }

    setIsUpdating(true);
    setSelectedStatus(newStatus);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const statusUpdate = {
      status: newStatus,
      comment: comment?.trim(),
      timestamp: new Date()?.toISOString(),
      updatedBy: 'Michael Chen' // Current admin user
    };

    onStatusUpdate(statusUpdate);
    setComment('');
    setIsUpdating(false);
  };

  const getAvailableActions = () => {
    const currentStatus = report?.status;
    
    // Define allowed transitions
    const transitions = {
      'submitted': ['under_review', 'assigned', 'rejected'],
      'under_review': ['assigned', 'rejected', 'on_hold'],
      'assigned': ['in_progress', 'on_hold', 'rejected'],
      'in_progress': ['completed', 'on_hold'],
      'on_hold': ['in_progress', 'assigned'],
      'completed': ['closed'],
      'rejected': [],
      'closed': []
    };

    const allowedStatuses = transitions?.[currentStatus] || [];
    return statusActions?.filter(action => allowedStatuses?.includes(action?.status));
  };

  const availableActions = getAvailableActions();

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <div className="bg-card border border-border rounded-lg p-6 civic-shadow-sm">
        <h2 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
          <Icon name="Activity" size={20} />
          Status Management
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="text-sm font-medium text-card-foreground">Current Status</p>
              <div className="mt-2">
                <StatusIndicator status={report?.status} variant="badge" size="lg" />
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Last Updated</p>
              <p className="text-sm font-medium text-card-foreground">
                {new Date(report.lastUpdated)?.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>

          {/* Status Actions */}
          {availableActions?.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-card-foreground mb-3">Available Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableActions?.map((action) => (
                  <Button
                    key={action?.status}
                    variant={action?.variant}
                    onClick={() => handleStatusUpdate(action?.status)}
                    disabled={isUpdating}
                    iconName={action?.icon}
                    iconPosition="left"
                    className="justify-start"
                  >
                    {action?.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Comment Field */}
          <Input
            label="Status Update Comment"
            type="text"
            placeholder="Add a comment about this status update..."
            value={comment}
            onChange={(e) => setComment(e?.target?.value)}
            description="Comments are visible to citizens and internal staff"
          />
        </div>
      </div>
      {/* Status Timeline */}
      <div className="bg-card border border-border rounded-lg p-6 civic-shadow-sm">
        <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
          <Icon name="Timeline" size={20} />
          Progress Timeline
        </h3>
        
        <StatusTimeline 
          currentStatus={report?.status}
          statuses={['submitted', 'under_review', 'assigned', 'in_progress', 'completed']}
        />
      </div>
      {/* SLA Tracking */}
      <div className="bg-card border border-border rounded-lg p-6 civic-shadow-sm">
        <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
          <Icon name="Timer" size={20} />
          SLA Tracking
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-2xl font-bold text-success">2.5</p>
            <p className="text-sm text-muted-foreground">Days Elapsed</p>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-2xl font-bold text-warning">5</p>
            <p className="text-sm text-muted-foreground">SLA Target (Days)</p>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-2xl font-bold text-primary">50%</p>
            <p className="text-sm text-muted-foreground">Time Used</p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-card-foreground font-medium">On Track</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-success h-2 rounded-full" style={{ width: '50%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusManagement;