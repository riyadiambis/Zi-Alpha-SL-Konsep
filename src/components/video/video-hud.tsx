import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    FavouriteIcon,
    Share01Icon,
    AiBrain01Icon
} from '@hugeicons/core-free-icons';
import type { Video } from '../../lib/mock-data';
import { formatDuration, formatNumber } from '../../lib/mock-data';

interface VideoHUDProps {
    video: Video;
    currentTime: number;
    isLiked: boolean;
    onLike: () => void;
    onShare: () => void;
    onOpenMentor: () => void;
}

export function VideoHUD({
    video,
    currentTime,
    isLiked,
    onLike,
    onShare,
    onOpenMentor
}: VideoHUDProps) {
    const progress = (currentTime / video.duration) * 100;

    return (
        <>
            {/* Top gradient for status bar visibility */}
            <div className="absolute top-0 left-0 right-0 h-24 video-gradient-top pointer-events-none" />

            {/* Right sidebar actions - positioned above the compact info bar */}
            <div className="absolute right-4 bottom-36 flex flex-col items-center gap-6">
                {/* Like button */}
                <motion.button
                    className="flex flex-col items-center gap-1"
                    onClick={onLike}
                    whileTap={{ scale: 0.9 }}
                >
                    <motion.div
                        className={`p-3 rounded-full glass ${isLiked ? 'text-emerald-500' : 'text-slate-50'}`}
                        animate={isLiked ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.3 }}
                    >
                        <HugeiconsIcon
                            icon={FavouriteIcon}
                            size={24}
                            strokeWidth={1.5}
                            fill={isLiked ? 'currentColor' : 'none'}
                        />
                    </motion.div>
                    <span className="text-xs text-slate-300">
                        {formatNumber(video.likes + (isLiked ? 1 : 0))}
                    </span>
                </motion.button>

                {/* Share button */}
                <motion.button
                    className="flex flex-col items-center gap-1"
                    onClick={onShare}
                    whileTap={{ scale: 0.9 }}
                >
                    <div className="p-3 rounded-full glass text-slate-50">
                        <HugeiconsIcon icon={Share01Icon} size={24} strokeWidth={1.5} />
                    </div>
                    <span className="text-xs text-slate-300">Share</span>
                </motion.button>

                {/* Brain/Mentor button - Prominent */}
                <motion.button
                    className="flex flex-col items-center gap-1"
                    onClick={onOpenMentor}
                    whileTap={{ scale: 0.9 }}
                >
                    <motion.div
                        className="p-4 rounded-full bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)' }}
                    >
                        <HugeiconsIcon icon={AiBrain01Icon} size={28} strokeWidth={1.5} />
                    </motion.div>
                    <span className="text-xs text-indigo-300 font-medium">Mentor</span>
                </motion.button>
            </div>

            {/* Compact Bottom Info Bar (TikTok-like) - Height: 64px */}
            <div className="absolute bottom-16 left-0 right-0 pointer-events-none">
                {/* Progress bar - 2px directly above info bar */}
                <div className="h-[2px] bg-slate-800/50">
                    <motion.div
                        className="h-full bg-indigo-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: 'linear' }}
                    />
                </div>

                {/* Compact info bar with gradient background */}
                <div className="compact-info-bar h-16 flex flex-col justify-center px-4 pointer-events-auto">
                    {/* Line 1: Video title - single line, truncate */}
                    <h2 className="text-base font-semibold text-slate-50 truncate drop-shadow-md">
                        {video.title}
                    </h2>

                    {/* Line 2: Creator • Grade • Time */}
                    <div className="flex items-center gap-1.5 text-sm text-slate-400">
                        <span className="font-medium text-slate-300">{video.creator}</span>
                        <span>•</span>
                        <span>{video.grade}</span>
                        <span>•</span>
                        <span>{formatDuration(currentTime)} / {formatDuration(video.duration)}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VideoHUD;
