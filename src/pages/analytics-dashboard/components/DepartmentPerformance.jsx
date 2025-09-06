import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DepartmentPerformance = () => {
  const [viewType, setViewType] = useState('workload');

  const departmentData = [
    {
      department: 'Public Works',
      activeReports: 342,
      completedReports: 1247,
      avgResolutionTime: 3.8,
      satisfactionScore: 89.2,
      efficiency: 94.5,
      color: '#2563EB'
    },
    {
      department: 'Transportation',
      activeReports: 189,
      completedReports: 876,
      avgResolutionTime: 4.2,
      satisfactionScore: 87.1,
      efficiency: 91.3,
      color: '#059669'
    },
    {
      department: 'Parks & Recreation',
      activeReports: 156,
      completedReports: 623,
      avgResolutionTime: 2.9,
      satisfactionScore: 92.4,
      efficiency: 96.8,
      color: '#DC2626'
    },
    {
      department: 'Utilities',
      activeReports: 234,
      completedReports: 945,
      avgResolutionTime: 5.1,
      satisfactionScore: 85.7,
      efficiency: 88.9,
      color: '#7C3AED'
    },
    {
      department: 'Environmental',
      activeReports: 98,
      completedReports: 412,
      avgResolutionTime: 3.2,
      satisfactionScore: 90.8,
      efficiency: 93.2,
      color: '#EA580C'
    }
  ];

  const workloadData = departmentData?.map(dept => ({
    name: dept?.department?.split(' ')?.[0],
    active: dept?.activeReports,
    completed: dept?.completedReports
  }));

  const performanceData = departmentData?.map(dept => ({
    name: dept?.department?.split(' ')?.[0],
    satisfaction: dept?.satisfactionScore,
    efficiency: dept?.efficiency,
    avgTime: dept?.avgResolutionTime
  }));

  const pieData = departmentData?.map(dept => ({
    name: dept?.department,
    value: dept?.activeReports,
    color: dept?.color
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 civic-shadow-md">
          <p className="font-medium text-popover-foreground mb-2">{label}</p>
          <div className="space-y-1">
            {payload?.map((entry, index) => (
              <p key={index} className="text-sm">
                <span 
                  className="inline-block w-3 h-3 rounded mr-2"
                  style={{ backgroundColor: entry?.color }}
                ></span>
                {entry?.name}: {entry?.value}
                {entry?.dataKey === 'avgTime' && ' days'}
                {(entry?.dataKey === 'satisfaction' || entry?.dataKey === 'efficiency') && '%'}
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 civic-shadow-md">
          <p className="font-medium text-popover-foreground">{payload?.[0]?.name}</p>
          <p className="text-sm text-muted-foreground">
            Active Reports: {payload?.[0]?.value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 civic-shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
            <Icon name="Users" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Department Performance</h3>
            <p className="text-sm text-muted-foreground">Workload distribution and efficiency metrics</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewType === 'workload' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewType('workload')}
          >
            Workload
          </Button>
          <Button
            variant={viewType === 'performance' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewType('performance')}
          >
            Performance
          </Button>
          <Button
            variant={viewType === 'distribution' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewType('distribution')}
          >
            Distribution
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Area */}
        <div className="lg:col-span-2">
          <div className="h-80">
            {viewType === 'distribution' ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) => `${name?.split(' ')?.[0]} ${(percent * 100)?.toFixed(0)}%`}
                  >
                    {pieData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={viewType === 'workload' ? workloadData : performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  {viewType === 'workload' ? (
                    <>
                      <Bar dataKey="active" fill="hsl(var(--warning))" name="Active Reports" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="completed" fill="hsl(var(--success))" name="Completed Reports" radius={[4, 4, 0, 0]} />
                    </>
                  ) : (
                    <>
                      <Bar dataKey="satisfaction" fill="hsl(var(--primary))" name="Satisfaction %" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="efficiency" fill="hsl(var(--accent))" name="Efficiency %" radius={[4, 4, 0, 0]} />
                    </>
                  )}
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Department Stats */}
        <div className="space-y-4">
          <h4 className="font-medium text-card-foreground">Department Rankings</h4>
          <div className="space-y-3">
            {departmentData?.sort((a, b) => b?.efficiency - a?.efficiency)?.map((dept, index) => (
                <div key={dept?.department} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded text-xs font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-card-foreground">{dept?.department}</p>
                      <p className="text-xs text-muted-foreground">{dept?.efficiency}% efficiency</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-card-foreground">{dept?.activeReports}</p>
                    <p className="text-xs text-muted-foreground">active</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-xl font-bold text-card-foreground">1,019</p>
          <p className="text-sm text-muted-foreground">Total Active</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-success">4,103</p>
          <p className="text-sm text-muted-foreground">Total Completed</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-primary">89.0%</p>
          <p className="text-sm text-muted-foreground">Avg Satisfaction</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-accent">92.9%</p>
          <p className="text-sm text-muted-foreground">Avg Efficiency</p>
        </div>
      </div>
    </div>
  );
};

export default DepartmentPerformance;