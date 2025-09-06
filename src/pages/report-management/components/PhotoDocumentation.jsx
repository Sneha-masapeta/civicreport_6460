import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const PhotoDocumentation = ({ report, onPhotoUpdate }) => {
  const [beforePhotos, setBeforePhotos] = useState(report?.beforePhotos || []);
  const [afterPhotos, setAfterPhotos] = useState(report?.afterPhotos || []);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedPhotoType, setSelectedPhotoType] = useState('before');

  // Mock before photos (initial report photos)
  const initialBeforePhotos = [
    {
      id: 1,
      url: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg',
      caption: 'Pothole on Main Street - Initial condition',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      uploadedBy: 'Sarah Johnson (Citizen)'
    }
  ];

  // Mock after photos (field staff documentation)
  const mockAfterPhotos = [
    {
      id: 2,
      url: 'https://images.pexels.com/photos/1029605/pexels-photo-1029605.jpeg',
      caption: 'Completed repair - Fresh asphalt applied',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      uploadedBy: 'David Chen (Field Crew)'
    }
  ];

  useState(() => {
    if (beforePhotos?.length === 0) {
      setBeforePhotos(initialBeforePhotos);
    }
    if (report?.status === 'completed' && afterPhotos?.length === 0) {
      setAfterPhotos(mockAfterPhotos);
    }
  }, []);

  const handleFileUpload = async (event, photoType) => {
    const files = Array.from(event?.target?.files);
    if (files?.length === 0) return;

    setIsUploading(true);

    // Simulate file upload
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newPhotos = files?.map((file, index) => ({
      id: Date.now() + index,
      url: URL.createObjectURL(file),
      caption: `${photoType === 'before' ? 'Before' : 'After'} photo - ${file?.name}`,
      timestamp: new Date(),
      uploadedBy: 'Michael Chen (Administrator)',
      file: file
    }));

    if (photoType === 'before') {
      setBeforePhotos(prev => [...prev, ...newPhotos]);
    } else {
      setAfterPhotos(prev => [...prev, ...newPhotos]);
    }

    onPhotoUpdate({ beforePhotos, afterPhotos, newPhotos, type: photoType });
    setIsUploading(false);
  };

  const removePhoto = (photoId, photoType) => {
    if (photoType === 'before') {
      setBeforePhotos(prev => prev?.filter(photo => photo?.id !== photoId));
    } else {
      setAfterPhotos(prev => prev?.filter(photo => photo?.id !== photoId));
    }
  };

  const PhotoGrid = ({ photos, type, canUpload = true }) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-card-foreground capitalize">
          {type} Photos ({photos?.length})
        </h3>
        {canUpload && (
          <div className="relative">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileUpload(e, type)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isUploading}
            />
            <Button
              variant="outline"
              size="sm"
              disabled={isUploading}
              iconName={isUploading ? 'Loader2' : 'Upload'}
              iconPosition="left"
            >
              {isUploading ? 'Uploading...' : 'Add Photos'}
            </Button>
          </div>
        )}
      </div>

      {photos?.length === 0 ? (
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <Icon name="ImagePlus" size={32} className="mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            No {type} photos uploaded yet
          </p>
          {canUpload && (
            <p className="text-xs text-muted-foreground mt-1">
              Click "Add Photos" to upload documentation
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos?.map((photo) => (
            <div key={photo?.id} className="relative group">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <Image
                  src={photo?.url}
                  alt={photo?.caption}
                  className="w-full h-full object-cover group-hover:scale-105 civic-transition"
                />
              </div>
              
              {/* Photo Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 civic-transition rounded-lg flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 civic-transition flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                  >
                    <Icon name="ZoomIn" size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => removePhoto(photo?.id, type)}
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>

              {/* Photo Info */}
              <div className="mt-2">
                <p className="text-xs font-medium text-card-foreground truncate">
                  {photo?.caption}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground">
                    {photo?.uploadedBy}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {new Date(photo.timestamp)?.toLocaleDateString('en-US')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg p-6 civic-shadow-sm">
      <h2 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
        <Icon name="Camera" size={20} />
        Photo Documentation
      </h2>
      <div className="space-y-8">
        {/* Before Photos */}
        <PhotoGrid 
          photos={beforePhotos} 
          type="before" 
          canUpload={false} // Citizens upload these initially
        />

        {/* After Photos */}
        <PhotoGrid 
          photos={afterPhotos} 
          type="after" 
          canUpload={report?.status === 'in_progress' || report?.status === 'completed'}
        />

        {/* Comparison View */}
        {beforePhotos?.length > 0 && afterPhotos?.length > 0 && (
          <div className="border-t border-border pt-6">
            <h3 className="text-sm font-medium text-card-foreground mb-4">
              Before & After Comparison
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">BEFORE</p>
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={beforePhotos?.[0]?.url}
                    alt="Before repair"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">AFTER</p>
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={afterPhotos?.[0]?.url}
                    alt="After repair"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Guidelines */}
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-card-foreground mb-2 flex items-center gap-2">
            <Icon name="Info" size={14} />
            Photo Guidelines
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Upload clear, well-lit photos showing the full extent of the issue</li>
            <li>• Include multiple angles when possible for comprehensive documentation</li>
            <li>• Before photos help assess the initial condition and scope of work</li>
            <li>• After photos provide proof of completion and quality verification</li>
            <li>• Maximum file size: 10MB per photo, supported formats: JPG, PNG, HEIC</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PhotoDocumentation;