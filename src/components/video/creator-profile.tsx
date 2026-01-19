import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    Cancel01Icon,
    Video01Icon,
    CheckmarkBadge01Icon
} from '@hugeicons/core-free-icons';
import type { Video } from '../../lib/mock-data';

interface CreatorProfileProps {
    creator: {
        name: string;
        avatar: string;
        bio: string;
        subjects: string[];
        isVerified: boolean;
        videoCount: number;
    };
    videos: Video[];
    isOpen: boolean;
    onClose: () => void;
}

export function CreatorProfile({ creator, videos, isOpen, onClose }: CreatorProfileProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="absolute inset-0 z-50 bg-slate-950/95 flex flex-col"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 25 }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-slate-800">
                        <h2 className="font-semibold text-slate-50">Profil Pengajar</h2>
                        <motion.button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-slate-800"
                            whileTap={{ scale: 0.95 }}
                        >
                            <HugeiconsIcon icon={Cancel01Icon} size={20} className="text-slate-400" />
                        </motion.button>
                    </div>

                    {/* Profile */}
                    <div className="p-6 border-b border-slate-800">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                                {creator.avatar}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-lg font-bold text-slate-50">{creator.name}</h3>
                                    {creator.isVerified && (
                                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px]">
                                            <HugeiconsIcon icon={CheckmarkBadge01Icon} size={10} />
                                            Official Tutor
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-slate-400 mt-1">{creator.bio}</p>
                            </div>
                        </div>

                        {/* Subjects */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {creator.subjects.map((subject, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 rounded-full bg-slate-800 text-xs text-slate-300"
                                >
                                    {subject}
                                </span>
                            ))}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1 text-slate-400">
                                <HugeiconsIcon icon={Video01Icon} size={16} />
                                <span>{creator.videoCount} video</span>
                            </div>
                        </div>
                    </div>

                    {/* Videos */}
                    <div className="flex-1 overflow-y-auto p-4">
                        <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                            Video dari {creator.name}
                        </h4>
                        <div className="space-y-3">
                            {videos.map((video) => (
                                <motion.div
                                    key={video.id}
                                    className="flex gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className="w-24 h-16 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                                        <HugeiconsIcon icon={Video01Icon} size={20} className="text-slate-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-50 truncate">{video.title}</p>
                                        <p className="text-xs text-slate-500 mt-0.5">
                                            {video.subject} • Kelas {video.grade}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                                            <span>{video.likes} likes</span>
                                            <span>•</span>
                                            <span>{Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
