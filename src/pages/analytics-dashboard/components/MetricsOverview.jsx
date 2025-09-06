import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsOverview = () => {
  const metrics = [
    {
      id: 1,
      title: "Average Resolution Time",
      value: "4.2 days",
      change: "-12%",
      changeType: "improvement",
      icon: "Clock",
      description: "Compared to last month"
    },
    {
      id: 2,
      title: "Citizen Satisfaction",
      value: "87.3%",
      change: "+5.1%",
      changeType: "improvement",
      icon: "Heart",
      description: "Based on feedback surveys"
    },
    {
      id: 3,
      title: "Active Reports",
      value: "1,247",
      change: "+23",
      changeType: "neutral",
      icon: "FileText",
      description: "Currently in progress"
    },
    {
      id: 4,
      title: "Completion Rate",
      value: "94.8%",
      change: "+2.3%",
      changeType: "improvement",
      icon: "CheckCircle",
      description: "This month"
    },
    {
      id: 5,
      title: "Repeat Issues",
      value: "8.7%",
      change: "-1.2%",
      changeType: "improvement",
      icon: "RotateCcw",
      description: "Same location reports"
    },
    {
      id: 6,
      title: "Resource Utilization",
      value: "78.5%",
      change: "+4.8%",
      changeType: "improvement",
      icon: "Users",
      description: "Staff efficiency"
    }
  ];

  const getChangeColor = (changeType) => {
    switch (changeType) {
      case 'improvement':
        return 'text-success';
      case 'decline':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getChangeIcon = (changeType) => {
    switch (changeType) {
      case 'improvement':
        return 'TrendingUp';
      case 'decline':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics?.map((metric) => (
        <div key={metric?.id} className="bg-card border border-border rounded-lg p-6 civic-shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
              <Icon name={metric?.icon} size={24} className="text-primary" />
            </div>
            <div className={`flex items-center space-x-1 ${getChangeColor(metric?.changeType)}`}>
              <Icon name={getChangeIcon(metric?.changeType)} size={16} />
              <span className="text-sm font-medium">{metric?.change}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">{metric?.title}</h3>
            <p className="text-2xl font-bold text-card-foreground">{metric?.value}</p>
            <p className="text-xs text-muted-foreground">{metric?.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsOverview;