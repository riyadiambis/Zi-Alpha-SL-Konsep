import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { VideoFeed } from '../components/video/video-feed';
import { MentorChat } from '../components/chat/mentor-chat';
import { StreakFlame } from '../components/gamification/streak-flame';
import { XPToast, useXPToast } from '../components/gamification/xp-toast';
import { mockVideos, mockUser, XP_REWARDS, generateMockNotes, generateMockPracticeQuestions, generateMockFlashcards } from '../lib/mock-data';
import type { Video, ZiAbotContext } from '../lib/mock-data';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const [isMentorOpen, setIsMentorOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const { toast, showXPToast, hideXPToast } = useXPToast();
  const navigate = useNavigate();

  const handleOpenMentor = (video: Video) => {
    setActiveVideo(video);
    setIsMentorOpen(true);
    // Show XP toast for asking mentor
    showXPToast(XP_REWARDS.ASK_MENTOR, 'Bertanya ke Mentor');
  };

  const handleCloseMentor = () => {
    setIsMentorOpen(false);
  };

  const handleZiAbotAction = (video: Video, action: 'notes' | 'practice' | 'flashcards') => {
    // Create video context
    const context: ZiAbotContext = {
      type: 'video',
      videoId: video.id,
      videoTitle: video.title,
      subject: video.subject,
      grade: video.grade,
    };

    // Generate artifact and store in sessionStorage
    if (action === 'notes') {
      const notes = generateMockNotes(video.title, context);
      sessionStorage.setItem('ziabot-notes', JSON.stringify(notes));
      navigate({ to: '/ziabot/notes' as any });
    } else if (action === 'practice') {
      const practice = generateMockPracticeQuestions(video.title, context);
      sessionStorage.setItem('ziabot-practice', JSON.stringify(practice));
      navigate({ to: '/ziabot/practice' as any });
    } else if (action === 'flashcards') {
      const flashcards = generateMockFlashcards(video.title, context);
      sessionStorage.setItem('ziabot-flashcards', JSON.stringify(flashcards));
      navigate({ to: '/ziabot/flashcards' as any });
    }
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
        onZiAbotAction={handleZiAbotAction}
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

