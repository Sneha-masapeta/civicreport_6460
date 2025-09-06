import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const LocationSelector = ({ isOpen, onClose, onLocationSelect, initialLocation = null }) => {
  const [selectedLocation, setSelectedLocation] = useState(initialLocation || {
    address: '',
    coordinates: { lat: null, lng: null },
    description: ''
  });
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 }); // Default to NYC

  // Mock search results for demonstration
  const mockSearchResults = [
    {
      id: 1,
      address: '123 Main Street, Cityname, ST 12345',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      type: 'address'
    },
    {
      id: 2,
      address: '456 Oak Avenue, Cityname, ST 12345',
      coordinates: { lat: 40.7589, lng: -73.9851 },
      type: 'address'
    },
    {
      id: 3,
      address: 'City Hall, 789 Government Plaza, Cityname, ST 12345',
      coordinates: { lat: 40.7505, lng: -73.9934 },
      type: 'landmark'
    }
  ];

  useEffect(() => {
    if (searchQuery?.length > 2) {
      // Simulate API search delay
      const timer = setTimeout(() => {
        setSearchResults(
          mockSearchResults?.filter(result =>
            result?.address?.toLowerCase()?.includes(searchQuery?.toLowerCase())
          )
        );
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position?.coords?.latitude,
            lng: position?.coords?.longitude
          };
          
          // Mock reverse geocoding
          const mockAddress = `${Math.floor(Math.random() * 999) + 1} Current Street, Cityname, ST 12345`;
          
          setSelectedLocation({
            address: mockAddress,
            coordinates: coords,
            description: 'Current location (GPS)'
          });
          setMapCenter(coords);
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoadingLocation(false);
          // Handle error - show message to user
        }
      );
    } else {
      setIsLoadingLocation(false);
      // Handle case where geolocation is not supported
    }
  };

  const selectSearchResult = (result) => {
    setSelectedLocation({
      address: result?.address,
      coordinates: result?.coordinates,
      description: result?.type === 'landmark' ? 'Landmark' : 'Address'
    });
    setMapCenter(result?.coordinates);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleConfirmLocation = () => {
    if (selectedLocation?.address && selectedLocation?.coordinates?.lat) {
      onLocationSelect(selectedLocation);
      onClose();
    }
  };

  const handleMapClick = (event) => {
    // Mock map click handling
    const clickedCoords = {
      lat: mapCenter?.lat + (Math.random() - 0.5) * 0.01,
      lng: mapCenter?.lng + (Math.random() - 0.5) * 0.01
    };
    
    const mockAddress = `${Math.floor(Math.random() * 999) + 1} Selected Street, Cityname, ST 12345`;
    
    setSelectedLocation({
      address: mockAddress,
      coordinates: clickedCoords,
      description: 'Selected on map'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1300 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-card rounded-lg civic-shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-card-foreground">Select Location</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 max-h-[calc(90vh-8rem)] overflow-y-auto">
          {/* Search Bar */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for an address or landmark..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="pr-10"
            />
            <Icon 
              name="Search" 
              size={16} 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
          </div>

          {/* Search Results */}
          {searchResults?.length > 0 && (
            <div className="border border-border rounded-lg divide-y divide-border">
              {searchResults?.map((result) => (
                <button
                  key={result?.id}
                  onClick={() => selectSearchResult(result)}
                  className="w-full p-3 text-left hover:bg-muted civic-transition flex items-center space-x-3"
                >
                  <Icon 
                    name={result?.type === 'landmark' ? 'MapPin' : 'Home'} 
                    size={16} 
                    className="text-muted-foreground flex-shrink-0"
                  />
                  <span className="text-sm">{result?.address}</span>
                </button>
              ))}
            </div>
          )}

          {/* Current Location Button */}
          <Button
            variant="outline"
            onClick={getCurrentLocation}
            disabled={isLoadingLocation}
            className="w-full"
            iconName={isLoadingLocation ? 'Loader2' : 'MapPin'}
            iconPosition="left"
          >
            {isLoadingLocation ? 'Getting location...' : 'Use Current Location'}
          </Button>

          {/* Map Placeholder */}
          <div className="relative">
            <div 
              className="w-full h-64 bg-muted rounded-lg border border-border flex items-center justify-center cursor-crosshair"
              onClick={handleMapClick}
            >
              <div className="text-center text-muted-foreground">
                <Icon name="Map" size={48} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">Interactive map would be here</p>
                <p className="text-xs">Click anywhere to select location</p>
              </div>
            </div>
            
            {/* Map Pin Indicator */}
            {selectedLocation?.coordinates?.lat && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Icon name="MapPin" size={24} className="text-error drop-shadow-lg" />
              </div>
            )}
          </div>

          {/* Selected Location Display */}
          {selectedLocation?.address && (
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="MapPin" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-card-foreground">
                    Selected Location
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedLocation?.address}
                  </p>
                  {selectedLocation?.description && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {selectedLocation?.description}
                    </p>
                  )}
                  {selectedLocation?.coordinates?.lat && (
                    <p className="text-xs font-mono text-muted-foreground mt-2">
                      {selectedLocation?.coordinates?.lat?.toFixed(6)}, {selectedLocation?.coordinates?.lng?.toFixed(6)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-4 border-t border-border bg-muted/30">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmLocation}
            disabled={!selectedLocation?.address || !selectedLocation?.coordinates?.lat}
          >
            Confirm Location
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;