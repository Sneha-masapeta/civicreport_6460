import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeatmapVisualization = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock heatmap data representing different city areas
  const heatmapData = [
    { id: 1, area: 'Downtown', x: 2, y: 1, intensity: 85, reports: 156, category: 'High Density' },
    { id: 2, area: 'Financial District', x: 3, y: 1, intensity: 72, reports: 134, category: 'High Density' },
    { id: 3, area: 'Arts Quarter', x: 1, y: 1, intensity: 45, reports: 78, category: 'Medium Density' },
    { id: 4, area: 'Riverside', x: 0, y: 2, intensity: 38, reports: 67, category: 'Medium Density' },
    { id: 5, area: 'Industrial Zone', x: 4, y: 2, intensity: 91, reports: 189, category: 'High Density' },
    { id: 6, area: 'Suburban North', x: 1, y: 0, intensity: 23, reports: 43, category: 'Low Density' },
    { id: 7, area: 'Suburban South', x: 3, y: 3, intensity: 29, reports: 52, category: 'Low Density' },
    { id: 8, area: 'University District', x: 0, y: 1, intensity: 56, reports: 98, category: 'Medium Density' },
    { id: 9, area: 'Historic Quarter', x: 2, y: 2, intensity: 67, reports: 123, category: 'High Density' },
    { id: 10, area: 'Tech Park', x: 4, y: 0, intensity: 41, reports: 71, category: 'Medium Density' },
    { id: 11, area: 'Residential East', x: 4, y: 3, intensity: 34, reports: 59, category: 'Low Density' },
    { id: 12, area: 'Residential West', x: 0, y: 3, intensity: 28, reports: 48, category: 'Low Density' }
  ];

  const timeframes = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const categories = [
    { value: 'all', label: 'All Issues' },
    { value: 'potholes', label: 'Potholes' },
    { value: 'streetlights', label: 'Street Lights' },
    { value: 'trash', label: 'Trash & Waste' },
    { value: 'utilities', label: 'Utilities' }
  ];

  const getIntensityColor = (intensity) => {
    if (intensity >= 80) return 'bg-error';
    if (intensity >= 60) return 'bg-warning';
    if (intensity >= 40) return 'bg-accent';
    if (intensity >= 20) return 'bg-primary';
    return 'bg-muted';
  };

  const getIntensityOpacity = (intensity) => {
    const opacity = Math.max(0.3, intensity / 100);
    return { opacity };
  };

  const topAreas = heatmapData?.sort((a, b) => b?.intensity - a?.intensity)?.slice(0, 5);

  return (
    <div className="bg-card border border-border rounded-lg p-6 civic-shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-error/10 rounded-lg">
            <Icon name="Map" size={20} className="text-error" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Issue Density Heatmap</h3>
            <p className="text-sm text-muted-foreground">Geographic distribution of reported issues</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            {timeframes?.map((timeframe) => (
              <Button
                key={timeframe?.value}
                variant={selectedTimeframe === timeframe?.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTimeframe(timeframe?.value)}
              >
                {timeframe?.label}
              </Button>
            ))}
          </div>
          
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
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Heatmap Grid */}
        <div className="lg:col-span-2">
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="grid grid-cols-5 gap-2 h-64">
              {Array.from({ length: 20 }, (_, index) => {
                const x = index % 5;
                const y = Math.floor(index / 5);
                const areaData = heatmapData?.find(area => area?.x === x && area?.y === y);
                
                return (
                  <div
                    key={index}
                    className={`rounded-lg border border-border flex items-center justify-center cursor-pointer civic-transition hover:scale-105 ${
                      areaData ? getIntensityColor(areaData?.intensity) : 'bg-background'
                    }`}
                    style={areaData ? getIntensityOpacity(areaData?.intensity) : {}}
                    title={areaData ? `${areaData?.area}: ${areaData?.reports} reports` : 'No data'}
                  >
                    {areaData && (
                      <div className="text-center text-white text-xs font-medium p-1">
                        <div className="truncate">{areaData?.area?.split(' ')?.[0]}</div>
                        <div>{areaData?.reports}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Low</span>
                <div className="flex space-x-1">
                  <div className="w-4 h-4 bg-muted rounded opacity-30"></div>
                  <div className="w-4 h-4 bg-primary rounded opacity-50"></div>
                  <div className="w-4 h-4 bg-accent rounded opacity-70"></div>
                  <div className="w-4 h-4 bg-warning rounded opacity-85"></div>
                  <div className="w-4 h-4 bg-error rounded"></div>
                </div>
                <span className="text-sm text-muted-foreground">High</span>
              </div>
            </div>
          </div>

          {/* Interactive Map Placeholder */}
          <div className="mt-4 bg-muted/30 rounded-lg p-4 h-48 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Icon name="MapPin" size={48} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">Interactive city map would be integrated here</p>
              <p className="text-xs">Click areas for detailed breakdown</p>
            </div>
          </div>
        </div>

        {/* Top Areas List */}
        <div className="space-y-4">
          <h4 className="font-medium text-card-foreground">Highest Density Areas</h4>
          <div className="space-y-3">
            {topAreas?.map((area, index) => (
              <div key={area?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded text-xs font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{area?.area}</p>
                    <p className="text-xs text-muted-foreground">{area?.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-card-foreground">{area?.reports}</p>
                  <p className="text-xs text-muted-foreground">reports</p>
                </div>
              </div>
            ))}
          </div>

          {/* Temporal Analysis */}
          <div className="mt-6 space-y-3">
            <h4 className="font-medium text-card-foreground">Temporal Patterns</h4>
            
            <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Clock" size={14} className="text-primary" />
                <span className="text-sm font-medium text-card-foreground">Peak Hours</span>
              </div>
              <p className="text-xs text-muted-foreground">8-10 AM, 5-7 PM</p>
            </div>

            <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Calendar" size={14} className="text-accent" />
                <span className="text-sm font-medium text-card-foreground">Peak Days</span>
              </div>
              <p className="text-xs text-muted-foreground">Monday, Wednesday</p>
            </div>

            <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Sun" size={14} className="text-warning" />
                <span className="text-sm font-medium text-card-foreground">Seasonal</span>
              </div>
              <p className="text-xs text-muted-foreground">Spring peak activity</p>
            </div>
          </div>
        </div>
      </div>
      {/* Summary Statistics */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-xl font-bold text-error">3</p>
          <p className="text-sm text-muted-foreground">Critical Areas</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-warning">7</p>
          <p className="text-sm text-muted-foreground">Moderate Areas</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-success">12</p>
          <p className="text-sm text-muted-foreground">Low Activity Areas</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-primary">1,234</p>
          <p className="text-sm text-muted-foreground">Total Reports</p>
        </div>
      </div>
    </div>
  );
};

export default HeatmapVisualization;