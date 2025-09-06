import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterControls = ({ onFiltersChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: 'month',
    department: 'all',
    category: 'all',
    priority: 'all',
    status: 'all',
    location: '',
    customStartDate: '',
    customEndDate: ''
  });

  const departments = [
    { value: 'all', label: 'All Departments' },
    { value: 'public_works', label: 'Public Works' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'parks', label: 'Parks & Recreation' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'environmental', label: 'Environmental Services' }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'potholes', label: 'Potholes' },
    { value: 'streetlights', label: 'Street Lights' },
    { value: 'trash', label: 'Trash & Waste' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'parks', label: 'Parks & Recreation' },
    { value: 'sidewalks', label: 'Sidewalks' },
    { value: 'traffic', label: 'Traffic Signals' }
  ];

  const priorities = [
    { value: 'all', label: 'All Priorities' },
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const statuses = [
    { value: 'all', label: 'All Statuses' },
    { value: 'submitted', label: 'Submitted' },
    { value: 'under_review', label: 'Under Review' },
    { value: 'assigned', label: 'Assigned' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'closed', label: 'Closed' }
  ];

  const dateRanges = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'quarter', label: 'Last 3 Months' },
    { value: 'year', label: 'Last 12 Months' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      dateRange: 'month',
      department: 'all',
      category: 'all',
      priority: 'all',
      status: 'all',
      location: '',
      customStartDate: '',
      customEndDate: ''
    };
    setFilters(defaultFilters);
    onFiltersChange?.(defaultFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters?.department !== 'all') count++;
    if (filters?.category !== 'all') count++;
    if (filters?.priority !== 'all') count++;
    if (filters?.status !== 'all') count++;
    if (filters?.location) count++;
    if (filters?.dateRange === 'custom' && (filters?.customStartDate || filters?.customEndDate)) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="bg-card border border-border rounded-lg p-4 civic-shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
            <Icon name="Filter" size={16} className="text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-card-foreground">Analytics Filters</h3>
            {activeFilterCount > 0 && (
              <p className="text-sm text-muted-foreground">{activeFilterCount} active filters</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {activeFilterCount > 0 && (
            <Button variant="outline" size="sm" onClick={resetFilters}>
              Reset
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
            iconPosition="right"
          >
            {isExpanded ? 'Less' : 'More'} Filters
          </Button>
        </div>
      </div>
      {/* Quick Filters - Always Visible */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Date Range</label>
          <select
            value={filters?.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e?.target?.value)}
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground"
          >
            {dateRanges?.map((range) => (
              <option key={range?.value} value={range?.value}>
                {range?.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Department</label>
          <select
            value={filters?.department}
            onChange={(e) => handleFilterChange('department', e?.target?.value)}
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground"
          >
            {departments?.map((dept) => (
              <option key={dept?.value} value={dept?.value}>
                {dept?.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Category</label>
          <select
            value={filters?.category}
            onChange={(e) => handleFilterChange('category', e?.target?.value)}
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground"
          >
            {categories?.map((cat) => (
              <option key={cat?.value} value={cat?.value}>
                {cat?.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Priority</label>
          <select
            value={filters?.priority}
            onChange={(e) => handleFilterChange('priority', e?.target?.value)}
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground"
          >
            {priorities?.map((priority) => (
              <option key={priority?.value} value={priority?.value}>
                {priority?.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Status</label>
          <select
            value={filters?.status}
            onChange={(e) => handleFilterChange('status', e?.target?.value)}
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground"
          >
            {statuses?.map((status) => (
              <option key={status?.value} value={status?.value}>
                {status?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Advanced Filters - Expandable */}
      {isExpanded && (
        <div className="space-y-4 pt-4 border-t border-border">
          {/* Custom Date Range */}
          {filters?.dateRange === 'custom' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Start Date"
                type="date"
                value={filters?.customStartDate}
                onChange={(e) => handleFilterChange('customStartDate', e?.target?.value)}
              />
              <Input
                label="End Date"
                type="date"
                value={filters?.customEndDate}
                onChange={(e) => handleFilterChange('customEndDate', e?.target?.value)}
              />
            </div>
          )}

          {/* Location Filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Location/Area"
              placeholder="Enter area, street, or zip code"
              value={filters?.location}
              onChange={(e) => handleFilterChange('location', e?.target?.value)}
            />
          </div>

          {/* Quick Filter Presets */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-card-foreground">Quick Presets</label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  handleFilterChange('priority', 'urgent');
                  handleFilterChange('status', 'submitted');
                }}
              >
                Urgent New Reports
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  handleFilterChange('status', 'in_progress');
                  handleFilterChange('dateRange', 'week');
                }}
              >
                Active This Week
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  handleFilterChange('status', 'completed');
                  handleFilterChange('dateRange', 'month');
                }}
              >
                Completed This Month
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  handleFilterChange('category', 'potholes');
                  handleFilterChange('priority', 'high');
                }}
              >
                High Priority Potholes
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Filter" size={14} className="text-muted-foreground" />
            <span className="text-sm font-medium text-card-foreground">Active Filters:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters?.department !== 'all' && (
              <span className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                <span>Dept: {departments?.find(d => d?.value === filters?.department)?.label}</span>
                <button onClick={() => handleFilterChange('department', 'all')}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters?.category !== 'all' && (
              <span className="inline-flex items-center space-x-1 px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                <span>Cat: {categories?.find(c => c?.value === filters?.category)?.label}</span>
                <button onClick={() => handleFilterChange('category', 'all')}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters?.priority !== 'all' && (
              <span className="inline-flex items-center space-x-1 px-2 py-1 bg-warning/10 text-warning text-xs rounded-full">
                <span>Priority: {priorities?.find(p => p?.value === filters?.priority)?.label}</span>
                <button onClick={() => handleFilterChange('priority', 'all')}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters?.status !== 'all' && (
              <span className="inline-flex items-center space-x-1 px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                <span>Status: {statuses?.find(s => s?.value === filters?.status)?.label}</span>
                <button onClick={() => handleFilterChange('status', 'all')}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters?.location && (
              <span className="inline-flex items-center space-x-1 px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full">
                <span>Location: {filters?.location}</span>
                <button onClick={() => handleFilterChange('location', '')}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;