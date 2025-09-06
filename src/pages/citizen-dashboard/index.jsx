import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';

import SummaryMetrics from './components/SummaryMetrics';
import FilterControls from './components/FilterControls';
import ReportsList from './components/ReportsList';
import NotificationPanel from './components/NotificationPanel';

const CitizenDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    priority: 'all',
    sortBy: 'newest',
    dateRange: {
      start: '',
      end: ''
    }
  });

  // Mock data
  const mockReports = [
    {
      id: 'CR-2025-001',
      title: 'Large pothole on Main Street',
      category: 'road_maintenance',
      status: 'in_progress',
      priority: 'high',
      location: '123 Main Street',
      submittedDate: '2025-01-05T10:30:00Z',
      thumbnail: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Deep pothole causing vehicle damage near the intersection'
    },
    {
      id: 'CR-2025-002',
      title: 'Broken streetlight on Oak Avenue',
      category: 'street_lighting',
      status: 'assigned',
      priority: 'medium',
      location: '456 Oak Avenue',
      submittedDate: '2025-01-04T14:15:00Z',
      thumbnail: 'https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Street light has been out for 3 days, creating safety concerns'
    },
    {
      id: 'CR-2025-003',
      title: 'Overflowing trash bin at City Park',
      category: 'waste_management',
      status: 'completed',
      priority: 'low',
      location: 'City Park, Elm Street',
      submittedDate: '2025-01-03T09:45:00Z',
      thumbnail: 'https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Trash bin overflowing with garbage scattered around'
    },
    {
      id: 'CR-2025-004',
      title: 'Water leak on Pine Street',
      category: 'water_sewer',
      status: 'under_review',
      priority: 'high',
      location: '789 Pine Street',
      submittedDate: '2025-01-02T16:20:00Z',
      thumbnail: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Water main leak causing flooding on the sidewalk'
    },
    {
      id: 'CR-2025-005',
      title: 'Damaged park bench',
      category: 'parks_recreation',
      status: 'submitted',
      priority: 'low',
      location: 'Riverside Park',
      submittedDate: '2025-01-01T11:10:00Z',
      thumbnail: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Park bench has broken slats and needs repair'
    }
  ];

  const mockNotifications = [
    {
      id: 1,
      type: 'status_update',
      title: 'Report Status Updated',
      message: 'Your pothole report #CR-2025-001 has been assigned to field crew and work will begin tomorrow.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
      details: {
        reportId: 'CR-2025-001',
        status: 'in_progress',
        location: '123 Main Street'
      }
    },
    {
      id: 2,
      type: 'completion',
      title: 'Issue Resolved',
      message: 'Your trash bin report #CR-2025-003 has been completed. The area has been cleaned and the bin emptied.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      details: {
        reportId: 'CR-2025-003',
        status: 'completed',
        location: 'City Park, Elm Street'
      }
    },
    {
      id: 3,
      type: 'assignment',
      title: 'Report Under Review',
      message: 'Your water leak report #CR-2025-004 is being reviewed by our engineering team.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: true,
      details: {
        reportId: 'CR-2025-004',
        status: 'under_review',
        location: '789 Pine Street'
      }
    }
  ];

  // Initialize data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setReports(mockReports);
      setFilteredReports(mockReports);
      setNotifications(mockNotifications);
      setLoading(false);
    };

    loadData();
  }, []);

  // Filter and sort reports
  useEffect(() => {
    let filtered = [...reports];

    // Apply filters
    if (filters?.status !== 'all') {
      filtered = filtered?.filter(report => report?.status === filters?.status);
    }
    if (filters?.category !== 'all') {
      filtered = filtered?.filter(report => report?.category === filters?.category);
    }
    if (filters?.priority !== 'all') {
      filtered = filtered?.filter(report => report?.priority === filters?.priority);
    }

    // Apply date range filter
    if (filters?.dateRange?.start) {
      filtered = filtered?.filter(report => 
        new Date(report.submittedDate) >= new Date(filters.dateRange.start)
      );
    }
    if (filters?.dateRange?.end) {
      filtered = filtered?.filter(report => 
        new Date(report.submittedDate) <= new Date(filters.dateRange.end)
      );
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (filters?.sortBy) {
        case 'newest':
          return new Date(b.submittedDate) - new Date(a.submittedDate);
        case 'oldest':
          return new Date(a.submittedDate) - new Date(b.submittedDate);
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder?.[b?.priority] - priorityOrder?.[a?.priority];
        case 'status':
          return a?.status?.localeCompare(b?.status);
        default:
          return 0;
      }
    });

    setFilteredReports(filtered);
  }, [reports, filters]);

  // Calculate metrics
  const metrics = {
    totalSubmissions: reports?.length,
    resolvedIssues: reports?.filter(r => r?.status === 'completed')?.length,
    inProgress: reports?.filter(r => ['assigned', 'in_progress']?.includes(r?.status))?.length,
    avgResolutionTime: 5.2
  };

  // Calculate report counts for filter options
  const reportCounts = {
    submitted: reports?.filter(r => r?.status === 'submitted')?.length,
    under_review: reports?.filter(r => r?.status === 'under_review')?.length,
    assigned: reports?.filter(r => r?.status === 'assigned')?.length,
    in_progress: reports?.filter(r => r?.status === 'in_progress')?.length,
    completed: reports?.filter(r => r?.status === 'completed')?.length,
    closed: reports?.filter(r => r?.status === 'closed')?.length
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      status: 'all',
      category: 'all',
      priority: 'all',
      sortBy: 'newest',
      dateRange: {
        start: '',
        end: ''
      }
    });
  };

  const handleViewDetails = (report) => {
    navigate(`/issue-tracking?id=${report?.id}`);
  };

  const handleTrackProgress = (report) => {
    navigate(`/issue-tracking?id=${report?.id}&tab=tracking`);
  };

  const handleMarkNotificationAsRead = (notificationId) => {
    setNotifications(prev =>
      prev?.map(notification =>
        notification?.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(prev =>
      prev?.map(notification => ({ ...notification, read: true }))
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="citizen" />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Track your submitted reports and stay updated on their progress
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link to="/issue-tracking">
              <Button
                variant="default"
                size="lg"
                iconName="Plus"
                iconPosition="left"
              >
                Report New Issue
              </Button>
            </Link>
          </div>
        </div>

        {/* Summary Metrics */}
        <SummaryMetrics metrics={metrics} />

        {/* Notifications Panel */}
        <NotificationPanel
          notifications={notifications}
          onMarkAsRead={handleMarkNotificationAsRead}
          onMarkAllAsRead={handleMarkAllNotificationsAsRead}
        />

        {/* Filter Controls */}
        <FilterControls
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          reportCounts={reportCounts}
        />

        {/* Reports List */}
        <ReportsList
          reports={filteredReports}
          loading={loading}
          onViewDetails={handleViewDetails}
          onTrackProgress={handleTrackProgress}
          filteredCount={filteredReports?.length}
          totalCount={reports?.length}
        />

        {/* Quick Actions Footer */}
        <div className="mt-12 bg-card border border-border rounded-lg p-6 civic-shadow-sm">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-card-foreground mb-2">
              Need Help?
            </h3>
            <p className="text-muted-foreground mb-4">
              Get assistance with your reports or learn how to use the platform
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              <Button
                variant="outline"
                iconName="HelpCircle"
                iconPosition="left"
              >
                Help Center
              </Button>
              <Button
                variant="outline"
                iconName="Phone"
                iconPosition="left"
              >
                Contact Support
              </Button>
              <Button
                variant="outline"
                iconName="MessageCircle"
                iconPosition="left"
              >
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CitizenDashboard;