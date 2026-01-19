import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    FavouriteIcon,
    Share01Icon,
    AiBrain01Icon,
    Note01Icon,
    CheckmarkBadge01Icon,
    FlashIcon,
    Cancel01Icon,
    Message01Icon
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
    onZiAbotAction?: (action: 'chat' | 'notes' | 'practice' | 'flashcards') => void;
    onOpenComments?: () => void;
    onOpenCreatorProfile?: () => void;
}

export function VideoHUD({
    video,
    currentTime,
    isLiked,
    onLike,
    onShare,
    onOpenMentor,
    onZiAbotAction,
    onOpenComments,
    onOpenCreatorProfile
}: VideoHUDProps) {
    const progress = (currentTime / video.duration) * 100;
    const [showZiAbotMenu, setShowZiAbotMenu] = useState(false);

    const handleBrainClick = () => {
        setShowZiAbotMenu(!showZiAbotMenu);
    };

    const handleZiAbotAction = (action: 'chat' | 'notes' | 'practice' | 'flashcards') => {
        setShowZiAbotMenu(false);
        if (action === 'chat') {
            onOpenMentor();
        } else {
            onZiAbotAction?.(action);
        }
    };

    return (
        <>
            {/* Top gradient for status bar visibility - enhanced */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />

            {/* ZiAbot Action Menu Popup */}
            <AnimatePresence>
                {showZiAbotMenu && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="absolute inset-0 bg-black/30 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowZiAbotMenu(false)}
                        />

                        {/* Menu */}
                        <motion.div
                            className="absolute right-4 bottom-48 z-50 glass-strong rounded-xl overflow-hidden w-56"
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        >
                            <div className="px-3 py-2 border-b border-slate-700/50">
                                <p className="text-xs font-semibold text-slate-400">ZiAbot Actions</p>
                                <p className="text-[10px] text-slate-500 mt-0.5 truncate">
                                    {video.title}
                                </p>
                            </div>

                            <div className="p-1">
                                <motion.button
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800/50 transition-colors"
                                    onClick={() => handleZiAbotAction('chat')}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="p-1.5 rounded-lg bg-indigo-500/20">
                                        <HugeiconsIcon icon={AiBrain01Icon} size={16} className="text-indigo-400" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-medium text-slate-50">Tanya Mentor</p>
                                        <p className="text-[10px] text-slate-400">Chat dengan AI</p>
                                    </div>
                                </motion.button>

                                <motion.button
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800/50 transition-colors"
                                    onClick={() => handleZiAbotAction('notes')}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="p-1.5 rounded-lg bg-emerald-500/20">
                                        <HugeiconsIcon icon={Note01Icon} size={16} className="text-emerald-400" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-medium text-slate-50">Buat Catatan</p>
                                        <p className="text-[10px] text-slate-400">Ringkasan materi video</p>
                                    </div>
                                </motion.button>

                                <motion.button
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800/50 transition-colors"
                                    onClick={() => handleZiAbotAction('practice')}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="p-1.5 rounded-lg bg-amber-500/20">
                                        <HugeiconsIcon icon={CheckmarkBadge01Icon} size={16} className="text-amber-400" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-medium text-slate-50">Latihan Soal</p>
                                        <p className="text-[10px] text-slate-400">Quiz dari video ini</p>
                                    </div>
                                </motion.button>

                                <motion.button
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800/50 transition-colors"
                                    onClick={() => handleZiAbotAction('flashcards')}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="p-1.5 rounded-lg bg-purple-500/20">
                                        <HugeiconsIcon icon={FlashIcon} size={16} className="text-purple-400" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-medium text-slate-50">Flashcards</p>
                                        <p className="text-[10px] text-slate-400">Kartu untuk mengingat</p>
                                    </div>
                                </motion.button>
                            </div>

                            <div className="px-1 pb-1">
                                <motion.button
                                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 text-slate-400 text-xs"
                                    onClick={() => setShowZiAbotMenu(false)}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <HugeiconsIcon icon={Cancel01Icon} size={12} />
                                    Tutup
                                </motion.button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

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

                {/* Comments button - Q&A style */}
                <motion.button
                    className="flex flex-col items-center gap-1"
                    onClick={onOpenComments}
                    whileTap={{ scale: 0.9 }}
                >
                    <div className="p-3 rounded-full glass text-slate-50">
                        <HugeiconsIcon icon={Message01Icon} size={24} strokeWidth={1.5} />
                    </div>
                    <span className="text-xs text-slate-300">Q&A</span>
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

                {/* Brain/ZiAbot button - Opens menu */}
                <motion.button
                    className="flex flex-col items-center gap-1"
                    onClick={handleBrainClick}
                    whileTap={{ scale: 0.9 }}
                >
                    <motion.div
                        className={`p-4 rounded-full text-white shadow-lg ${showZiAbotMenu
                            ? 'bg-indigo-600 shadow-indigo-600/30'
                            : 'bg-indigo-500 shadow-indigo-500/30'
                            }`}
                        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)' }}
                        animate={showZiAbotMenu ? { scale: 1.1 } : { scale: 1 }}
                    >
                        <HugeiconsIcon icon={AiBrain01Icon} size={28} strokeWidth={1.5} />
                    </motion.div>
                    <span className="text-xs text-indigo-300 font-medium">ZiAbot</span>
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

                {/* Compact info bar with enhanced gradient background */}
                <div className="compact-info-bar h-20 flex flex-col justify-end pb-3 px-4 pointer-events-auto bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                    {/* Creator Identity - B1 */}
                    <motion.button
                        className="flex items-center gap-2 mb-2"
                        onClick={onOpenCreatorProfile}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white/20">
                            {video.creator.charAt(0)}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-slate-50">{video.creator}</span>
                            <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px]">
                                <HugeiconsIcon icon={CheckmarkBadge01Icon} size={10} />
                                Tutor
                            </span>
                        </div>
                    </motion.button>

                    {/* Line 1: Video title - single line, truncate */}
                    <h2 className="text-base font-semibold text-slate-50 truncate drop-shadow-md">
                        {video.title}
                    </h2>

                    {/* Line 2: Subject • Grade • Time */}
                    <div className="flex items-center gap-1.5 text-sm text-slate-400">
                        <span>{video.subject}</span>
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

