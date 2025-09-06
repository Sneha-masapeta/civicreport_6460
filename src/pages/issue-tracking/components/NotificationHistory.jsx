import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationHistory = ({ notifications }) => {
  const [expandedNotifications, setExpandedNotifications] = useState(new Set());

  const toggleNotification = (notificationId) => {
    const newExpanded = new Set(expandedNotifications);
    if (newExpanded?.has(notificationId)) {
      newExpanded?.delete(notificationId);
    } else {
      newExpanded?.add(notificationId);
    }
    setExpandedNotifications(newExpanded);
  };

  const getNotificationIcon = (type) => {
    const icons = {
      status_update: 'Bell',
      assignment: 'UserCheck',
      completion: 'CheckCircle',
      message: 'MessageSquare',
      reminder: 'Clock',
      urgent: 'AlertTriangle'
    };
    return icons?.[type] || 'Bell';
  };

  const getNotificationColor = (type) => {
    const colors = {
      status_update: 'text-primary',
      assignment: 'text-accent',
      completion: 'text-success',
      message: 'text-secondary',
      reminder: 'text-warning',
      urgent: 'text-error'
    };
    return colors?.[type] || 'text-primary';
  };

  return (
    <div className="bg-card rounded-lg border border-border civic-shadow-sm p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">Notification History</h2>
      <div className="space-y-4">
        {notifications?.length > 0 ? (
          notifications?.map((notification) => {
            const isExpanded = expandedNotifications?.has(notification?.id);
            
            return (
              <div
                key={notification?.id}
                className="border border-border rounded-lg p-4 hover:bg-muted/50 civic-transition"
              >
                <div className="flex items-start space-x-4">
                  {/* Notification Icon */}
                  <div className={`flex-shrink-0 ${getNotificationColor(notification?.type)}`}>
                    <Icon name={getNotificationIcon(notification?.type)} size={20} />
                  </div>
                  
                  {/* Notification Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-foreground">
                        {notification?.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground font-mono">
                          {new Date(notification.timestamp)?.toLocaleString()}
                        </span>
                        {notification?.details && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleNotification(notification?.id)}
                            className="h-6 w-6"
                          >
                            <Icon 
                              name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
                              size={14} 
                            />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification?.message}
                    </p>
                    
                    {/* Expanded Details */}
                    {isExpanded && notification?.details && (
                      <div className="mt-3 p-3 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground">
                          {notification?.details}
                        </p>
                        {notification?.actionTaken && (
                          <div className="mt-2 pt-2 border-t border-border">
                            <p className="text-xs font-medium text-foreground">Action Taken:</p>
                            <p className="text-xs text-muted-foreground">
                              {notification?.actionTaken}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Notification Status */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        {notification?.channel && (
                          <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                            {notification?.channel}
                          </span>
                        )}
                        {notification?.priority && (
                          <span className={`text-xs px-2 py-1 rounded ${
                            notification?.priority === 'high' ?'bg-error text-error-foreground'
                              : notification?.priority === 'medium' ?'bg-warning text-warning-foreground' :'bg-muted text-muted-foreground'
                          }`}>
                            {notification?.priority} priority
                          </span>
                        )}
                      </div>
                      
                      {notification?.read && (
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Icon name="Check" size={12} />
                          <span>Read</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="Bell" size={48} className="mx-auto mb-4 opacity-50" />
            <p>No notifications yet</p>
            <p className="text-xs mt-2">You'll receive updates as your report progresses</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationHistory;