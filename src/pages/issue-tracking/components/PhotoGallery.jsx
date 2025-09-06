import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PhotoGallery = ({ beforePhotos = [], afterPhotos = [] }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeTab, setActiveTab] = useState('before');

  const openPhotoModal = (photo, type) => {
    setSelectedPhoto({ ...photo, type });
  };

  const closePhotoModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="bg-card rounded-lg border border-border civic-shadow-sm p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">Photo Documentation</h2>
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1">
        <button
          onClick={() => setActiveTab('before')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md civic-transition ${
            activeTab === 'before'
              ? 'bg-card text-foreground civic-shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          Before Photos ({beforePhotos?.length})
        </button>
        <button
          onClick={() => setActiveTab('after')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md civic-transition ${
            activeTab === 'after' ?'bg-card text-foreground civic-shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          After Photos ({afterPhotos?.length})
        </button>
      </div>
      {/* Photo Grid */}
      <div className="space-y-6">
        {activeTab === 'before' && (
          <div>
            {beforePhotos?.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {beforePhotos?.map((photo, index) => (
                  <div
                    key={index}
                    className="relative group cursor-pointer"
                    onClick={() => openPhotoModal(photo, 'before')}
                  >
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={photo?.url}
                        alt={`Before photo ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 civic-transition"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 civic-transition rounded-lg flex items-center justify-center">
                      <Icon 
                        name="Expand" 
                        size={24} 
                        className="text-white opacity-0 group-hover:opacity-100 civic-transition"
                      />
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {new Date(photo.timestamp)?.toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Icon name="Camera" size={48} className="mx-auto mb-4 opacity-50" />
                <p>Original issue photos</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'after' && (
          <div>
            {afterPhotos?.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {afterPhotos?.map((photo, index) => (
                  <div
                    key={index}
                    className="relative group cursor-pointer"
                    onClick={() => openPhotoModal(photo, 'after')}
                  >
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={photo?.url}
                        alt={`After photo ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 civic-transition"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 civic-transition rounded-lg flex items-center justify-center">
                      <Icon 
                        name="Expand" 
                        size={24} 
                        className="text-white opacity-0 group-hover:opacity-100 civic-transition"
                      />
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {new Date(photo.timestamp)?.toLocaleDateString()}
                    </div>
                    <div className="absolute top-2 right-2 bg-success text-success-foreground text-xs px-2 py-1 rounded">
                      Completed
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Icon name="Camera" size={48} className="mx-auto mb-4 opacity-50" />
                <p>Completion photos will appear here</p>
                <p className="text-xs mt-2">Uploaded by field staff upon completion</p>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-1300 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80"
            onClick={closePhotoModal}
          />
          <div className="relative bg-card rounded-lg civic-shadow-lg max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-semibold text-card-foreground">
                {selectedPhoto?.type === 'before' ? 'Before' : 'After'} Photo
              </h3>
              <Button variant="ghost" size="icon" onClick={closePhotoModal}>
                <Icon name="X" size={20} />
              </Button>
            </div>
            <div className="p-4">
              <Image
                src={selectedPhoto?.url}
                alt={`${selectedPhoto?.type} photo`}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              <div className="mt-4 text-sm text-muted-foreground">
                <p>Taken: {new Date(selectedPhoto.timestamp)?.toLocaleString()}</p>
                {selectedPhoto?.uploadedBy && (
                  <p>Uploaded by: {selectedPhoto?.uploadedBy}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;