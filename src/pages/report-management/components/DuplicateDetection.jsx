import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusIndicator from '../../../components/ui/StatusIndicator';

const DuplicateDetection = ({ report, onMergeReports }) => {
  const [selectedReports, setSelectedReports] = useState([]);
  const [isMerging, setIsMerging] = useState(false);

  // Mock duplicate/similar reports
  const similarReports = [
    {
      id: 'CR-2025-002',
      title: 'Large pothole on Main Street',
      location: '125 Main Street, Cityname, ST 12345',
      distance: '50 feet',
      submittedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      citizenName: 'John Davis',
      status: 'submitted',
      similarity: 95,
      photos: ['https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg']
    },
    {
      id: 'CR-2025-003',
      title: 'Road damage near Main St intersection',
      location: '140 Main Street, Cityname, ST 12345',
      distance: '100 feet',
      submittedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      citizenName: 'Emily Rodriguez',
      status: 'under_review',
      similarity: 87,
      photos: ['https://images.pexels.com/photos/1029605/pexels-photo-1029605.jpeg']
    },
    {
      id: 'CR-2025-004',
      title: 'Pavement issue on Main Street',
      location: '110 Main Street, Cityname, ST 12345',
      distance: '75 feet',
      submittedAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
      citizenName: 'Michael Thompson',
      status: 'assigned',
      similarity: 78,
      photos: ['https://images.pexels.com/photos/1029606/pexels-photo-1029606.jpeg']
    }
  ];

  const handleSelectReport = (reportId) => {
    setSelectedReports(prev => 
      prev?.includes(reportId) 
        ? prev?.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const handleMergeReports = async () => {
    if (selectedReports?.length === 0) return;

    setIsMerging(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mergeData = {
      primaryReport: report?.id,
      duplicateReports: selectedReports,
      action: 'merge'
    };

    onMergeReports(mergeData);
    setSelectedReports([]);
    setIsMerging(false);
  };

  const getSimilarityColor = (similarity) => {
    if (similarity >= 90) return 'text-error';
    if (similarity >= 80) return 'text-warning';
    return 'text-success';
  };

  const getSimilarityLabel = (similarity) => {
    if (similarity >= 90) return 'Very High';
    if (similarity >= 80) return 'High';
    if (similarity >= 70) return 'Medium';
    return 'Low';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 civic-shadow-sm">
      <h2 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
        <Icon name="Copy" size={20} />
        Duplicate Detection
        {similarReports?.length > 0 && (
          <span className="bg-warning text-warning-foreground text-xs px-2 py-1 rounded-full">
            {similarReports?.length} similar found
          </span>
        )}
      </h2>
      {similarReports?.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="CheckCircle" size={32} className="mx-auto text-success mb-2" />
          <p className="text-sm font-medium text-card-foreground">No Duplicates Found</p>
          <p className="text-xs text-muted-foreground mt-1">
            This report appears to be unique in the system
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Alert Banner */}
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-card-foreground">
                  Potential Duplicates Detected
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Found {similarReports?.length} similar reports in the same area. 
                  Review and merge if they refer to the same issue.
                </p>
              </div>
            </div>
          </div>

          {/* Similar Reports List */}
          <div className="space-y-3">
            {similarReports?.map((similarReport) => (
              <div
                key={similarReport?.id}
                className={`border rounded-lg p-4 civic-transition cursor-pointer ${
                  selectedReports?.includes(similarReport?.id)
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
                onClick={() => handleSelectReport(similarReport?.id)}
              >
                <div className="flex items-start gap-3">
                  {/* Checkbox */}
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      selectedReports?.includes(similarReport?.id)
                        ? 'border-primary bg-primary' :'border-border'
                    }`}>
                      {selectedReports?.includes(similarReport?.id) && (
                        <Icon name="Check" size={12} className="text-primary-foreground" />
                      )}
                    </div>
                  </div>

                  {/* Report Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-card-foreground">
                        {similarReport?.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium ${getSimilarityColor(similarReport?.similarity)}`}>
                          {similarReport?.similarity}% match
                        </span>
                        <StatusIndicator status={similarReport?.status} variant="badge" size="sm" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Icon name="Hash" size={12} />
                        <span>{similarReport?.id}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="User" size={12} />
                        <span>{similarReport?.citizenName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="MapPin" size={12} />
                        <span>{similarReport?.distance} away</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={12} />
                        <span>{new Date(similarReport.submittedAt)?.toLocaleDateString('en-US')}</span>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground mt-2 truncate">
                      {similarReport?.location}
                    </p>
                  </div>

                  {/* Photo Preview */}
                  {similarReport?.photos && similarReport?.photos?.length > 0 && (
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-muted rounded overflow-hidden">
                        <img
                          src={similarReport?.photos?.[0]}
                          alt="Report preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          {selectedReports?.length > 0 && (
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="text-sm font-medium text-card-foreground">
                  {selectedReports?.length} report{selectedReports?.length !== 1 ? 's' : ''} selected
                </p>
                <p className="text-xs text-muted-foreground">
                  These reports will be merged with the current report
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedReports([])}
                >
                  Clear Selection
                </Button>
                <Button
                  onClick={handleMergeReports}
                  loading={isMerging}
                  size="sm"
                  iconName="Merge"
                  iconPosition="left"
                >
                  {isMerging ? 'Merging...' : 'Merge Reports'}
                </Button>
              </div>
            </div>
          )}

          {/* Merge Guidelines */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-card-foreground mb-2 flex items-center gap-2">
              <Icon name="Info" size={14} />
              Merge Guidelines
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Only merge reports that refer to the exact same physical issue</li>
              <li>• Citizens who reported duplicates will be automatically notified</li>
              <li>• All photos and comments from merged reports will be preserved</li>
              <li>• The earliest submission date will be used as the primary timestamp</li>
              <li>• Merged reports cannot be separated once the action is completed</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DuplicateDetection;