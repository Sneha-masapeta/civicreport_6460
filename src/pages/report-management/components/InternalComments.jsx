import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const InternalComments = ({ reportId }) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock comments data
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Michael Chen',
      role: 'Municipal Administrator',
      content: `Initial assessment complete. This pothole appears to be on a high-traffic route and should be prioritized. Recommending assignment to Public Works Department with medium-high priority.`,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      avatar: null
    },
    {
      id: 2,
      author: 'Sarah Johnson',
      role: 'Field Inspector',
      content: `I've reviewed the location and photos. The pothole is approximately 18 inches in diameter and 4 inches deep. Will require standard asphalt repair. Estimated completion time: 2-3 hours.`,
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      avatar: null
    },
    {
      id: 3,
      author: 'David Chen',role: 'Maintenance Crew Lead',
      content: `Crew is scheduled for tomorrow morning. We have all necessary materials in stock. Weather forecast looks good for the repair work.`,
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      avatar: null
    }
  ]);

  const handleSubmitComment = async () => {
    if (!newComment?.trim()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const comment = {
      id: comments?.length + 1,
      author: 'Michael Chen',
      role: 'Municipal Administrator',
      content: newComment?.trim(),
      timestamp: new Date(),
      avatar: null
    };

    setComments(prev => [...prev, comment]);
    setNewComment('');
    setIsSubmitting(false);
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  const getInitials = (name) => {
    return name?.split(' ')?.map(word => word?.charAt(0))?.join('')?.toUpperCase()?.slice(0, 2);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 civic-shadow-sm">
      <h2 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
        <Icon name="MessageSquare" size={20} />
        Internal Communication
        <span className="text-sm font-normal text-muted-foreground">
          ({comments?.length} {comments?.length === 1 ? 'comment' : 'comments'})
        </span>
      </h2>
      <div className="space-y-6">
        {/* Comments List */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {comments?.map((comment) => (
            <div key={comment?.id} className="flex gap-3">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                  {comment?.avatar ? (
                    <img 
                      src={comment?.avatar} 
                      alt={comment?.author}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    getInitials(comment?.author)
                  )}
                </div>
              </div>

              {/* Comment Content */}
              <div className="flex-1 min-w-0">
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-card-foreground">
                        {comment?.author}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {comment?.role}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono">
                      {formatTimestamp(comment?.timestamp)}
                    </p>
                  </div>
                  <p className="text-sm text-card-foreground leading-relaxed">
                    {comment?.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Comment Form */}
        <div className="border-t border-border pt-4">
          <div className="space-y-3">
            <Input
              label="Add Internal Comment"
              type="text"
              placeholder="Share updates, coordination notes, or questions with the team..."
              value={newComment}
              onChange={(e) => setNewComment(e?.target?.value)}
              description="This comment will be visible to all municipal staff working on this report"
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="Lock" size={12} />
                <span>Internal use only - not visible to citizens</span>
              </div>
              
              <Button
                onClick={handleSubmitComment}
                loading={isSubmitting}
                disabled={!newComment?.trim()}
                size="sm"
                iconName="Send"
                iconPosition="left"
              >
                {isSubmitting ? 'Posting...' : 'Post Comment'}
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border-t border-border pt-4">
          <p className="text-xs text-muted-foreground mb-2">Quick Actions</p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setNewComment('Requesting additional photos from field team.')}
            >
              Request Photos
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setNewComment('Escalating to supervisor for priority review.')}
            >
              Escalate Issue
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setNewComment('Coordinating with utility companies for clearance.')}
            >
              Coordinate Utilities
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternalComments;