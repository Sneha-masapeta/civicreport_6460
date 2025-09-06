import React, { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrendAnalysis = () => {
  const [analysisType, setAnalysisType] = useState('seasonal');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const seasonalData = [
    { month: 'Jan', potholes: 45, streetlights: 23, trash: 18, utilities: 12, parks: 8 },
    { month: 'Feb', potholes: 52, streetlights: 28, trash: 22, utilities: 15, parks: 11 },
    { month: 'Mar', potholes: 78, streetlights: 34, trash: 29, utilities: 21, parks: 19 },
    { month: 'Apr', potholes: 95, streetlights: 41, trash: 35, utilities: 28, parks: 25 },
    { month: 'May', potholes: 112, streetlights: 38, trash: 42, utilities: 31, parks: 34 },
    { month: 'Jun', potholes: 89, streetlights: 45, trash: 38, utilities: 25, parks: 41 },
    { month: 'Jul', potholes: 67, streetlights: 52, trash: 31, utilities: 19, parks: 38 },
    { month: 'Aug', potholes: 71, streetlights: 48, trash: 28, utilities: 22, parks: 35 },
    { month: 'Sep', potholes: 84, streetlights: 39, trash: 33, utilities: 27, parks: 29 }
  ];

  const emergingData = [
    { area: 'Downtown District', trend: 'increasing', change: '+34%', reports: 156, category: 'Potholes' },
    { area: 'Riverside Park', trend: 'increasing', change: '+28%', reports: 89, category: 'Parks' },
    { area: 'Industrial Zone', trend: 'stable', change: '+2%', reports: 67, category: 'Utilities' },
    { area: 'Suburban North', trend: 'decreasing', change: '-15%', reports: 43, category: 'Streetlights' },
    { area: 'Historic Quarter', trend: 'increasing', change: '+19%', reports: 78, category: 'Trash' }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'potholes', label: 'Potholes' },
    { value: 'streetlights', label: 'Street Lights' },
    { value: 'trash', label: 'Trash & Waste' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'parks', label: 'Parks & Recreation' }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing':
        return 'TrendingUp';
      case 'decreasing':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'increasing':
        return 'text-error';
      case 'decreasing':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

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
                {entry?.name}: {entry?.value} reports
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 civic-shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-lg">
            <Icon name="TrendingUp" size={20} className="text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Trend Analysis</h3>
            <p className="text-sm text-muted-foreground">Seasonal patterns and emerging problem areas</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant={analysisType === 'seasonal' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setAnalysisType('seasonal')}
            >
              Seasonal
            </Button>
            <Button
              variant={analysisType === 'emerging' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setAnalysisType('emerging')}
            >
              Emerging Areas
            </Button>
          </div>
          
          {analysisType === 'seasonal' && (
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e?.target?.value)}
              className="px-3 py-1 text-sm border border-border rounded-md bg-background text-foreground"
            >
              {categories?.map((category) => (
                <option key={category?.value} value={category?.value}>
                  {category?.label}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
      {analysisType === 'seasonal' ? (
        <div className="space-y-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={seasonalData}>
                <defs>
                  <linearGradient id="colorPotholes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorStreetlights" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTrash" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--warning))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--warning))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  label={{ value: 'Reports', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {(selectedCategory === 'all' || selectedCategory === 'potholes') && (
                  <Area
                    type="monotone"
                    dataKey="potholes"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorPotholes)"
                    name="Potholes"
                  />
                )}
                {(selectedCategory === 'all' || selectedCategory === 'streetlights') && (
                  <Area
                    type="monotone"
                    dataKey="streetlights"
                    stroke="hsl(var(--accent))"
                    fillOpacity={1}
                    fill="url(#colorStreetlights)"
                    name="Street Lights"
                  />
                )}
                {(selectedCategory === 'all' || selectedCategory === 'trash') && (
                  <Area
                    type="monotone"
                    dataKey="trash"
                    stroke="hsl(var(--warning))"
                    fillOpacity={1}
                    fill="url(#colorTrash)"
                    name="Trash & Waste"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Calendar" size={16} className="text-primary" />
                <h4 className="font-medium text-card-foreground">Peak Season</h4>
              </div>
              <p className="text-2xl font-bold text-card-foreground">April - May</p>
              <p className="text-sm text-muted-foreground">Highest report volume</p>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Activity" size={16} className="text-accent" />
                <h4 className="font-medium text-card-foreground">Growth Rate</h4>
              </div>
              <p className="text-2xl font-bold text-success">+23%</p>
              <p className="text-sm text-muted-foreground">Year over year</p>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Target" size={16} className="text-warning" />
                <h4 className="font-medium text-card-foreground">Forecast</h4>
              </div>
              <p className="text-2xl font-bold text-card-foreground">+15%</p>
              <p className="text-sm text-muted-foreground">Next quarter</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-card-foreground">Emerging Problem Areas</h4>
              <div className="space-y-3">
                {emergingData?.map((area, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h5 className="font-medium text-card-foreground">{area?.area}</h5>
                        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                          {area?.category}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{area?.reports} reports this month</p>
                    </div>
                    <div className={`flex items-center space-x-2 ${getTrendColor(area?.trend)}`}>
                      <Icon name={getTrendIcon(area?.trend)} size={16} />
                      <span className="font-medium">{area?.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-card-foreground">Predictive Insights</h4>
              <div className="space-y-4">
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="AlertTriangle" size={16} className="text-warning" />
                    <h5 className="font-medium text-card-foreground">High Risk Alert</h5>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Downtown District showing 34% increase in pothole reports. 
                    Recommend proactive road maintenance before winter season.
                  </p>
                </div>

                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Lightbulb" size={16} className="text-primary" />
                    <h5 className="font-medium text-card-foreground">Resource Optimization</h5>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Parks & Recreation showing seasonal uptick. Consider temporary 
                    staff allocation for summer maintenance period.
                  </p>
                </div>

                <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <h5 className="font-medium text-card-foreground">Positive Trend</h5>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Suburban North showing 15% decrease in streetlight issues. 
                    Recent LED upgrade program showing positive results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendAnalysis;