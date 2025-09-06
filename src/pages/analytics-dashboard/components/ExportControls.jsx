import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ExportControls = () => {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportType, setExportType] = useState('pdf');
  const [dateRange, setDateRange] = useState('month');
  const [selectedReports, setSelectedReports] = useState([]);
  const [scheduledReports, setScheduledReports] = useState([]);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const exportOptions = [
    { value: 'pdf', label: 'PDF Report', icon: 'FileText', description: 'Comprehensive analytics report' },
    { value: 'csv', label: 'CSV Data', icon: 'Download', description: 'Raw data for analysis' },
    { value: 'excel', label: 'Excel Workbook', icon: 'FileSpreadsheet', description: 'Formatted spreadsheet' },
    { value: 'json', label: 'JSON Data', icon: 'Code', description: 'API-ready format' }
  ];

  const dateRangeOptions = [
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'quarter', label: 'Last 3 Months' },
    { value: 'year', label: 'Last 12 Months' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const reportTypes = [
    { id: 'overview', label: 'Performance Overview', checked: true },
    { id: 'departments', label: 'Department Analysis', checked: true },
    { id: 'trends', label: 'Trend Analysis', checked: false },
    { id: 'heatmap', label: 'Geographic Distribution', checked: false },
    { id: 'satisfaction', label: 'Citizen Satisfaction', checked: true },
    { id: 'sla', label: 'SLA Compliance', checked: false }
  ];

  const mockScheduledReports = [
    {
      id: 1,
      name: 'Weekly Performance Summary',
      frequency: 'Weekly',
      nextRun: '2025-09-13',
      recipients: ['admin@cityname.gov', 'manager@cityname.gov'],
      format: 'PDF'
    },
    {
      id: 2,
      name: 'Monthly Department Analysis',
      frequency: 'Monthly',
      nextRun: '2025-10-01',
      recipients: ['dept-heads@cityname.gov'],
      format: 'Excel'
    }
  ];

  const handleExport = () => {
    // Mock export functionality
    console.log('Exporting report:', {
      type: exportType,
      dateRange,
      selectedReports: reportTypes?.filter(r => r?.checked)?.map(r => r?.id)
    });
    
    // Simulate export process
    setTimeout(() => {
      setIsExportModalOpen(false);
      // Show success message
    }, 2000);
  };

  const handleScheduleReport = (reportData) => {
    const newReport = {
      id: scheduledReports?.length + 1,
      ...reportData,
      nextRun: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)?.toISOString()?.split('T')?.[0]
    };
    setScheduledReports([...scheduledReports, newReport]);
    setIsScheduleModalOpen(false);
  };

  const toggleReportType = (reportId) => {
    setSelectedReports(prev => 
      prev?.includes(reportId) 
        ? prev?.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 civic-shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
            <Icon name="Download" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Export & Reports</h3>
            <p className="text-sm text-muted-foreground">Generate and schedule analytics reports</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsScheduleModalOpen(true)}
            iconName="Calendar"
            iconPosition="left"
          >
            Schedule Report
          </Button>
          <Button
            onClick={() => setIsExportModalOpen(true)}
            iconName="Download"
            iconPosition="left"
          >
            Export Now
          </Button>
        </div>
      </div>
      {/* Quick Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {exportOptions?.map((option) => (
          <button
            key={option?.value}
            onClick={() => {
              setExportType(option?.value);
              setIsExportModalOpen(true);
            }}
            className="p-4 border border-border rounded-lg hover:bg-muted civic-transition text-left"
          >
            <div className="flex items-center space-x-3 mb-2">
              <Icon name={option?.icon} size={20} className="text-primary" />
              <h4 className="font-medium text-card-foreground">{option?.label}</h4>
            </div>
            <p className="text-sm text-muted-foreground">{option?.description}</p>
          </button>
        ))}
      </div>
      {/* Scheduled Reports */}
      <div className="space-y-4">
        <h4 className="font-medium text-card-foreground">Scheduled Reports</h4>
        {mockScheduledReports?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="Calendar" size={32} className="mx-auto mb-2 opacity-50" />
            <p>No scheduled reports</p>
          </div>
        ) : (
          <div className="space-y-3">
            {mockScheduledReports?.map((report) => (
              <div key={report?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h5 className="font-medium text-card-foreground">{report?.name}</h5>
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                      {report?.format}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{report?.frequency}</span>
                    <span>Next: {report?.nextRun}</span>
                    <span>{report?.recipients?.length} recipients</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Icon name="Edit" size={16} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Export Modal */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-1300 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsExportModalOpen(false)} />
          <div className="relative bg-card rounded-lg civic-shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-card-foreground">Export Analytics Report</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsExportModalOpen(false)}>
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* Export Format */}
              <div className="space-y-3">
                <h3 className="font-medium text-card-foreground">Export Format</h3>
                <div className="grid grid-cols-2 gap-3">
                  {exportOptions?.map((option) => (
                    <button
                      key={option?.value}
                      onClick={() => setExportType(option?.value)}
                      className={`p-3 border rounded-lg text-left civic-transition ${
                        exportType === option?.value
                          ? 'border-primary bg-primary/10' :'border-border hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <Icon name={option?.icon} size={16} />
                        <span className="font-medium">{option?.label}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{option?.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div className="space-y-3">
                <h3 className="font-medium text-card-foreground">Date Range</h3>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  {dateRangeOptions?.map((option) => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Report Sections */}
              <div className="space-y-3">
                <h3 className="font-medium text-card-foreground">Include Sections</h3>
                <div className="space-y-2">
                  {reportTypes?.map((report) => (
                    <label key={report?.id} className="flex items-center space-x-3 p-2 hover:bg-muted rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={report?.checked}
                        onChange={() => toggleReportType(report?.id)}
                        className="rounded border-border"
                      />
                      <span className="text-sm">{report?.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-4 border-t border-border">
              <Button variant="outline" onClick={() => setIsExportModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleExport}>
                Export Report
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Schedule Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-1300 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsScheduleModalOpen(false)} />
          <div className="relative bg-card rounded-lg civic-shadow-lg w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-card-foreground">Schedule Report</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsScheduleModalOpen(false)}>
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="p-6 space-y-4">
              <Input
                label="Report Name"
                placeholder="Enter report name"
                required
              />
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-card-foreground">Frequency</label>
                <select className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </div>

              <Input
                label="Recipients"
                placeholder="Enter email addresses (comma separated)"
                required
              />
            </div>

            <div className="flex items-center justify-end space-x-3 p-4 border-t border-border">
              <Button variant="outline" onClick={() => setIsScheduleModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleScheduleReport({})}>
                Schedule Report
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportControls;