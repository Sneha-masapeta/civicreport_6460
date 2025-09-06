import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onActionClick, urgentReports, overdueReports }) => {
  const [showNotifications, setShowNotifications] = useState(true);

  const quickActionItems = [
    {
      id: 'assign_bulk',
      title: 'Bulk Assignment',
      description: 'Assign multiple reports to departments',
      icon: 'Users',
      color: 'bg-primary',
      action: () => onActionClick('bulk_assign')
    },
    {
      id: 'priority_review',
      title: 'Priority Review',
      description: 'Review high-priority reports',
      icon: 'AlertTriangle',
      color: 'bg-warning',
      count: urgentReports?.length,
      action: () => onActionClick('priority_review')
    },
    {
      id: 'sla_alerts',
      title: 'SLA Alerts',
      description: 'Check overdue reports',
      icon: 'Clock',
      color: 'bg-error',
      count: overdueReports?.length,
      action: () => onActionClick('sla_alerts')
    },
    {
      id: 'duplicate_merge',
      title: 'Merge Duplicates',
      description: 'Identify and merge duplicate reports',
      icon: 'Merge',
      color: 'bg-accent',
      action: () => onActionClick('duplicate_merge')
    },
    {
      id: 'export_data',
      title: 'Export Reports',
      description: 'Download filtered report data',
      icon: 'Download',
      color: 'bg-secondary',
      action: () => onActionClick('export_data')
    },
    {
      id: 'analytics',
      title: 'View Analytics',
      description: 'Detailed performance insights',
      icon: 'BarChart3',
      color: 'bg-success',
      action: () => onActionClick('analytics')
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'urgent',
      title: 'Water Main Break Reported',
      message: 'Critical infrastructure issue on Elm Street requires immediate attention',
      time: '5 minutes ago',
      icon: 'AlertTriangle',
      color: 'text-error'
    },
    {
      id: 2,
      type: 'sla',
      title: 'SLA Breach Warning',
      message: '3 reports approaching deadline in Public Works department',
      time: '15 minutes ago',
      icon: 'Clock',
      color: 'text-warning'
    },
    {
      id: 3,
      type: 'duplicate',
      title: 'Duplicate Reports Detected',
      message: '5 similar pothole reports found on Main Street area',
      time: '32 minutes ago',
      icon: 'Copy',
      color: 'text-primary'
    },
    {
      id: 4,
      type: 'completion',
      title: 'Batch Completion',
      message: '12 streetlight repairs completed by field crew #3',
      time: '1 hour ago',
      icon: 'CheckCircle',
      color: 'text-success'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions Grid */}
      <div className="bg-card border border-border rounded-lg p-6 civic-shadow-sm">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActionItems?.map(item => (
            <button
              key={item?.id}
              onClick={item?.action}
              className="relative p-4 bg-muted/30 hover:bg-muted/50 border border-border rounded-lg civic-transition text-left group"
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${item?.color} text-white group-hover:scale-105 civic-transition`}>
                  <Icon name={item?.icon} size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-card-foreground group-hover:text-primary civic-transition">
                    {item?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item?.description}
                  </p>
                </div>
              </div>
              
              {item?.count && item?.count > 0 && (
                <div className="absolute -top-2 -right-2 bg-error text-error-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {item?.count > 9 ? '9+' : item?.count}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* System Alerts */}
      {showNotifications && (
        <div className="bg-card border border-border rounded-lg p-6 civic-shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-card-foreground">System Alerts</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(false)}
              iconName="X"
            />
          </div>
          
          <div className="space-y-3">
            {recentAlerts?.map(alert => (
              <div
                key={alert?.id}
                className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 civic-transition cursor-pointer"
                onClick={() => onActionClick(`alert_${alert?.type}`, alert)}
              >
                <div className={`flex-shrink-0 ${alert?.color}`}>
                  <Icon name={alert?.icon} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-card-foreground">
                    {alert?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {alert?.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 font-mono">
                    {alert?.time}
                  </p>
                </div>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground flex-shrink-0" />
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => onActionClick('view_all_alerts')}
            >
              View All Alerts
            </Button>
          </div>
        </div>
      )}
      {/* Performance Summary */}
      <div className="bg-card border border-border rounded-lg p-6 civic-shadow-sm">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Today's Performance</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="FileText" size={16} className="text-primary" />
              <span className="text-sm text-card-foreground">New Reports</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-card-foreground">24</span>
              <span className="text-xs text-success">+12%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm text-card-foreground">Resolved</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-card-foreground">18</span>
              <span className="text-xs text-success">+8%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-warning" />
              <span className="text-sm text-card-foreground">Avg Response</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-card-foreground">2.4h</span>
              <span className="text-xs text-success">-0.3h</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Target" size={16} className="text-accent" />
              <span className="text-sm text-card-foreground">SLA Compliance</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-card-foreground">89%</span>
              <span className="text-xs text-success">+3%</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => onActionClick('detailed_analytics')}
            iconName="TrendingUp"
            iconPosition="left"
          >
            View Detailed Analytics
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;