import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterToolbar = ({ onFiltersChange, reportCounts, onBulkAction }) => {
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    priority: 'all',
    department: 'all',
    dateRange: '7d',
    searchQuery: ''
  });

  const [selectedReports, setSelectedReports] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  const categoryOptions = [
    { value: 'all', label: `All Categories (${reportCounts?.total})` },
    { value: 'infrastructure', label: `Infrastructure (${reportCounts?.infrastructure})` },
    { value: 'safety', label: `Safety (${reportCounts?.safety})` },
    { value: 'environment', label: `Environment (${reportCounts?.environment})` },
    { value: 'utilities', label: `Utilities (${reportCounts?.utilities})` }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'submitted', label: 'Submitted' },
    { value: 'under_review', label: 'Under Review' },
    { value: 'assigned', label: 'Assigned' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'closed', label: 'Closed' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: '5', label: 'Critical (5)' },
    { value: '4', label: 'High (4)' },
    { value: '3', label: 'Medium (3)' },
    { value: '2', label: 'Low (2)' },
    { value: '1', label: 'Minimal (1)' }
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'public_works', label: 'Public Works' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'parks', label: 'Parks & Recreation' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'environmental', label: 'Environmental Services' }
  ];

  const dateRangeOptions = [
    { value: '1d', label: 'Last 24 hours' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: 'custom', label: 'Custom range' }
  ];

  const bulkActions = [
    { value: 'assign', label: 'Assign to Department', icon: 'UserCheck' },
    { value: 'priority', label: 'Change Priority', icon: 'AlertTriangle' },
    { value: 'status', label: 'Update Status', icon: 'RefreshCw' },
    { value: 'export', label: 'Export Selected', icon: 'Download' },
    { value: 'merge', label: 'Merge Duplicates', icon: 'Merge' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    handleFilterChange('searchQuery', value);
  };

  const clearAllFilters = () => {
    const defaultFilters = {
      category: 'all',
      status: 'all',
      priority: 'all',
      department: 'all',
      dateRange: '7d',
      searchQuery: ''
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const hasActiveFilters = Object.entries(filters)?.some(([key, value]) => {
    if (key === 'searchQuery') return value?.length > 0;
    return value !== 'all' && value !== '7d';
  });

  const handleBulkAction = (action) => {
    onBulkAction(action, selectedReports);
    setShowBulkActions(false);
    setSelectedReports([]);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 civic-shadow-sm space-y-4">
      {/* Search and Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1 max-w-md">
          <Input
            type="search"
            placeholder="Search reports by ID, location, or description..."
            value={filters?.searchQuery}
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear Filters
            </Button>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowBulkActions(!showBulkActions)}
            iconName="MoreHorizontal"
            iconPosition="left"
          >
            Bulk Actions
          </Button>
          
          <Button
            variant="default"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <Select
          label="Category"
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => handleFilterChange('category', value)}
        />
        
        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
        />
        
        <Select
          label="Priority"
          options={priorityOptions}
          value={filters?.priority}
          onChange={(value) => handleFilterChange('priority', value)}
        />
        
        <Select
          label="Department"
          options={departmentOptions}
          value={filters?.department}
          onChange={(value) => handleFilterChange('department', value)}
        />
        
        <Select
          label="Date Range"
          options={dateRangeOptions}
          value={filters?.dateRange}
          onChange={(value) => handleFilterChange('dateRange', value)}
        />
      </div>
      {/* Bulk Actions Panel */}
      {showBulkActions && (
        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-card-foreground">Bulk Actions</h4>
            <span className="text-xs text-muted-foreground">
              {selectedReports?.length} reports selected
            </span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {bulkActions?.map(action => (
              <Button
                key={action?.value}
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction(action?.value)}
                disabled={selectedReports?.length === 0}
                iconName={action?.icon}
                iconPosition="left"
                className="justify-start"
              >
                {action?.label}
              </Button>
            ))}
          </div>
        </div>
      )}
      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="border-t border-border pt-4">
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Filter" size={14} className="text-muted-foreground" />
            <span className="text-muted-foreground">Active filters:</span>
            <div className="flex flex-wrap gap-1">
              {Object.entries(filters)?.map(([key, value]) => {
                if ((key === 'searchQuery' && value?.length === 0) || 
                    (key !== 'searchQuery' && (value === 'all' || value === '7d'))) {
                  return null;
                }
                
                return (
                  <span
                    key={key}
                    className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded text-xs"
                  >
                    <span>{key === 'searchQuery' ? `"${value}"` : value}</span>
                    <button
                      onClick={() => handleFilterChange(key, key === 'searchQuery' ? '' : key === 'dateRange' ? '7d' : 'all')}
                      className="hover:text-primary/80"
                    >
                      <Icon name="X" size={10} />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterToolbar;