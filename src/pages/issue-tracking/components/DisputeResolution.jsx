import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DisputeResolution = ({ issue, onSubmitDispute }) => {
  const [isDisputeFormOpen, setIsDisputeFormOpen] = useState(false);
  const [disputeForm, setDisputeForm] = useState({
    reason: '',
    description: '',
    evidence: null,
    requestedAction: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const disputeReasons = [
    { value: 'incomplete_work', label: 'Work appears incomplete' },
    { value: 'poor_quality', label: 'Poor quality of work' },
    { value: 'wrong_location', label: 'Work done at wrong location' },
    { value: 'damage_caused', label: 'Additional damage was caused' },
    { value: 'not_resolved', label: 'Original issue not resolved' },
    { value: 'other', label: 'Other reason' }
  ];

  const requestedActions = [
    { value: 'rework', label: 'Request rework' },
    { value: 'inspection', label: 'Request re-inspection' },
    { value: 'compensation', label: 'Request compensation' },
    { value: 'escalation', label: 'Escalate to supervisor' }
  ];

  const handleInputChange = (field, value) => {
    setDisputeForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      setDisputeForm(prev => ({
        ...prev,
        evidence: file
      }));
    }
  };

  const handleSubmitDispute = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const disputeData = {
        issueId: issue?.id,
        reason: disputeForm?.reason,
        description: disputeForm?.description,
        evidence: disputeForm?.evidence,
        requestedAction: disputeForm?.requestedAction,
        submittedAt: new Date()?.toISOString()
      };
      
      onSubmitDispute(disputeData);
      setIsDisputeFormOpen(false);
      setDisputeForm({
        reason: '',
        description: '',
        evidence: null,
        requestedAction: ''
      });
    } catch (error) {
      console.error('Error submitting dispute:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Only show dispute option for completed issues
  if (issue?.status !== 'completed') {
    return null;
  }

  return (
    <div className="bg-card rounded-lg border border-border civic-shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Resolution Feedback</h2>
        {issue?.disputeStatus && (
          <span className={`text-xs px-2 py-1 rounded ${
            issue?.disputeStatus === 'pending' ?'bg-warning text-warning-foreground'
              : issue?.disputeStatus === 'resolved' ?'bg-success text-success-foreground' :'bg-error text-error-foreground'
          }`}>
            Dispute {issue?.disputeStatus}
          </span>
        )}
      </div>
      {!isDisputeFormOpen ? (
        <div className="space-y-4">
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <span className="text-sm font-medium text-foreground">
                Work has been marked as completed
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              If you're not satisfied with the resolution, you can submit a dispute with evidence.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={() => setIsDisputeFormOpen(true)}
              iconName="AlertTriangle"
              iconPosition="left"
              className="flex-1"
            >
              Report Issue with Resolution
            </Button>
            <Button
              variant="default"
              iconName="ThumbsUp"
              iconPosition="left"
              className="flex-1"
            >
              Satisfied with Resolution
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmitDispute} className="space-y-6">
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="text-sm font-medium text-foreground">
                Dispute Resolution Form
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Please provide detailed information about your concerns with the completed work.
            </p>
          </div>

          <Select
            label="Reason for Dispute"
            options={disputeReasons}
            value={disputeForm?.reason}
            onChange={(value) => handleInputChange('reason', value)}
            required
            placeholder="Select a reason"
          />

          <Input
            label="Detailed Description"
            type="textarea"
            placeholder="Please describe the specific issues you've observed with the completed work..."
            value={disputeForm?.description}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
            required
            className="min-h-[100px]"
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Evidence (Photos/Documents)
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="evidence-upload"
              />
              <label
                htmlFor="evidence-upload"
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                <Icon name="Upload" size={32} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Click to upload evidence
                </span>
                <span className="text-xs text-muted-foreground">
                  Photos, PDFs, or documents (max 10MB)
                </span>
              </label>
              {disputeForm?.evidence && (
                <div className="mt-3 text-sm text-foreground">
                  Selected: {disputeForm?.evidence?.name}
                </div>
              )}
            </div>
          </div>

          <Select
            label="Requested Action"
            options={requestedActions}
            value={disputeForm?.requestedAction}
            onChange={(value) => handleInputChange('requestedAction', value)}
            required
            placeholder="What would you like us to do?"
          />

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDisputeFormOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              iconName="Send"
              iconPosition="left"
              className="flex-1"
            >
              Submit Dispute
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DisputeResolution;