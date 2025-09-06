import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ReportHeader from './components/ReportHeader';
import ReportDetails from './components/ReportDetails';
import AssignmentPanel from './components/AssignmentPanel';
import StatusManagement from './components/StatusManagement';
import InternalComments from './components/InternalComments';
import PhotoDocumentation from './components/PhotoDocumentation';
import DuplicateDetection from './components/DuplicateDetection';

const ReportManagement = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock report data
  useEffect(() => {
    const fetchReport = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockReport = {
        id: reportId || 'CR-2025-001',
        title: 'Large pothole on Main Street causing vehicle damage',
        category: 'Pothole',
        status: 'assigned',
        priority: 'high',
        description: `There is a significant pothole on Main Street near the intersection with Oak Avenue. The pothole is approximately 18 inches in diameter and about 4 inches deep. It's located in the right lane of traffic and is causing vehicles to swerve to avoid it.\n\nI've noticed several cars hitting it today, and I'm concerned it could cause tire damage or accidents. The area gets heavy traffic during rush hours, making it particularly dangerous.\n\nThe pothole appears to have formed recently, possibly due to the heavy rains we had last week. The asphalt around the edges is cracking and deteriorating.`,
        location: {
          address: '123 Main Street, Cityname, ST 12345',
          coordinates: { lat: 40.7128, lng: -74.0060 },
          description: 'Near intersection with Oak Avenue'
        },
        citizenName: 'Sarah Johnson',citizenEmail: 'sarah.johnson@email.com',citizenPhone: '(555) 123-4567',submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),lastUpdated: new Date(Date.now() - 4 * 60 * 60 * 1000),assignedDepartment: 'public_works',assignedWorker: 'david_chen',
        assignedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
        photos: [
          {
            id: 1,
            url: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg',caption: 'Pothole on Main Street - full view'
          },
          {
            id: 2,
            url: 'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg',caption: 'Close-up showing depth and damage'
          }
        ],
        voiceNote: {
          duration: '1:23',url: '/audio/voice-note-001.mp3'
        },
        beforePhotos: [],
        afterPhotos: []
      };
      
      setReport(mockReport);
      setIsLoading(false);
    };

    fetchReport();
  }, [reportId]);

  const handleAssignmentUpdate = (updatedAssignment) => {
    setReport(prev => ({
      ...prev,
      ...updatedAssignment,
      lastUpdated: new Date()?.toISOString()
    }));
  };

  const handleStatusUpdate = (statusUpdate) => {
    setReport(prev => ({
      ...prev,
      status: statusUpdate?.status,
      lastUpdated: statusUpdate?.timestamp
    }));
  };

  const handlePhotoUpdate = (photoData) => {
    setReport(prev => ({
      ...prev,
      beforePhotos: photoData?.beforePhotos,
      afterPhotos: photoData?.afterPhotos,
      lastUpdated: new Date()?.toISOString()
    }));
  };

  const handleMergeReports = (mergeData) => {
    console.log('Merging reports:', mergeData);
    // Handle report merging logic
  };

  const tabs = [
    { id: 'details', label: 'Report Details', icon: 'FileText' },
    { id: 'assignment', label: 'Assignment', icon: 'UserCheck' },
    { id: 'status', label: 'Status & Timeline', icon: 'Activity' },
    { id: 'communication', label: 'Internal Comments', icon: 'MessageSquare' },
    { id: 'photos', label: 'Photo Documentation', icon: 'Camera' },
    { id: 'duplicates', label: 'Duplicate Detection', icon: 'Copy' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole="admin" />
        <div className="flex">
          <Sidebar 
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
          <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
            <div className="p-6">
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Icon name="Loader2" size={32} className="animate-spin mx-auto text-primary mb-4" />
                  <p className="text-muted-foreground">Loading report details...</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole="admin" />
        <div className="flex">
          <Sidebar 
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
          <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
            <div className="p-6">
              <div className="text-center py-12">
                <Icon name="FileX" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold text-foreground mb-2">Report Not Found</h2>
                <p className="text-muted-foreground mb-4">
                  The report you're looking for doesn't exist or has been removed.
                </p>
                <Button onClick={() => navigate('/admin-dashboard')}>
                  Back to Dashboard
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="admin" />
      <div className="flex">
        <Sidebar 
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        
        <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
          <div className="p-4 lg:p-6">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <button 
                onClick={() => navigate('/admin-dashboard')}
                className="hover:text-foreground civic-transition"
              >
                Dashboard
              </button>
              <Icon name="ChevronRight" size={14} />
              <span className="text-foreground font-medium">Report Management</span>
              <Icon name="ChevronRight" size={14} />
              <span className="text-foreground font-medium">#{report?.id}</span>
            </div>

            {/* Report Header */}
            <div className="mb-6">
              <ReportHeader report={report} />
            </div>

            {/* Tab Navigation */}
            <div className="mb-6">
              <div className="border-b border-border">
                <nav className="flex space-x-8 overflow-x-auto">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap civic-transition ${
                        activeTab === tab?.id
                          ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'details' && (
                <ReportDetails report={report} />
              )}

              {activeTab === 'assignment' && (
                <AssignmentPanel 
                  report={report} 
                  onAssignmentUpdate={handleAssignmentUpdate}
                />
              )}

              {activeTab === 'status' && (
                <StatusManagement 
                  report={report} 
                  onStatusUpdate={handleStatusUpdate}
                />
              )}

              {activeTab === 'communication' && (
                <InternalComments reportId={report?.id} />
              )}

              {activeTab === 'photos' && (
                <PhotoDocumentation 
                  report={report} 
                  onPhotoUpdate={handlePhotoUpdate}
                />
              )}

              {activeTab === 'duplicates' && (
                <DuplicateDetection 
                  report={report} 
                  onMergeReports={handleMergeReports}
                />
              )}
            </div>

            {/* Quick Actions Footer */}
            <div className="fixed bottom-6 right-6 lg:right-8">
              <div className="flex flex-col gap-2">
                <Button
                  variant="default"
                  size="icon"
                  className="rounded-full civic-shadow-lg"
                  onClick={() => navigate('/admin-dashboard')}
                  title="Back to Dashboard"
                >
                  <Icon name="ArrowLeft" size={20} />
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full civic-shadow-lg bg-card"
                  onClick={() => window.print()}
                  title="Print Report"
                >
                  <Icon name="Printer" size={20} />
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportManagement;