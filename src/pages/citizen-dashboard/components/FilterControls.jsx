import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const FilterControls = ({ 
  filters, 
  onFilterChange, 
  onClearFilters,
  reportCounts 
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'submitted', label: `Submitted (${reportCounts?.submitted})` },
    { value: 'under_review', label: `Under Review (${reportCounts?.under_review})` },
    { value: 'assigned', label: `Assigned (${reportCounts?.assigned})` },
    { value: 'in_progress', label: `In Progress (${reportCounts?.in_progress})` },
    { value: 'completed', label: `Completed (${reportCounts?.completed})` },
    { value: 'closed', label: `Closed (${reportCounts?.closed})` }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'road_maintenance', label: 'Road Maintenance' },
    { value: 'street_lighting', label: 'Street Lighting' },
    { value: 'waste_management', label: 'Waste Management' },
    { value: 'water_sewer', label: 'Water & Sewer' },
    { value: 'parks_recreation', label: 'Parks & Recreation' },
    { value: 'traffic_signs', label: 'Traffic & Signs' },
    { value: 'other', label: 'Other' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'priority', label: 'Priority' },
    { value: 'status', label: 'Status' }
  ];

  const hasActiveFilters = filters?.status !== 'all' || 
                          filters?.category !== 'all' || 
                          filters?.priority !== 'all' || 
                          filters?.dateRange?.start || 
                          filters?.dateRange?.end;

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6 civic-shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
          <Select
            placeholder="Filter by status"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => onFilterChange('status', value)}
          />
          
          <Select
            placeholder="Filter by category"
            options={categoryOptions}
            value={filters?.category}
            onChange={(value) => onFilterChange('category', value)}
          />
          
          <Select
            placeholder="Filter by priority"
            options={priorityOptions}
            value={filters?.priority}
            onChange={(value) => onFilterChange('priority', value)}
          />
          
          <Select
            placeholder="Sort by"
            options={sortOptions}
            value={filters?.sortBy}
            onChange={(value) => onFilterChange('sortBy', value)}
          />
        </div>

        {/* Date Range and Clear Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="flex items-center space-x-2">
            <Input
              type="date"
              placeholder="Start date"
              value={filters?.dateRange?.start}
              onChange={(e) => onFilterChange('dateRange', { 
                ...filters?.dateRange, 
                start: e?.target?.value 
              })}
              className="w-full sm:w-auto"
            />
            <span className="text-muted-foreground">to</span>
            <Input
              type="date"
              placeholder="End date"
              value={filters?.dateRange?.end}
              onChange={(e) => onFilterChange('dateRange', { 
                ...filters?.dateRange, 
                end: e?.target?.value 
              })}
              className="w-full sm:w-auto"
            />
          </div>
          
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterControls;