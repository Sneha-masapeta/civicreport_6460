import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const AssignmentPanel = ({ report, onAssignmentUpdate }) => {
  const [selectedDepartment, setSelectedDepartment] = useState(report?.assignedDepartment || '');
  const [selectedWorker, setSelectedWorker] = useState(report?.assignedWorker || '');
  const [priority, setPriority] = useState(report?.priority || 'medium');
  const [estimatedCompletion, setEstimatedCompletion] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const departments = [
    { value: 'public_works', label: 'Public Works Department' },
    { value: 'utilities', label: 'Utilities Department' },
    { value: 'parks_recreation', label: 'Parks & Recreation' },
    { value: 'transportation', label: 'Transportation Department' },
    { value: 'environmental', label: 'Environmental Services' }
  ];

  const workers = [
    { value: 'john_smith', label: 'John Smith - Field Supervisor' },
    { value: 'maria_garcia', label: 'Maria Garcia - Senior Technician' },
    { value: 'david_chen', label: 'David Chen - Maintenance Crew Lead' },
    { value: 'sarah_johnson', label: 'Sarah Johnson - Inspector' },
    { value: 'mike_wilson', label: 'Mike Wilson - Contractor Coordinator' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const handleUpdateAssignment = async () => {
    setIsUpdating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedAssignment = {
      department: selectedDepartment,
      worker: selectedWorker,
      priority,
      estimatedCompletion
    };
    
    onAssignmentUpdate(updatedAssignment);
    setIsUpdating(false);
  };

  const getRoutingSuggestion = () => {
    const suggestions = {
      'Pothole': 'public_works',
      'Street Light': 'utilities',
      'Trash/Recycling': 'environmental',
      'Park Maintenance': 'parks_recreation',
      'Traffic Signal': 'transportation'
    };
    
    return suggestions?.[report?.category] || 'public_works';
  };

  const suggestedDepartment = getRoutingSuggestion();

  return (
    <div className="bg-card border border-border rounded-lg p-6 civic-shadow-sm">
      <h2 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
        <Icon name="UserCheck" size={20} />
        Assignment & Routing
      </h2>
      <div className="space-y-4">
        {/* Intelligent Routing Suggestion */}
        {!selectedDepartment && (
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-card-foreground">Routing Suggestion</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Based on issue type "{report?.category}", we recommend assigning to{' '}
                  <span className="font-medium text-accent">
                    {departments?.find(d => d?.value === suggestedDepartment)?.label}
                  </span>
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => setSelectedDepartment(suggestedDepartment)}
                >
                  Apply Suggestion
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Department Selection */}
        <Select
          label="Department"
          placeholder="Select department"
          options={departments}
          value={selectedDepartment}
          onChange={setSelectedDepartment}
          searchable
        />

        {/* Field Worker Selection */}
        <Select
          label="Assign to Field Worker"
          placeholder="Select field worker"
          options={workers}
          value={selectedWorker}
          onChange={setSelectedWorker}
          disabled={!selectedDepartment}
          searchable
        />

        {/* Priority Adjustment */}
        <Select
          label="Priority Level"
          options={priorityOptions}
          value={priority}
          onChange={setPriority}
        />

        {/* Estimated Completion */}
        <Input
          label="Estimated Completion Date"
          type="date"
          value={estimatedCompletion}
          onChange={(e) => setEstimatedCompletion(e?.target?.value)}
          min={new Date()?.toISOString()?.split('T')?.[0]}
        />

        {/* Current Assignment Status */}
        {report?.assignedDepartment && (
          <div className="bg-muted rounded-lg p-4">
            <h3 className="text-sm font-medium text-card-foreground mb-2">Current Assignment</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Department:</span>
                <span className="text-card-foreground font-medium">
                  {departments?.find(d => d?.value === report?.assignedDepartment)?.label}
                </span>
              </div>
              {report?.assignedWorker && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Worker:</span>
                  <span className="text-card-foreground font-medium">
                    {workers?.find(w => w?.value === report?.assignedWorker)?.label}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Assigned:</span>
                <span className="text-card-foreground">
                  {new Date(report.assignedAt)?.toLocaleDateString('en-US')}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Update Button */}
        <Button
          onClick={handleUpdateAssignment}
          loading={isUpdating}
          disabled={!selectedDepartment}
          className="w-full"
          iconName="Save"
          iconPosition="left"
        >
          {isUpdating ? 'Updating Assignment...' : 'Update Assignment'}
        </Button>
      </div>
    </div>
  );
};

export default AssignmentPanel;