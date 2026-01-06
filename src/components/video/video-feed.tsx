import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VideoPlayer } from './video-player';
import { VideoHUD } from './video-hud';
import type { Video } from '../../lib/mock-data';

interface VideoFeedProps {
    videos: Video[];
    onOpenMentor: (video: Video) => void;
}

export function VideoFeed({ videos, onOpenMentor }: VideoFeedProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [videoStates, setVideoStates] = useState<Record<string, { isLiked: boolean; currentTime: number }>>({});
    const containerRef = useRef<HTMLDivElement>(null);

    // Initialize video states
    useEffect(() => {
        const states: Record<string, { isLiked: boolean; currentTime: number }> = {};
        videos.forEach(video => {
            states[video.id] = { isLiked: video.isLiked, currentTime: 0 };
        });
        setVideoStates(states);
    }, [videos]);

    // Handle scroll snap to detect current video
    const handleScroll = useCallback(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const scrollTop = container.scrollTop;
        const itemHeight = container.clientHeight;
        const newIndex = Math.round(scrollTop / itemHeight);

        if (newIndex !== currentIndex && newIndex >= 0 && newIndex < videos.length) {
            setCurrentIndex(newIndex);
        }
    }, [currentIndex, videos.length]);

    // Add scroll listener
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const handleLike = (videoId: string) => {
        setVideoStates(prev => ({
            ...prev,
            [videoId]: {
                ...prev[videoId],
                isLiked: !prev[videoId]?.isLiked
            }
        }));
    };

    const handleTimeUpdate = (videoId: string, time: number) => {
        setVideoStates(prev => ({
            ...prev,
            [videoId]: {
                ...prev[videoId],
                currentTime: time
            }
        }));
    };

    const handleShare = (video: Video) => {
        // Mock share - in real app would use Web Share API
        if (navigator.share) {
            navigator.share({
                title: video.title,
                text: `Check out this video: ${video.title} by ${video.creator}`,
                url: window.location.href,
            }).catch(() => { });
        } else {
            // Fallback - copy to clipboard
            navigator.clipboard.writeText(`${video.title} - ${window.location.href}`);
        }
    };

    return (
        <div
            ref={containerRef}
            className="video-feed h-screen w-full"
        >
            {videos.map((video, index) => (
                <div
                    key={video.id}
                    className="video-item relative w-full h-screen flex-shrink-0"
                >
                    <VideoPlayer
                        video={video}
                        isActive={index === currentIndex}
                        currentTime={videoStates[video.id]?.currentTime || 0}
                        onTimeUpdate={(time) => handleTimeUpdate(video.id, time)}
                    />

                    <AnimatePresence>
                        {index === currentIndex && (
                            <motion.div
                                className="absolute inset-0 pointer-events-none"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <VideoHUD
                                    video={video}
                                    currentTime={videoStates[video.id]?.currentTime || 0}
                                    isLiked={videoStates[video.id]?.isLiked || false}
                                    onLike={() => handleLike(video.id)}
                                    onShare={() => handleShare(video)}
                                    onOpenMentor={() => onOpenMentor(video)}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}

export default VideoFeed;
