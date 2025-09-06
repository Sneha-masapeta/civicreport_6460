import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StaffComments = ({ comments, isVisible = true }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isVisible || comments?.length === 0) {
    return null;
  }

  const visibleComments = isExpanded ? comments : comments?.slice(0, 2);

  return (
    <div className="bg-card rounded-lg border border-border civic-shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Internal Communications</h2>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Lock" size={14} />
          <span>Staff Only</span>
        </div>
      </div>
      <div className="space-y-4">
        {visibleComments?.map((comment) => (
          <div
            key={comment?.id}
            className="border border-border rounded-lg p-4 bg-muted/30"
          >
            <div className="flex items-start space-x-3">
              {/* Staff Avatar */}
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                  {comment?.author?.split(' ')?.map(n => n?.[0])?.join('')?.toUpperCase()}
                </div>
              </div>

              {/* Comment Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-sm font-medium text-foreground">
                      {comment?.author}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {comment?.department}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">
                    {new Date(comment.timestamp)?.toLocaleString()}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {comment?.message}
                </p>

                {/* Comment Tags */}
                {comment?.tags && comment?.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {comment?.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Attachments */}
                {comment?.attachments && comment?.attachments?.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {comment?.attachments?.map((attachment, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 text-xs text-muted-foreground"
                      >
                        <Icon name="Paperclip" size={12} />
                        <span>{attachment?.name}</span>
                        <span>({attachment?.size})</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Priority Flag */}
                {comment?.priority && (
                  <div className="mt-3">
                    <span className={`text-xs px-2 py-1 rounded ${
                      comment?.priority === 'urgent' ?'bg-error text-error-foreground'
                        : comment?.priority === 'high' ?'bg-warning text-warning-foreground' :'bg-accent text-accent-foreground'
                    }`}>
                      {comment?.priority} priority
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Show More/Less Button */}
        {comments?.length > 2 && (
          <div className="text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
              iconPosition="right"
            >
              {isExpanded 
                ? 'Show Less' 
                : `Show ${comments?.length - 2} More Comments`
              }
            </Button>
          </div>
        )}
      </div>
      {/* Communication Guidelines */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Info" size={14} className="text-primary" />
            <span className="text-xs font-medium text-foreground">
              Transparency Note
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Internal staff communications are shared to provide transparency in the resolution process. 
            Personal information and sensitive details are filtered out.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StaffComments;