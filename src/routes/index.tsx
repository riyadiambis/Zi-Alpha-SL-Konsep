import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { VideoFeed } from '../components/video/video-feed';
import { MentorChat } from '../components/chat/mentor-chat';
import { StreakFlame } from '../components/gamification/streak-flame';
import { XPToast, useXPToast } from '../components/gamification/xp-toast';
import { mockVideos, mockUser, XP_REWARDS } from '../lib/mock-data';
import type { Video } from '../lib/mock-data';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const [isMentorOpen, setIsMentorOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const { toast, showXPToast, hideXPToast } = useXPToast();

  const handleOpenMentor = (video: Video) => {
    setActiveVideo(video);
    setIsMentorOpen(true);
    // Show XP toast for asking mentor
    showXPToast(XP_REWARDS.ASK_MENTOR, 'Bertanya ke Mentor');
  };

  const handleCloseMentor = () => {
    setIsMentorOpen(false);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-slate-950">
      {/* Top navbar with streak */}
      <div className="absolute top-0 left-0 right-0 z-30 p-4 flex items-center justify-between pointer-events-none">
        <div className="glass-light rounded-full px-4 py-2 pointer-events-auto">
          <span className="text-sm font-semibold text-slate-50">Zi-Alpha</span>
        </div>

        <div className="glass-light rounded-full px-4 py-2 pointer-events-auto">
          <StreakFlame streak={mockUser.streak} isActive={true} />
        </div>
      </div>

      {/* Video Feed */}
      <VideoFeed
        videos={mockVideos}
        onOpenMentor={handleOpenMentor}
      />

      {/* Mentor Chat Bottom Sheet */}
      <MentorChat
        isOpen={isMentorOpen}
        onClose={handleCloseMentor}
        video={activeVideo}
      />

      {/* XP Toast */}
      <XPToast
        xp={toast.xp}
        reason={toast.reason}
        show={toast.show}
        onComplete={hideXPToast}
      />
    </div>
  );
}
