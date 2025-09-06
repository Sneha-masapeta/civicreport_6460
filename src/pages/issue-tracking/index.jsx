import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import IssueHeader from './components/IssueHeader';
import ProgressTimeline from './components/ProgressTimeline';
import LocationMap from './components/LocationMap';
import PhotoGallery from './components/PhotoGallery';
import NotificationHistory from './components/NotificationHistory';
import DisputeResolution from './components/DisputeResolution';
import StaffComments from './components/StaffComments';

const IssueTracking = () => {
  const { issueId } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  // Mock issue data
  useEffect(() => {
    const fetchIssueData = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockIssue = {
        id: issueId || 'CR-2025-001',
        title: 'Large pothole causing vehicle damage',
        category: 'Road Maintenance',
        status: 'in_progress',
        priority: 'High',
        description: `There is a significant pothole on Main Street that has been causing damage to vehicles. The hole is approximately 2 feet wide and 8 inches deep, located near the intersection with Oak Avenue. Multiple residents have reported tire damage and alignment issues after hitting this pothole. The issue has worsened significantly after recent rainfall, making it a safety hazard for both cars and motorcycles.`,
        submittedAt: '2025-01-06T10:30:00Z',
        estimatedResolution: '2025-01-10T17:00:00Z',
        location: {
          address: '1234 Main Street, Cityname, ST 12345',
          coordinates: { lat: 40.7128, lng: -74.0060 },
          lastUpdated: '2025-01-06T10:30:00Z'
        },
        photos: [
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
          'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400'
        ],
        statusHistory: [
          {
            id: 1,
            status: 'in_progress',
            timestamp: '2025-01-06T14:20:00Z',
            description: 'Field crew dispatched to location',
            assignedTo: 'Road Maintenance Team Alpha',
            notes: 'Materials ordered and crew scheduled for repair work'
          },
          {
            id: 2,
            status: 'assigned',
            timestamp: '2025-01-06T12:15:00Z',
            description: 'Report assigned to Public Works Department',
            assignedTo: 'John Martinez - Field Supervisor'
          },
          {
            id: 3,
            status: 'under_review',
            timestamp: '2025-01-06T11:00:00Z',
            description: 'Initial assessment completed',
            notes: 'Priority elevated due to safety concerns and multiple reports'
          },
          {
            id: 4,
            status: 'submitted',
            timestamp: '2025-01-06T10:30:00Z',
            description: 'Report submitted by citizen'
          }
        ],
        beforePhotos: [
          {
            url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
            timestamp: '2025-01-06T10:30:00Z',
            uploadedBy: 'Sarah Johnson'
          },
          {
            url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400',
            timestamp: '2025-01-06T10:32:00Z',
            uploadedBy: 'Sarah Johnson'
          }
        ],
        afterPhotos: [],
        notifications: [
          {
            id: 1,
            type: 'status_update',
            title: 'Work Started',
            message: 'Field crew has arrived at the location and begun repair work.',
            timestamp: '2025-01-06T14:20:00Z',
            channel: 'SMS',
            priority: 'medium',
            read: true,
            details: 'Road Maintenance Team Alpha has arrived with necessary equipment including asphalt mix and compaction tools. Work is expected to take 2-3 hours.',
            actionTaken: 'Temporary traffic cones placed for safety'
          },
          {
            id: 2,
            type: 'assignment',
            title: 'Report Assigned',
            message: 'Your report has been assigned to the Public Works Department.',
            timestamp: '2025-01-06T12:15:00Z',
            channel: 'Email',
            priority: 'medium',
            read: true,
            details: 'Report CR-2025-001 has been reviewed and assigned to John Martinez, Field Supervisor at Public Works Department.',
            actionTaken: 'Field inspection scheduled within 24 hours'
          },
          {
            id: 3,
            type: 'status_update',
            title: 'Under Review',
            message: 'Your report is being reviewed by municipal staff.',
            timestamp: '2025-01-06T11:00:00Z',
            channel: 'App',
            priority: 'low',
            read: true,
            details: 'Initial assessment completed. Priority elevated to High due to safety concerns and multiple similar reports in the area.'
          },
          {
            id: 4,
            type: 'status_update',
            title: 'Report Received',
            message: 'Thank you for your report. We have received your submission.',
            timestamp: '2025-01-06T10:30:00Z',
            channel: 'Email',
            priority: 'low',
            read: true,
            details: 'Report CR-2025-001 has been successfully submitted and entered into our tracking system.'
          }
        ],
        staffComments: [
          {
            id: 1,
            author: 'John Martinez',
            department: 'Public Works',
            message: 'Confirmed on-site. This is a significant safety hazard. Prioritizing for immediate repair. Will need to coordinate with traffic management for lane closure.',
            timestamp: '2025-01-06T13:45:00Z',
            tags: ['safety-hazard', 'traffic-impact'],
            priority: 'high'
          },
          {
            id: 2,
            author: 'Maria Rodriguez',
            department: 'Traffic Management',
            message: 'Lane closure approved for tomorrow 8 AM - 12 PM. Temporary signage will be installed tonight.',
            timestamp: '2025-01-06T13:50:00Z',
            tags: ['traffic-coordination', 'approved'],
            attachments: [
              { name: 'traffic_plan.pdf', size: '245 KB' }
            ]
          },
          {
            id: 3,
            author: 'David Chen',
            department: 'Materials',
            message: 'Asphalt mix and equipment ready for dispatch. Estimated 3 cubic yards needed based on photos.',
            timestamp: '2025-01-06T14:00:00Z',
            tags: ['materials-ready', 'quantity-estimate']
          }
        ]
      };
      
      setIssue(mockIssue);
      setLoading(false);
    };

    fetchIssueData();
  }, [issueId]);

  const handleDisputeSubmit = (disputeData) => {
    console.log('Dispute submitted:', disputeData);
    // Handle dispute submission
    setIssue(prev => ({
      ...prev,
      disputeStatus: 'pending'
    }));
  };

  const sections = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'timeline', label: 'Timeline', icon: 'Clock' },
    { id: 'location', label: 'Location', icon: 'MapPin' },
    { id: 'photos', label: 'Photos', icon: 'Camera' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'comments', label: 'Communications', icon: 'MessageSquare' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole="citizen" />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <Icon name="Loader2" size={48} className="animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading issue details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole="citizen" />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <Icon name="AlertTriangle" size={48} className="text-error mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Issue Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The issue you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/citizen-dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="citizen" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/citizen-dashboard')}
            iconName="ArrowLeft"
            iconPosition="left"
            className="mb-4"
          >
            Back to Dashboard
          </Button>
        </div>

        {/* Section Navigation - Mobile */}
        <div className="lg:hidden mb-6">
          <div className="flex overflow-x-auto space-x-2 pb-2">
            {sections?.map((section) => (
              <button
                key={section?.id}
                onClick={() => setActiveSection(section?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap civic-transition ${
                  activeSection === section?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={section?.icon} size={16} />
                <span>{section?.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation - Desktop */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-2">
              {sections?.map((section) => (
                <button
                  key={section?.id}
                  onClick={() => setActiveSection(section?.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium civic-transition ${
                    activeSection === section?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={section?.icon} size={18} />
                  <span>{section?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Always show issue header */}
            <IssueHeader issue={issue} />

            {/* Conditional sections based on active selection */}
            {(activeSection === 'overview' || activeSection === 'timeline') && (
              <ProgressTimeline 
                statusHistory={issue?.statusHistory} 
                currentStatus={issue?.status} 
              />
            )}

            {(activeSection === 'overview' || activeSection === 'location') && (
              <LocationMap location={issue?.location} />
            )}

            {(activeSection === 'overview' || activeSection === 'photos') && (
              <PhotoGallery 
                beforePhotos={issue?.beforePhotos} 
                afterPhotos={issue?.afterPhotos} 
              />
            )}

            {(activeSection === 'overview' || activeSection === 'notifications') && (
              <NotificationHistory notifications={issue?.notifications} />
            )}

            {(activeSection === 'overview' || activeSection === 'comments') && (
              <StaffComments 
                comments={issue?.staffComments} 
                isVisible={true} 
              />
            )}

            {/* Dispute Resolution - Always show for completed issues */}
            {activeSection === 'overview' && (
              <DisputeResolution 
                issue={issue} 
                onSubmitDispute={handleDisputeSubmit} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueTracking;