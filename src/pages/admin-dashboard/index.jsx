import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MapView from './components/MapView';
import MetricsPanel from './components/MetricsPanel';
import FilterToolbar from './components/FilterToolbar';
import ReportsList from './components/ReportsList';
import QuickActions from './components/QuickActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('map'); // map, list, metrics
  const [selectedReports, setSelectedReports] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    priority: 'all',
    department: 'all',
    dateRange: '7d',
    searchQuery: ''
  });

  // Mock reports data
  const [reports] = useState([
    {
      id: 'CR-2025-001',
      category: 'Infrastructure',
      status: 'in_progress',
      priority: 4,
      description: 'Large pothole on Main Street causing traffic issues and potential vehicle damage',
      location: {
        address: '123 Main Street, Cityname, ST 12345',
        coordinates: { lat: 40.7128, lng: -74.0060 }
      },
      citizenName: 'Sarah Johnson',
      assignedTo: 'John Smith - Public Works',
      createdAt: '2025-01-06T10:30:00Z',
      updatedAt: '2025-01-06T14:20:00Z',
      duplicateCount: 3
    },
    {
      id: 'CR-2025-002',
      category: 'Safety',
      status: 'assigned',
      priority: 5,
      description: 'Broken streetlight creating dangerous intersection conditions at night',
      location: {
        address: '456 Oak Avenue, Cityname, ST 12345',
        coordinates: { lat: 40.7589, lng: -73.9851 }
      },
      citizenName: 'Michael Chen',
      assignedTo: 'Electric Crew #2',
      createdAt: '2025-01-06T08:15:00Z',
      updatedAt: '2025-01-06T12:45:00Z',
      duplicateCount: 1
    },
    {
      id: 'CR-2025-003',
      category: 'Environment',
      status: 'under_review',
      priority: 2,
      description: 'Overflowing trash bin in Central Park needs attention',
      location: {
        address: '789 Park Drive, Cityname, ST 12345',
        coordinates: { lat: 40.7505, lng: -73.9934 }
      },
      citizenName: 'Emily Rodriguez',
      assignedTo: null,
      createdAt: '2025-01-06T07:20:00Z',
      updatedAt: '2025-01-06T09:10:00Z',
      duplicateCount: 1
    },
    {
      id: 'CR-2025-004',
      category: 'Utilities',
      status: 'completed',
      priority: 3,
      description: 'Water pressure issues reported in residential area',
      location: {
        address: '321 Elm Street, Cityname, ST 12345',
        coordinates: { lat: 40.7282, lng: -74.0776 }
      },
      citizenName: 'David Wilson',
      assignedTo: 'Water Department',
      createdAt: '2025-01-05T16:45:00Z',
      updatedAt: '2025-01-06T11:30:00Z',
      duplicateCount: 2
    },
    {
      id: 'CR-2025-005',
      category: 'Infrastructure',
      status: 'submitted',
      priority: 3,
      description: 'Sidewalk crack creating pedestrian hazard near school zone',
      location: {
        address: '654 School Lane, Cityname, ST 12345',
        coordinates: { lat: 40.7614, lng: -73.9776 }
      },
      citizenName: 'Lisa Thompson',
      assignedTo: null,
      createdAt: '2025-01-06T13:15:00Z',
      updatedAt: '2025-01-06T13:15:00Z',
      duplicateCount: 1
    }
  ]);

  const filteredReports = reports?.filter(report => {
    if (filters?.category !== 'all' && report?.category?.toLowerCase() !== filters?.category) return false;
    if (filters?.status !== 'all' && report?.status !== filters?.status) return false;
    if (filters?.priority !== 'all' && report?.priority?.toString() !== filters?.priority) return false;
    if (filters?.searchQuery && !report?.description?.toLowerCase()?.includes(filters?.searchQuery?.toLowerCase()) && 
        !report?.id?.toLowerCase()?.includes(filters?.searchQuery?.toLowerCase()) &&
        !report?.location?.address?.toLowerCase()?.includes(filters?.searchQuery?.toLowerCase())) return false;
    return true;
  });

  const reportCounts = {
    total: reports?.length,
    infrastructure: reports?.filter(r => r?.category?.toLowerCase() === 'infrastructure')?.length,
    safety: reports?.filter(r => r?.category?.toLowerCase() === 'safety')?.length,
    environment: reports?.filter(r => r?.category?.toLowerCase() === 'environment')?.length,
    utilities: reports?.filter(r => r?.category?.toLowerCase() === 'utilities')?.length
  };

  const urgentReports = reports?.filter(r => r?.priority >= 4);
  const overdueReports = reports?.filter(r => {
    const daysSinceCreated = (new Date() - new Date(r.createdAt)) / (1000 * 60 * 60 * 24);
    return daysSinceCreated > 3 && !['completed', 'closed']?.includes(r?.status);
  });

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleReportSelect = (report) => {
    navigate(`/report-management?id=${report?.id}`);
  };

  const handleClusterClick = (cluster) => {
    console.log('Cluster clicked:', cluster);
    // Handle cluster expansion or navigation
  };

  const handleBulkAction = (action, reportIds) => {
    console.log('Bulk action:', action, reportIds);
    // Handle bulk operations
  };

  const handleQuickAction = (action, data) => {
    switch (action) {
      case 'bulk_assign': console.log('Opening bulk assignment modal');
        break;
      case 'priority_review':
        setFilters(prev => ({ ...prev, priority: '4' }));
        setActiveView('list');
        break;
      case 'sla_alerts':
        setFilters(prev => ({ ...prev, status: 'assigned' }));
        setActiveView('list');
        break;
      case 'analytics': navigate('/analytics-dashboard');
        break;
      case 'export_data':
        console.log('Exporting data with current filters');
        break;
      default:
        console.log('Quick action:', action, data);
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={toggleSidebar}
      />
      {/* Main Content */}
      <div className={`civic-transition ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        {/* Header */}
        <Header userRole="admin" />

        {/* Dashboard Content */}
        <main className="p-4 lg:p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Municipal issue management and monitoring center
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={activeView === 'map' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveView('map')}
                iconName="Map"
                iconPosition="left"
              >
                Map View
              </Button>
              <Button
                variant={activeView === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveView('list')}
                iconName="List"
                iconPosition="left"
              >
                List View
              </Button>
              <Button
                variant={activeView === 'metrics' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveView('metrics')}
                iconName="BarChart3"
                iconPosition="left"
              >
                Metrics
              </Button>
            </div>
          </div>

          {/* Filter Toolbar */}
          <FilterToolbar
            onFiltersChange={handleFiltersChange}
            reportCounts={reportCounts}
            onBulkAction={handleBulkAction}
          />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Primary Content Area */}
            <div className="xl:col-span-3 space-y-6">
              {activeView === 'map' && (
                <div className="h-[600px]">
                  <MapView
                    reports={filteredReports}
                    selectedFilters={filters}
                    onReportSelect={handleReportSelect}
                    onClusterClick={handleClusterClick}
                  />
                </div>
              )}

              {activeView === 'list' && (
                <ReportsList
                  reports={filteredReports}
                  onReportSelect={handleReportSelect}
                  selectedReports={selectedReports}
                  onSelectionChange={setSelectedReports}
                />
              )}

              {activeView === 'metrics' && (
                <MetricsPanel reports={filteredReports} />
              )}

              {/* Summary Stats - Always Visible */}
              {activeView !== 'metrics' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-card border border-border rounded-lg p-4 civic-shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon name="FileText" size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-card-foreground">{filteredReports?.length}</p>
                        <p className="text-sm text-muted-foreground">Filtered Reports</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-4 civic-shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-error/10 rounded-lg">
                        <Icon name="AlertTriangle" size={20} className="text-error" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-card-foreground">{urgentReports?.length}</p>
                        <p className="text-sm text-muted-foreground">Urgent Reports</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-4 civic-shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-warning/10 rounded-lg">
                        <Icon name="Clock" size={20} className="text-warning" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-card-foreground">{overdueReports?.length}</p>
                        <p className="text-sm text-muted-foreground">Overdue</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-4 civic-shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-success/10 rounded-lg">
                        <Icon name="CheckCircle" size={20} className="text-success" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-card-foreground">
                          {reports?.filter(r => r?.status === 'completed')?.length}
                        </p>
                        <p className="text-sm text-muted-foreground">Completed</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Content */}
            <div className="xl:col-span-1">
              <QuickActions
                onActionClick={handleQuickAction}
                urgentReports={urgentReports}
                overdueReports={overdueReports}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;