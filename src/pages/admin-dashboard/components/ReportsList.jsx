import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusIndicator from '../../../components/ui/StatusIndicator';

const ReportsList = ({ reports, onReportSelect, selectedReports, onSelectionChange }) => {
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('list'); // list, grid, compact

  const sortOptions = [
    { value: 'createdAt', label: 'Date Created' },
    { value: 'priority', label: 'Priority' },
    { value: 'status', label: 'Status' },
    { value: 'category', label: 'Category' },
    { value: 'location', label: 'Location' }
  ];

  const sortedReports = [...reports]?.sort((a, b) => {
    let aValue = a?.[sortBy];
    let bValue = b?.[sortBy];
    
    if (sortBy === 'createdAt') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortBy === 'location') {
      aValue = a?.location?.address;
      bValue = b?.location?.address;
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleSelectAll = () => {
    if (selectedReports?.length === reports?.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(reports?.map(r => r?.id));
    }
  };

  const handleSelectReport = (reportId) => {
    if (selectedReports?.includes(reportId)) {
      onSelectionChange(selectedReports?.filter(id => id !== reportId));
    } else {
      onSelectionChange([...selectedReports, reportId]);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date?.toLocaleDateString();
  };

  const getPriorityColor = (priority) => {
    if (priority >= 4) return 'text-error';
    if (priority >= 3) return 'text-warning';
    return 'text-success';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      infrastructure: 'Construction',
      safety: 'Shield',
      environment: 'Leaf',
      utilities: 'Zap'
    };
    return icons?.[category?.toLowerCase()] || 'FileText';
  };

  if (viewMode === 'compact') {
    return (
      <div className="bg-card border border-border rounded-lg civic-shadow-sm">
        {/* Compact Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={selectedReports?.length === reports?.length && reports?.length > 0}
              onChange={handleSelectAll}
              className="rounded border-border"
            />
            <span className="text-sm font-medium text-card-foreground">
              {reports?.length} reports
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e?.target?.value?.split('-');
                setSortBy(field);
                setSortOrder(order);
              }}
              className="text-sm border border-border rounded px-2 py-1"
            >
              {sortOptions?.map(option => (
                <React.Fragment key={option?.value}>
                  <option value={`${option?.value}-desc`}>{option?.label} ↓</option>
                  <option value={`${option?.value}-asc`}>{option?.label} ↑</option>
                </React.Fragment>
              ))}
            </select>
            
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              iconName="List"
            />
          </div>
        </div>
        {/* Compact List */}
        <div className="divide-y divide-border max-h-96 overflow-y-auto">
          {sortedReports?.map(report => (
            <div
              key={report?.id}
              className="flex items-center space-x-3 p-3 hover:bg-muted civic-transition cursor-pointer"
              onClick={() => onReportSelect(report)}
            >
              <input
                type="checkbox"
                checked={selectedReports?.includes(report?.id)}
                onChange={() => handleSelectReport(report?.id)}
                onClick={(e) => e?.stopPropagation()}
                className="rounded border-border"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-card-foreground truncate">
                    {report?.id}
                  </span>
                  <StatusIndicator status={report?.status} size="sm" />
                  <span className={`text-xs font-medium ${getPriorityColor(report?.priority)}`}>
                    P{report?.priority}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {report?.location?.address}
                </p>
              </div>
              
              <div className="text-xs text-muted-foreground">
                {formatDate(report?.createdAt)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg civic-shadow-sm">
      {/* List Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            checked={selectedReports?.length === reports?.length && reports?.length > 0}
            onChange={handleSelectAll}
            className="rounded border-border"
          />
          <h3 className="text-lg font-semibold text-card-foreground">
            Reports ({reports?.length})
          </h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            iconName="List"
          />
          <Button
            variant={viewMode === 'compact' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('compact')}
            iconName="MoreHorizontal"
          />
        </div>
      </div>
      {/* Sort Controls */}
      <div className="flex items-center space-x-4 p-4 bg-muted/30 border-b border-border">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        {sortOptions?.map(option => (
          <button
            key={option?.value}
            onClick={() => handleSort(option?.value)}
            className={`flex items-center space-x-1 text-sm civic-transition ${
              sortBy === option?.value 
                ? 'text-primary font-medium' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>{option?.label}</span>
            {sortBy === option?.value && (
              <Icon 
                name={sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                size={12} 
              />
            )}
          </button>
        ))}
      </div>
      {/* Reports List */}
      <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
        {sortedReports?.map(report => (
          <div
            key={report?.id}
            className="p-4 hover:bg-muted/50 civic-transition cursor-pointer"
            onClick={() => onReportSelect(report)}
          >
            <div className="flex items-start space-x-4">
              <input
                type="checkbox"
                checked={selectedReports?.includes(report?.id)}
                onChange={() => handleSelectReport(report?.id)}
                onClick={(e) => e?.stopPropagation()}
                className="mt-1 rounded border-border"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <Link
                    to={`/report-management?id=${report?.id}`}
                    className="text-sm font-medium text-primary hover:text-primary/80 civic-transition"
                    onClick={(e) => e?.stopPropagation()}
                  >
                    {report?.id}
                  </Link>
                  
                  <StatusIndicator status={report?.status} size="sm" />
                  
                  <div className="flex items-center space-x-1">
                    <Icon name="AlertTriangle" size={12} className={getPriorityColor(report?.priority)} />
                    <span className={`text-xs font-medium ${getPriorityColor(report?.priority)}`}>
                      Priority {report?.priority}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Icon name={getCategoryIcon(report?.category)} size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground capitalize">
                      {report?.category}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-card-foreground mb-2 line-clamp-2">
                  {report?.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Icon name="MapPin" size={12} />
                      <span className="truncate max-w-48">{report?.location?.address}</span>
                    </span>
                    
                    <span className="flex items-center space-x-1">
                      <Icon name="User" size={12} />
                      <span>{report?.citizenName}</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {report?.assignedTo && (
                      <span className="flex items-center space-x-1">
                        <Icon name="UserCheck" size={12} />
                        <span>{report?.assignedTo}</span>
                      </span>
                    )}
                    
                    <span>{formatDate(report?.createdAt)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e?.stopPropagation();
                    onReportSelect(report);
                  }}
                >
                  View Details
                </Button>
                
                {report?.duplicateCount > 1 && (
                  <span className="text-xs bg-warning/10 text-warning px-2 py-1 rounded">
                    {report?.duplicateCount} duplicates
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {reports?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="FileText" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-medium text-card-foreground mb-2">No reports found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or search criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default ReportsList;