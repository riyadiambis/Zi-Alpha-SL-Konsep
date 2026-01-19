import { createFileRoute, Link, useParams } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    ArrowLeft02Icon,
    PlayIcon,
    AiBrain01Icon,
    CheckmarkCircle02Icon,
    Clock01Icon,
    Video01Icon
} from '@hugeicons/core-free-icons';
import { mockSubjects, mockTopics, mockSubjectProgress, mockVideos } from '../lib/mock-data';

export const Route = createFileRoute('/explore/$subjectId')({
    component: SubjectDetailPage,
});

function SubjectDetailPage() {
    const { subjectId } = useParams({ from: '/explore/$subjectId' });

    const subject = mockSubjects.find(s => s.id === subjectId);
    const topics = mockTopics.filter(t => t.subjectId === subjectId);
    const progress = mockSubjectProgress.find(p => p.subjectId === subjectId);

    // Get videos for this subject
    const subjectVideos = mockVideos.filter(v =>
        v.subject.toLowerCase() === subject?.name.toLowerCase()
    );

    if (!subject) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <p className="text-slate-400">Subject not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 pb-24">
            {/* Header */}
            <div className="sticky top-0 z-30 glass-strong border-b border-slate-800/50">
                <div className="px-4 py-3 flex items-center gap-3">
                    <Link to="/explore">
                        <motion.button
                            className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
                            whileTap={{ scale: 0.95 }}
                        >
                            <HugeiconsIcon icon={ArrowLeft02Icon} size={20} className="text-slate-50" />
                        </motion.button>
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-lg font-bold text-slate-50">{subject.name}</h1>
                        <p className="text-xs text-slate-400">Kelas 7-9 SMP</p>
                    </div>
                </div>
            </div>

            {/* Subject Hero */}
            <div className="px-4 py-6">
                <motion.div
                    className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {/* Progress */}
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-300">Progress Belajar</span>
                            <span className="text-sm font-semibold text-indigo-400">{progress?.progress || 0}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress?.progress || 0}%` }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                            />
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                            <p className="text-xl font-bold text-slate-50">{topics.length}</p>
                            <p className="text-xs text-slate-400">Topik</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-bold text-slate-50">{subjectVideos.length}</p>
                            <p className="text-xs text-slate-400">Video</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-bold text-slate-50">{progress?.completedTopics || 0}</p>
                            <p className="text-xs text-slate-400">Selesai</p>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-2">
                        <motion.button
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-500 text-white font-medium text-sm"
                            whileTap={{ scale: 0.98 }}
                        >
                            <HugeiconsIcon icon={PlayIcon} size={18} />
                            Mulai Belajar
                        </motion.button>
                        <Link to="/ziabot" className="flex-1">
                            <motion.button
                                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 text-slate-300 font-medium text-sm border border-slate-700"
                                whileTap={{ scale: 0.98 }}
                            >
                                <HugeiconsIcon icon={AiBrain01Icon} size={18} />
                                Tanya ZiAbot
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Learning History Card */}
            {progress?.lastWatchedVideo && (
                <div className="px-4 mb-6">
                    <h2 className="text-sm font-semibold text-slate-400 mb-3">Lanjutkan Belajar</h2>
                    <motion.div
                        className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="w-16 h-16 rounded-lg bg-slate-800 flex items-center justify-center">
                            <HugeiconsIcon icon={Video01Icon} size={24} className="text-slate-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-50 truncate">{progress.lastWatchedVideo}</p>
                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                <HugeiconsIcon icon={Clock01Icon} size={12} />
                                Terakhir ditonton
                            </p>
                        </div>
                        <motion.button
                            className="p-3 rounded-full bg-indigo-500/20 text-indigo-400"
                            whileTap={{ scale: 0.9 }}
                        >
                            <HugeiconsIcon icon={PlayIcon} size={20} />
                        </motion.button>
                    </motion.div>
                </div>
            )}

            {/* Topics / Playlists */}
            <div className="px-4">
                <h2 className="text-sm font-semibold text-slate-400 mb-3">Topik & Playlist</h2>
                <div className="space-y-3">
                    {topics.map((topic, index) => (
                        <motion.div
                            key={topic.id}
                            className="p-4 rounded-xl bg-slate-900 border border-slate-800"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${topic.isCompleted
                                        ? 'bg-emerald-500/20 text-emerald-400'
                                        : 'bg-slate-800 text-slate-400'
                                    }`}>
                                    {topic.isCompleted ? (
                                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20} />
                                    ) : (
                                        <span className="text-sm font-semibold">{index + 1}</span>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-slate-50">{topic.name}</p>
                                    <p className="text-xs text-slate-500 mt-0.5">{topic.videoCount} video</p>

                                    {/* Progress bar for topic */}
                                    <div className="mt-2 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${topic.isCompleted ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                                            style={{ width: `${topic.isCompleted ? 100 : topic.progress || 0}%` }}
                                        />
                                    </div>
                                </div>
                                <motion.button
                                    className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-indigo-400 transition-colors"
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <HugeiconsIcon icon={PlayIcon} size={16} />
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
