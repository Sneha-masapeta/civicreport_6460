import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ReportDetails = ({ report }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 civic-shadow-sm">
      <h2 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
        <Icon name="FileText" size={20} />
        Report Details
      </h2>
      <div className="space-y-6">
        {/* Description */}
        <div>
          <h3 className="text-sm font-medium text-card-foreground mb-2">Description</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {report?.description}
          </p>
        </div>

        {/* Photos */}
        {report?.photos && report?.photos?.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-card-foreground mb-3">Submitted Photos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {report?.photos?.map((photo, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <Image
                      src={photo?.url}
                      alt={`Report photo ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 civic-transition"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 civic-transition rounded-lg flex items-center justify-center">
                    <Icon 
                      name="ZoomIn" 
                      size={24} 
                      className="text-white opacity-0 group-hover:opacity-100 civic-transition"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Voice Note */}
        {report?.voiceNote && (
          <div>
            <h3 className="text-sm font-medium text-card-foreground mb-3">Voice Note</h3>
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <Icon name="Mic" size={16} className="text-primary" />
              <div className="flex-1">
                <p className="text-sm text-card-foreground">Audio recording available</p>
                <p className="text-xs text-muted-foreground">Duration: {report?.voiceNote?.duration}</p>
              </div>
              <button className="p-2 hover:bg-background rounded-lg civic-transition">
                <Icon name="Play" size={16} className="text-primary" />
              </button>
            </div>
          </div>
        )}

        {/* Location Details */}
        <div>
          <h3 className="text-sm font-medium text-card-foreground mb-3">Location Information</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Icon name="MapPin" size={16} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm text-card-foreground">{report?.location?.address}</p>
                <p className="text-xs text-muted-foreground font-mono">
                  {report?.location?.coordinates?.lat?.toFixed(6)}, {report?.location?.coordinates?.lng?.toFixed(6)}
                </p>
              </div>
            </div>
            
            {/* Map Preview */}
            <div className="w-full h-48 bg-muted rounded-lg border border-border overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title={report?.location?.address}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${report?.location?.coordinates?.lat},${report?.location?.coordinates?.lng}&z=16&output=embed`}
                className="border-0"
              />
            </div>
          </div>
        </div>

        {/* Citizen Information */}
        <div>
          <h3 className="text-sm font-medium text-card-foreground mb-3">Citizen Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Icon name="User" size={16} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-card-foreground">{report?.citizenName}</p>
                <p className="text-xs text-muted-foreground">Reporter</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="Mail" size={16} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-card-foreground">{report?.citizenEmail}</p>
                <p className="text-xs text-muted-foreground">Contact Email</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="Phone" size={16} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-card-foreground">{report?.citizenPhone}</p>
                <p className="text-xs text-muted-foreground">Phone Number</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-card-foreground">
                  {new Date(report.submittedAt)?.toLocaleDateString('en-US')}
                </p>
                <p className="text-xs text-muted-foreground">Submission Date</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;