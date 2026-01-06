import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Video } from '../../lib/mock-data';

interface VideoPlayerProps {
    video: Video;
    isActive: boolean;
    currentTime: number;
    onTimeUpdate: (time: number) => void;
}

export function VideoPlayer({ video, isActive, currentTime, onTimeUpdate }: VideoPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(isActive);
    const [showPlayIndicator, setShowPlayIndicator] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Simulate video playback with timer
    useEffect(() => {
        if (isPlaying && isActive) {
            intervalRef.current = setInterval(() => {
                onTimeUpdate(currentTime + 1);
            }, 1000);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPlaying, isActive, currentTime, onTimeUpdate]);

    // Reset when video changes
    useEffect(() => {
        setIsPlaying(isActive);
    }, [video.id, isActive]);

    const handleTap = () => {
        setIsPlaying(!isPlaying);
        setShowPlayIndicator(true);
        setTimeout(() => setShowPlayIndicator(false), 500);
    };

    // Generate gradient background based on video subject
    const getGradientBySubject = (subject: string): string => {
        const gradients: Record<string, string> = {
            'Matematika': 'from-indigo-900 via-slate-900 to-slate-950',
            'IPA': 'from-emerald-900 via-slate-900 to-slate-950',
            'IPS': 'from-amber-900 via-slate-900 to-slate-950',
            'Bahasa Inggris': 'from-blue-900 via-slate-900 to-slate-950',
        };
        return gradients[subject] || 'from-slate-900 via-slate-900 to-slate-950';
    };

    return (
        <motion.div
            className={`relative w-full h-full bg-gradient-to-br ${getGradientBySubject(video.subject)} cursor-pointer`}
            onClick={handleTap}
            whileTap={{ scale: 0.995 }}
        >
            {/* Video placeholder - shows subject icon and label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
                    <span className="text-4xl">
                        {video.subject === 'Matematika' && '📐'}
                        {video.subject === 'IPA' && '🔬'}
                        {video.subject === 'IPS' && '🌍'}
                        {video.subject === 'Bahasa Inggris' && '📚'}
                    </span>
                </div>
                <span className="label-tech">{video.subject}</span>
            </div>

            {/* Play/Pause indicator */}
            {showPlayIndicator && (
                <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    initial={{ opacity: 1, scale: 0.8 }}
                    animate={{ opacity: 0, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="w-20 h-20 rounded-full glass flex items-center justify-center">
                        <span className="text-2xl">{isPlaying ? '▶' : '⏸'}</span>
                    </div>
                </motion.div>
            )}

            {/* Playing state indicator (small pulsing dot) */}
            {isPlaying && isActive && (
                <motion.div
                    className="absolute top-6 left-6 flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <motion.div
                        className="w-2 h-2 rounded-full bg-emerald-500"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                    />
                    <span className="text-xs text-slate-400">LIVE</span>
                </motion.div>
            )}
        </motion.div>
    );
}

export default VideoPlayer;
