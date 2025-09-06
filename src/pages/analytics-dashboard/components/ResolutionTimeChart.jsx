import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResolutionTimeChart = () => {
  const [timeRange, setTimeRange] = useState('6months');

  const data = [
    { month: 'Apr', avgDays: 5.2, targetDays: 4.0, completedReports: 234 },
    { month: 'May', avgDays: 4.8, targetDays: 4.0, completedReports: 267 },
    { month: 'Jun', avgDays: 4.5, targetDays: 4.0, completedReports: 298 },
    { month: 'Jul', avgDays: 4.1, targetDays: 4.0, completedReports: 312 },
    { month: 'Aug', avgDays: 3.9, targetDays: 4.0, completedReports: 289 },
    { month: 'Sep', avgDays: 4.2, targetDays: 4.0, completedReports: 276 }
  ];

  const timeRangeOptions = [
    { value: '3months', label: '3 Months' },
    { value: '6months', label: '6 Months' },
    { value: '1year', label: '1 Year' },
    { value: '2years', label: '2 Years' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 civic-shadow-md">
          <p className="font-medium text-popover-foreground mb-2">{`${label} 2024`}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="inline-block w-3 h-3 bg-primary rounded mr-2"></span>
              Average: {payload?.[0]?.value} days
            </p>
            <p className="text-sm">
              <span className="inline-block w-3 h-3 bg-accent rounded mr-2"></span>
              Target: {payload?.[1]?.value} days
            </p>
            <p className="text-sm text-muted-foreground">
              Reports completed: {payload?.[0]?.payload?.completedReports}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 civic-shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="BarChart3" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Resolution Time Trends</h3>
            <p className="text-sm text-muted-foreground">Average days to complete reports</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {timeRangeOptions?.map((option) => (
            <Button
              key={option?.value}
              variant={timeRange === option?.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(option?.value)}
            >
              {option?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              label={{ value: 'Days', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="avgDays" 
              fill="hsl(var(--primary))" 
              name="Average Resolution Time"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="targetDays" 
              fill="hsl(var(--accent))" 
              name="Target Time"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-bold text-success">12%</p>
          <p className="text-sm text-muted-foreground">Improvement vs last period</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-card-foreground">4.2</p>
          <p className="text-sm text-muted-foreground">Current average (days)</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">89%</p>
          <p className="text-sm text-muted-foreground">Reports within target</p>
        </div>
      </div>
    </div>
  );
};

export default ResolutionTimeChart;