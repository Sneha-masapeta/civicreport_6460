import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsPanel = ({ reports }) => {
  const totalReports = reports?.length;
  const activeReports = reports?.filter(r => !['completed', 'closed']?.includes(r?.status))?.length;
  const completedToday = reports?.filter(r => {
    const today = new Date()?.toDateString();
    return r?.status === 'completed' && new Date(r.updatedAt)?.toDateString() === today;
  })?.length;

  const avgResolutionTime = 4.2; // Mock calculation
  const slaCompliance = 87; // Mock percentage

  const metrics = [
    {
      id: 'total',
      label: 'Total Reports',
      value: totalReports,
      change: '+12%',
      changeType: 'positive',
      icon: 'FileText',
      color: 'text-primary'
    },
    {
      id: 'active',
      label: 'Active Reports',
      value: activeReports,
      change: '-5%',
      changeType: 'negative',
      icon: 'Clock',
      color: 'text-warning'
    },
    {
      id: 'completed',
      label: 'Completed Today',
      value: completedToday,
      change: '+8%',
      changeType: 'positive',
      icon: 'CheckCircle',
      color: 'text-success'
    },
    {
      id: 'resolution',
      label: 'Avg Resolution Time',
      value: `${avgResolutionTime}d`,
      change: '-0.3d',
      changeType: 'positive',
      icon: 'Timer',
      color: 'text-accent'
    },
    {
      id: 'sla',
      label: 'SLA Compliance',
      value: `${slaCompliance}%`,
      change: '+2%',
      changeType: 'positive',
      icon: 'Target',
      color: 'text-success'
    }
  ];

  const priorityDistribution = [
    { level: 'Critical', count: reports?.filter(r => r?.priority === 5)?.length, color: 'bg-error' },
    { level: 'High', count: reports?.filter(r => r?.priority === 4)?.length, color: 'bg-warning' },
    { level: 'Medium', count: reports?.filter(r => r?.priority === 3)?.length, color: 'bg-primary' },
    { level: 'Low', count: reports?.filter(r => r?.priority <= 2)?.length, color: 'bg-success' }
  ];

  const departmentPerformance = [
    { name: 'Public Works', resolved: 45, pending: 12, efficiency: 89 },
    { name: 'Utilities', resolved: 32, pending: 8, efficiency: 92 },
    { name: 'Parks & Recreation', resolved: 28, pending: 15, efficiency: 76 },
    { name: 'Transportation', resolved: 38, pending: 9, efficiency: 85 }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {metrics?.map(metric => (
          <div key={metric?.id} className="bg-card border border-border rounded-lg p-4 civic-shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg bg-muted ${metric?.color}`}>
                <Icon name={metric?.icon} size={16} />
              </div>
              <span className={`text-xs font-medium ${
                metric?.changeType === 'positive' ? 'text-success' : 'text-error'
              }`}>
                {metric?.change}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-card-foreground">{metric?.value}</p>
              <p className="text-sm text-muted-foreground">{metric?.label}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Priority Distribution */}
      <div className="bg-card border border-border rounded-lg p-6 civic-shadow-sm">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Priority Distribution</h3>
        <div className="space-y-3">
          {priorityDistribution?.map(priority => {
            const percentage = totalReports > 0 ? (priority?.count / totalReports) * 100 : 0;
            return (
              <div key={priority?.level} className="flex items-center space-x-3">
                <div className="w-16 text-sm font-medium text-muted-foreground">
                  {priority?.level}
                </div>
                <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full ${priority?.color} civic-transition`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="w-12 text-sm font-medium text-card-foreground text-right">
                  {priority?.count}
                </div>
                <div className="w-12 text-xs text-muted-foreground text-right">
                  {percentage?.toFixed(0)}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Department Performance */}
      <div className="bg-card border border-border rounded-lg p-6 civic-shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Department Performance</h3>
          <button className="text-sm text-primary hover:text-primary/80 civic-transition">
            View Details
          </button>
        </div>
        <div className="space-y-4">
          {departmentPerformance?.map(dept => (
            <div key={dept?.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-card-foreground">{dept?.name}</p>
                  <span className={`text-sm font-medium ${
                    dept?.efficiency >= 90 ? 'text-success' : 
                    dept?.efficiency >= 80 ? 'text-warning' : 'text-error'
                  }`}>
                    {dept?.efficiency}%
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Icon name="CheckCircle" size={12} className="text-success" />
                    <span>{dept?.resolved} resolved</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} className="text-warning" />
                    <span>{dept?.pending} pending</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg p-6 civic-shadow-sm">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'Report #CR-2025-156 assigned to John Smith', time: '2 minutes ago', type: 'assignment' },
            { action: 'Pothole repair completed on Main St', time: '15 minutes ago', type: 'completion' },
            { action: 'New urgent report: Water main break', time: '32 minutes ago', type: 'urgent' },
            { action: 'Bulk update: 5 reports marked as in progress', time: '1 hour ago', type: 'bulk' }
          ]?.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 py-2">
              <div className={`w-2 h-2 rounded-full ${
                activity?.type === 'urgent' ? 'bg-error' :
                activity?.type === 'completion' ? 'bg-success' :
                activity?.type === 'assignment' ? 'bg-primary' : 'bg-secondary'
              }`} />
              <div className="flex-1">
                <p className="text-sm text-card-foreground">{activity?.action}</p>
                <p className="text-xs text-muted-foreground">{activity?.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MetricsPanel;