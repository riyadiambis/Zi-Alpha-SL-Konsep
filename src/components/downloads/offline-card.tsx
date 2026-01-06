import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    Download01Icon,
    PauseIcon,
    PlayIcon,
    CheckmarkCircle02Icon,
    Alert01Icon
} from '@hugeicons/core-free-icons';
import type { DownloadedVideo } from '../../lib/mock-data';

interface OfflineCardProps {
    download: DownloadedVideo;
    onPause?: () => void;
    onResume?: () => void;
    onPlay?: () => void;
}

const statusConfig = {
    downloading: {
        color: 'text-indigo-400',
        bgColor: 'bg-indigo-500',
        icon: Download01Icon,
        label: 'Downloading...',
    },
    completed: {
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-500',
        icon: CheckmarkCircle02Icon,
        label: 'Ready to watch',
    },
    paused: {
        color: 'text-amber-400',
        bgColor: 'bg-amber-500',
        icon: PauseIcon,
        label: 'Paused',
    },
    failed: {
        color: 'text-red-400',
        bgColor: 'bg-red-500',
        icon: Alert01Icon,
        label: 'Download failed',
    },
};

export function OfflineCard({ download, onPause, onResume, onPlay }: OfflineCardProps) {
    const { video, fileSize, progress, status } = download;
    const config = statusConfig[status];

    return (
        <motion.div
            className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
        >
            {/* Thumbnail area */}
            <div className="relative h-32 bg-gradient-to-br from-slate-800 to-slate-900">
                {/* Subject indicator */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl">
                        {video.subject === 'Matematika' && '📐'}
                        {video.subject === 'IPA' && '🔬'}
                        {video.subject === 'IPS' && '🌍'}
                        {video.subject === 'Bahasa Inggris' && '📚'}
                    </span>
                </div>

                {/* Status badge */}
                <div className="absolute top-3 right-3">
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm`}>
                        <HugeiconsIcon
                            icon={config.icon}
                            size={12}
                            className={config.color}
                            strokeWidth={2}
                        />
                        <span className={`text-[10px] ${config.color}`}>{config.label}</span>
                    </div>
                </div>

                {/* Play button overlay for completed */}
                {status === 'completed' && (
                    <motion.button
                        className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity"
                        onClick={onPlay}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                            <HugeiconsIcon icon={PlayIcon} size={20} className="text-white ml-0.5" />
                        </div>
                    </motion.button>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="font-semibold text-slate-50 text-sm line-clamp-2 mb-1">
                    {video.title}
                </h3>
                <p className="text-xs text-slate-400 mb-3">
                    {video.creator} • {video.grade}
                </p>

                {/* Progress bar for downloading */}
                {status === 'downloading' && (
                    <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-slate-500">{progress}%</span>
                            <span className="text-xs text-slate-500">{fileSize}</span>
                        </div>
                        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-indigo-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>
                )}

                {/* Footer info */}
                <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{fileSize}</span>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                        {status === 'downloading' && onPause && (
                            <button
                                onClick={onPause}
                                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                            >
                                <HugeiconsIcon icon={PauseIcon} size={16} className="text-slate-400" />
                            </button>
                        )}
                        {status === 'paused' && onResume && (
                            <button
                                onClick={onResume}
                                className="p-2 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 transition-colors"
                            >
                                <HugeiconsIcon icon={PlayIcon} size={16} className="text-indigo-400" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default OfflineCard;
