import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../components/ui/Sidebar';
import MetricsOverview from './components/MetricsOverview';
import ResolutionTimeChart from './components/ResolutionTimeChart';
import DepartmentPerformance from './components/DepartmentPerformance';
import TrendAnalysis from './components/TrendAnalysis';
import HeatmapVisualization from './components/HeatmapVisualization';
import ExportControls from './components/ExportControls';
import FilterControls from './components/FilterControls';

const AnalyticsDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filters, setFilters] = useState({});

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // Apply filters to all components
    console.log('Filters updated:', newFilters);
  };

  return (
    <>
      <Helmet>
        <title>Analytics Dashboard - CivicReport</title>
        <meta name="description" content="Comprehensive performance insights and trend analysis for municipal issue reporting and management." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        
        <main className={`civic-transition ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
          <div className="p-4 lg:p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Analytics Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Comprehensive performance insights and strategic decision-making tools
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">Last Updated</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date()?.toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Filter Controls */}
            <FilterControls onFiltersChange={handleFiltersChange} />

            {/* Key Performance Metrics */}
            <MetricsOverview />

            {/* Charts and Analysis Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <ResolutionTimeChart />
              <DepartmentPerformance />
            </div>

            {/* Trend Analysis */}
            <TrendAnalysis />

            {/* Heatmap Visualization */}
            <HeatmapVisualization />

            {/* Export Controls */}
            <ExportControls />

            {/* Footer */}
            <div className="text-center py-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                CivicReport Analytics Dashboard &copy; {new Date()?.getFullYear()} Municipal Services
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Real-time data synchronization • Advanced filtering • Automated reporting
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AnalyticsDashboard;