import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusIndicator from '../../../components/ui/StatusIndicator';

const NotificationPanel = ({ notifications, onMarkAsRead, onMarkAllAsRead }) => {
  const [expandedNotification, setExpandedNotification] = useState(null);

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'status_update':
        return 'Bell';
      case 'assignment':
        return 'UserCheck';
      case 'completion':
        return 'CheckCircle';
      case 'urgent':
        return 'AlertTriangle';
      default:
        return 'Info';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'status_update':
        return 'text-primary';
      case 'assignment':
        return 'text-accent';
      case 'completion':
        return 'text-success';
      case 'urgent':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const toggleExpanded = (notificationId) => {
    setExpandedNotification(
      expandedNotification === notificationId ? null : notificationId
    );
  };

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  if (notifications?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-lg civic-shadow-sm mb-6">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Bell" size={20} className="text-primary" />
          <h3 className="font-semibold text-card-foreground">Recent Updates</h3>
          {unreadCount > 0 && (
            <span className="bg-error text-error-foreground text-xs px-2 py-1 rounded-full font-medium">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onMarkAllAsRead}
          >
            Mark all read
          </Button>
        )}
      </div>
      {/* Notifications List */}
      <div className="divide-y divide-border max-h-80 overflow-y-auto">
        {notifications?.slice(0, 5)?.map((notification) => (
          <div
            key={notification?.id}
            className={`p-4 hover:bg-muted civic-transition cursor-pointer ${
              !notification?.read ? 'bg-muted/30' : ''
            }`}
            onClick={() => {
              toggleExpanded(notification?.id);
              if (!notification?.read) {
                onMarkAsRead(notification?.id);
              }
            }}
          >
            <div className="flex items-start space-x-3">
              <div className={`flex-shrink-0 ${getNotificationColor(notification?.type)}`}>
                <Icon name={getNotificationIcon(notification?.type)} size={18} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-card-foreground">
                    {notification?.title}
                  </p>
                  <div className="flex items-center space-x-2">
                    {!notification?.read && (
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                    <span className="text-xs text-muted-foreground font-mono">
                      {formatTimestamp(notification?.timestamp)}
                    </span>
                  </div>
                </div>
                
                <p className={`text-sm text-muted-foreground mt-1 ${
                  expandedNotification === notification?.id ? '' : 'line-clamp-2'
                }`}>
                  {notification?.message}
                </p>

                {/* Expanded Details */}
                {expandedNotification === notification?.id && notification?.details && (
                  <div className="mt-3 p-3 bg-muted rounded-lg">
                    <div className="space-y-2">
                      {notification?.details?.reportId && (
                        <div className="flex items-center space-x-2 text-xs">
                          <span className="font-medium">Report ID:</span>
                          <span className="font-mono">{notification?.details?.reportId}</span>
                        </div>
                      )}
                      {notification?.details?.status && (
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-medium">Status:</span>
                          <StatusIndicator 
                            status={notification?.details?.status} 
                            variant="badge" 
                            size="sm"
                          />
                        </div>
                      )}
                      {notification?.details?.location && (
                        <div className="flex items-center space-x-2 text-xs">
                          <Icon name="MapPin" size={12} />
                          <span>{notification?.details?.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Expand/Collapse Indicator */}
                <div className="flex items-center justify-center mt-2">
                  <Icon 
                    name={expandedNotification === notification?.id ? 'ChevronUp' : 'ChevronDown'} 
                    size={16} 
                    className="text-muted-foreground"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* View All Link */}
      {notifications?.length > 5 && (
        <div className="p-3 border-t border-border bg-muted/30">
          <button className="w-full text-sm text-primary hover:text-primary/80 font-medium civic-transition">
            View All Notifications ({notifications?.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;