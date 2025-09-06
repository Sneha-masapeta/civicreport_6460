import React from 'react';
import Icon from '../../../components/AppIcon';

const LocationMap = ({ location }) => {
  return (
    <div className="bg-card rounded-lg border border-border civic-shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Location Details</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="MapPin" size={16} />
          <span>GPS Verified</span>
        </div>
      </div>
      {/* Address Information */}
      <div className="mb-4">
        <p className="text-sm font-medium text-foreground">{location?.address}</p>
        <p className="text-xs text-muted-foreground font-mono mt-1">
          {location?.coordinates?.lat?.toFixed(6)}, {location?.coordinates?.lng?.toFixed(6)}
        </p>
      </div>
      {/* Map Container */}
      <div className="relative w-full h-64 rounded-lg overflow-hidden border border-border">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title={`Location: ${location?.address}`}
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${location?.coordinates?.lat},${location?.coordinates?.lng}&z=16&output=embed`}
          className="w-full h-full"
        />
        
        {/* Map Overlay Controls */}
        <div className="absolute top-3 right-3 space-y-2">
          <button className="bg-card border border-border rounded-lg p-2 civic-shadow-sm hover:bg-muted civic-transition">
            <Icon name="Maximize2" size={16} className="text-muted-foreground" />
          </button>
          <button className="bg-card border border-border rounded-lg p-2 civic-shadow-sm hover:bg-muted civic-transition">
            <Icon name="Navigation" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>
      {/* Location Accuracy */}
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full" />
          <span>High accuracy GPS location</span>
        </div>
        <span>Last updated: {new Date(location.lastUpdated)?.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default LocationMap;