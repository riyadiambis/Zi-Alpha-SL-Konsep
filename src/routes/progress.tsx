import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    Award01Icon,
    FireIcon,
    StarIcon,
    ChartLineData02Icon,
    Calendar03Icon
} from '@hugeicons/core-free-icons';
import { StreakFlame } from '../components/gamification/streak-flame';
import { BadgeDisplay } from '../components/gamification/badge-display';
import { mockUser, mockSubjects, mockSubjectProgress, mockWeeklySummary, mockAchievements } from '../lib/mock-data';

export const Route = createFileRoute('/progress')({
    component: ProgressPage,
});

function ProgressPage() {
    // Calculate level progress
    const levelProgress = (mockUser.xp % 500) / 500 * 100;
    const xpToNextLevel = 500 - (mockUser.xp % 500);

    return (
        <div className="min-h-screen bg-slate-950 pb-20">
            {/* Header */}
            <header className="sticky top-0 z-30 glass-strong px-4 py-4">
                <div className="flex items-center gap-3">
                    <HugeiconsIcon icon={ChartLineData02Icon} size={24} className="text-indigo-400" />
                    <h1 className="text-lg font-bold text-slate-50">Progress</h1>
                </div>
            </header>

            {/* XP and Level Card */}
            <section className="px-4 py-6">
                <motion.div
                    className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-2xl p-6 border border-indigo-500/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-xs text-indigo-300 uppercase tracking-wider">Level</p>
                            <p className="text-3xl font-bold text-slate-50">{mockUser.level}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-indigo-300 uppercase tracking-wider">Total XP</p>
                            <div className="flex items-center gap-1">
                                <HugeiconsIcon icon={StarIcon} size={18} className="text-emerald-400" />
                                <span className="text-2xl font-bold text-emerald-400">{mockUser.xp.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Level progress bar */}
                    <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-2">
                            <span>Progress ke Level {mockUser.level + 1}</span>
                            <span>{xpToNextLevel} XP lagi</span>
                        </div>
                        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full xp-bar-shimmer rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${levelProgress}%` }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                            />
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Streak Section */}
            <section className="px-4 pb-6">
                <motion.div
                    className="bg-slate-900 rounded-2xl p-5 border border-slate-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-amber-500/20">
                                <StreakFlame streak={mockUser.streak} isActive={true} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-50">{mockUser.streak} Hari</p>
                                <p className="text-sm text-slate-400">Learning Streak</p>
                            </div>
                        </div>
                        <HugeiconsIcon icon={FireIcon} size={32} className="text-amber-500/30" />
                    </div>
                </motion.div>
            </section>

            {/* Weekly Summary */}
            <section className="px-4 pb-6">
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                    Ringkasan Minggu Ini
                </h2>
                <motion.div
                    className="bg-slate-900 rounded-2xl p-5 border border-slate-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                >
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-2xl font-bold text-indigo-400">{mockWeeklySummary.videosWatched}</p>
                            <p className="text-xs text-slate-500">Video Ditonton</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-emerald-400">{mockWeeklySummary.quizzesTaken}</p>
                            <p className="text-xs text-slate-500">Quiz Selesai</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-amber-400">{mockWeeklySummary.xpEarned}</p>
                            <p className="text-xs text-slate-500">XP Diperoleh</p>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
                        <HugeiconsIcon icon={Calendar03Icon} size={14} />
                        <span>{mockWeeklySummary.studyMinutes} menit belajar minggu ini</span>
                    </div>
                </motion.div>
            </section>

            {/* Subject Progress */}
            <section className="px-4 pb-6">
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                    Progress per Mata Pelajaran
                </h2>
                <div className="space-y-3">
                    {mockSubjectProgress.map((progress, index) => {
                        const subject = mockSubjects.find(s => s.id === progress.subjectId);
                        return (
                            <motion.div
                                key={progress.subjectId}
                                className="bg-slate-900 rounded-xl p-4 border border-slate-800"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + index * 0.05 }}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-lg">{subject?.icon}</span>
                                    <span className="text-sm font-medium text-slate-50 flex-1">{subject?.name}</span>
                                    <span className="text-xs text-indigo-400 font-medium">{progress.percentage}%</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-indigo-500 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress.percentage}%` }}
                                        transition={{ duration: 0.8, delay: 0.3 + index * 0.05 }}
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-1">{progress.topicsCompleted}/{progress.totalTopics} topik selesai</p>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Achievements */}
            <section className="px-4 pb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                        Achievements
                    </h2>
                    <span className="text-xs text-indigo-400">{mockAchievements.filter(a => a.unlocked).length}/{mockAchievements.length}</span>
                </div>

                <div className="grid grid-cols-4 gap-3">
                    {mockAchievements.map((achievement, index) => (
                        <motion.div
                            key={achievement.id}
                            className={`relative aspect-square rounded-xl border flex flex-col items-center justify-center p-2 ${achievement.unlocked
                                ? 'bg-slate-900 border-amber-500/30'
                                : 'bg-slate-900/50 border-slate-800 opacity-50'
                                }`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.05 }}
                        >
                            <span className="text-2xl mb-1">{achievement.icon}</span>
                            <p className="text-[10px] text-center text-slate-400 leading-tight">{achievement.name}</p>
                            {achievement.unlocked && (
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
                                    <HugeiconsIcon icon={Award01Icon} size={10} className="text-white" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Badges */}
            <section className="px-4 pb-8">
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                    Badges Earned
                </h2>
                <BadgeDisplay badges={mockUser.badges} />
            </section>
        </div>
    );
}
