import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryMetrics = ({ metrics }) => {
  const metricCards = [
    {
      title: 'Total Submissions',
      value: metrics?.totalSubmissions,
      icon: 'FileText',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Resolved Issues',
      value: metrics?.resolvedIssues,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'In Progress',
      value: metrics?.inProgress,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Avg. Resolution Time',
      value: `${metrics?.avgResolutionTime} days`,
      icon: 'TrendingUp',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metricCards?.map((metric, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4 civic-shadow-sm">
          <div className="flex items-center space-x-3">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${metric?.bgColor}`}>
              <Icon name={metric?.icon} size={20} className={metric?.color} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">{metric?.title}</p>
              <p className="text-xl font-semibold text-card-foreground">{metric?.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryMetrics;