import React from 'react';
import Icon from '../../../components/AppIcon';
import ReportCard from './ReportCard';

const ReportsList = ({ 
  reports, 
  loading, 
  onViewDetails, 
  onTrackProgress,
  filteredCount,
  totalCount 
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)]?.map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6 animate-pulse">
            <div className="flex items-start space-x-4">
              <div className="w-20 h-20 bg-muted rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
                <div className="h-3 bg-muted rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (reports?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-12 text-center civic-shadow-sm">
        <Icon name="FileText" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
        <h3 className="text-lg font-semibold text-card-foreground mb-2">No Reports Found</h3>
        <p className="text-muted-foreground mb-6">
          {totalCount === 0 
            ? "You haven't submitted any reports yet. Start by reporting your first civic issue!" :"No reports match your current filters. Try adjusting your search criteria."
          }
        </p>
        {totalCount === 0 && (
          <div className="flex justify-center">
            <button className="text-primary hover:text-primary/80 font-medium civic-transition">
              Report Your First Issue →
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {filteredCount} of {totalCount} reports
        </span>
        <span>
          Updated {new Date()?.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
      {/* Reports List */}
      <div className="space-y-4">
        {reports?.map((report) => (
          <ReportCard
            key={report?.id}
            report={report}
            onViewDetails={onViewDetails}
            onTrackProgress={onTrackProgress}
          />
        ))}
      </div>
      {/* Load More Button (if needed) */}
      {reports?.length >= 10 && (
        <div className="flex justify-center pt-6">
          <button className="text-primary hover:text-primary/80 font-medium civic-transition">
            Load More Reports
          </button>
        </div>
      )}
    </div>
  );
};

export default ReportsList;