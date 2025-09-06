import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapView = ({ reports, selectedFilters, onReportSelect, onClusterClick }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 });
  const [zoomLevel, setZoomLevel] = useState(12);
  const [activeLayer, setActiveLayer] = useState('all');
  const [showClusters, setShowClusters] = useState(true);

  const layerOptions = [
    { id: 'all', label: 'All Issues', color: 'text-foreground' },
    { id: 'infrastructure', label: 'Infrastructure', color: 'text-primary' },
    { id: 'safety', label: 'Safety', color: 'text-error' },
    { id: 'environment', label: 'Environment', color: 'text-success' },
    { id: 'utilities', label: 'Utilities', color: 'text-warning' }
  ];

  const filteredReports = reports?.filter(report => {
    if (activeLayer === 'all') return true;
    return report?.category?.toLowerCase() === activeLayer;
  });

  const clusters = showClusters ? generateClusters(filteredReports) : [];

  function generateClusters(reports) {
    // Mock clustering logic - group nearby reports
    const clusterMap = new Map();
    
    reports?.forEach(report => {
      const key = `${Math.floor(report?.location?.coordinates?.lat * 100)}-${Math.floor(report?.location?.coordinates?.lng * 100)}`;
      if (!clusterMap?.has(key)) {
        clusterMap?.set(key, []);
      }
      clusterMap?.get(key)?.push(report);
    });

    return Array.from(clusterMap?.entries())?.map(([key, reports]) => ({
      id: key,
      count: reports?.length,
      reports,
      center: {
        lat: reports?.reduce((sum, r) => sum + r?.location?.coordinates?.lat, 0) / reports?.length,
        lng: reports?.reduce((sum, r) => sum + r?.location?.coordinates?.lng, 0) / reports?.length
      },
      priority: Math.max(...reports?.map(r => r?.priority))
    }));
  }

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 8));
  };

  const getMarkerColor = (category, priority) => {
    const colors = {
      infrastructure: priority >= 4 ? 'bg-primary' : 'bg-primary/70',
      safety: priority >= 4 ? 'bg-error' : 'bg-error/70',
      environment: priority >= 4 ? 'bg-success' : 'bg-success/70',
      utilities: priority >= 4 ? 'bg-warning' : 'bg-warning/70'
    };
    return colors?.[category?.toLowerCase()] || 'bg-secondary';
  };

  return (
    <div className="relative h-full bg-muted rounded-lg border border-border overflow-hidden">
      {/* Map Container */}
      <div className="absolute inset-0">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Municipal Issues Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=${zoomLevel}&output=embed`}
          className="w-full h-full"
        />
      </div>
      {/* Map Overlay Controls */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Layer Toggle */}
        <div className="absolute top-4 left-4 pointer-events-auto">
          <div className="bg-card border border-border rounded-lg civic-shadow-md p-2">
            <div className="text-xs font-medium text-muted-foreground mb-2">Layers</div>
            <div className="space-y-1">
              {layerOptions?.map(layer => (
                <button
                  key={layer?.id}
                  onClick={() => setActiveLayer(layer?.id)}
                  className={`flex items-center space-x-2 w-full px-2 py-1 rounded text-xs civic-transition ${
                    activeLayer === layer?.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-muted'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${layer?.color === 'text-foreground' ? 'bg-foreground' : layer?.color?.replace('text-', 'bg-')}`} />
                  <span>{layer?.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 pointer-events-auto">
          <div className="bg-card border border-border rounded-lg civic-shadow-md">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomIn}
              className="rounded-b-none border-b border-border"
            >
              <Icon name="Plus" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomOut}
              className="rounded-t-none"
            >
              <Icon name="Minus" size={16} />
            </Button>
          </div>
        </div>

        {/* Cluster Toggle */}
        <div className="absolute bottom-4 left-4 pointer-events-auto">
          <Button
            variant={showClusters ? "default" : "outline"}
            size="sm"
            onClick={() => setShowClusters(!showClusters)}
            iconName="MapPin"
            iconPosition="left"
          >
            {showClusters ? 'Hide' : 'Show'} Clusters
          </Button>
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 right-4 pointer-events-auto">
          <div className="bg-card border border-border rounded-lg civic-shadow-md p-3">
            <div className="text-xs font-medium text-muted-foreground mb-2">Priority</div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-error" />
                <span>High (4-5)</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-warning" />
                <span>Medium (2-3)</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span>Low (1)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mock Report Markers */}
        {!showClusters && filteredReports?.slice(0, 20)?.map((report, index) => (
          <div
            key={report?.id}
            className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${50 + (index % 10 - 5) * 8}%`,
              top: `${50 + (Math.floor(index / 10) - 1) * 10}%`
            }}
            onClick={() => onReportSelect(report)}
          >
            <div className={`w-4 h-4 rounded-full border-2 border-white civic-shadow-sm ${getMarkerColor(report?.category, report?.priority)}`} />
          </div>
        ))}

        {/* Mock Cluster Markers */}
        {showClusters && clusters?.slice(0, 8)?.map((cluster, index) => (
          <div
            key={cluster?.id}
            className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${45 + (index % 4) * 15}%`,
              top: `${40 + Math.floor(index / 4) * 20}%`
            }}
            onClick={() => onClusterClick(cluster)}
          >
            <div className={`w-8 h-8 rounded-full border-2 border-white civic-shadow-md flex items-center justify-center text-xs font-bold text-white ${
              cluster?.priority >= 4 ? 'bg-error' : cluster?.priority >= 2 ? 'bg-warning' : 'bg-success'
            }`}>
              {cluster?.count}
            </div>
          </div>
        ))}
      </div>
      {/* Map Loading State */}
      <div className="absolute inset-0 bg-muted/50 flex items-center justify-center pointer-events-none">
        <div className="text-center text-muted-foreground">
          <Icon name="Map" size={48} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">Interactive map with {filteredReports?.length} reports</p>
        </div>
      </div>
    </div>
  );
};

export default MapView;