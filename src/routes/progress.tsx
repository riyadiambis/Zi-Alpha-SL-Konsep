import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    Award01Icon,
    FireIcon,
    StarIcon,
    ChartLineData02Icon,
    Clock01Icon,
    SwordIcon,
    ArrowRight01Icon
} from '@hugeicons/core-free-icons';
import { mockUser, mockSubjects, mockSubjectProgress, mockWeeklySummary, mockAchievements } from '../lib/mock-data';

export const Route = createFileRoute('/progress')({
    component: ProgressPage,
});

function ProgressPage() {
    const levelProgress = (mockUser.xp % 500) / 500 * 100;
    const xpToNextLevel = 500 - (mockUser.xp % 500);

    return (
        <div className="min-h-screen bg-slate-950 pb-20">
            <header className="sticky top-0 z-30 glass-strong px-4 py-4 border-b border-slate-800/50">
                <div className="flex items-center gap-3">
                    <HugeiconsIcon icon={ChartLineData02Icon} size={24} className="text-indigo-400" />
                    <h1 className="text-lg font-bold text-slate-50">Progress</h1>
                </div>
            </header>

            {/* Level Card - Hero Component with Circular Progress */}
            <section className="px-4 py-6">
                <motion.div
                    className="glass-card rounded-3xl p-8 relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />

                    <div className="relative flex flex-col items-center">
                        {/* Circular Level Indicator */}
                        <div className="relative w-32 h-32 mb-4">
                            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120">
                                <circle
                                    cx="60"
                                    cy="60"
                                    r="54"
                                    fill="none"
                                    stroke="rgb(30 41 59)"
                                    strokeWidth="8"
                                />
                                <motion.circle
                                    cx="60"
                                    cy="60"
                                    r="54"
                                    fill="none"
                                    stroke="url(#levelGradient)"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    initial={{ strokeDasharray: "0 339.292" }}
                                    animate={{ strokeDasharray: `${levelProgress * 3.39292} 339.292` }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                />
                                <defs>
                                    <linearGradient id="levelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="rgb(99 102 241)" />
                                        <stop offset="100%" stopColor="rgb(168 85 247)" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-xs text-indigo-300 font-medium">LEVEL</span>
                                <span className="text-3xl font-bold text-slate-50">{mockUser.level}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                            <HugeiconsIcon icon={StarIcon} size={20} className="text-emerald-400" />
                            <span className="text-2xl font-bold text-slate-50">{mockUser.xp.toLocaleString()}</span>
                            <span className="text-sm text-slate-400">XP</span>
                        </div>

                        <p className="text-xs text-slate-400">{xpToNextLevel} XP ke Level {mockUser.level + 1}</p>
                    </div>
                </motion.div>
            </section>

            {/* Quick Stats Row */}
            <section className="px-4 pb-6">
                <motion.div
                    className="bg-slate-900 rounded-2xl p-4 border border-slate-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-2">
                                <HugeiconsIcon icon={FireIcon} size={24} className="text-amber-500" />
                            </div>
                            <p className="text-2xl font-bold text-slate-50">{mockUser.streak}</p>
                            <p className="text-xs text-slate-500">Hari Streak</p>
                        </div>
                        <div className="flex flex-col items-center text-center border-x border-slate-800">
                            <div className="mb-2">
                                <HugeiconsIcon icon={Clock01Icon} size={24} className="text-indigo-400" />
                            </div>
                            <p className="text-2xl font-bold text-slate-50">{mockWeeklySummary.studyMinutes}</p>
                            <p className="text-xs text-slate-500">Menit Belajar</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-2">
                                <HugeiconsIcon icon={StarIcon} size={24} className="text-emerald-400" />
                            </div>
                            <p className="text-2xl font-bold text-slate-50">{mockWeeklySummary.xpEarned}</p>
                            <p className="text-xs text-slate-500">XP Minggu Ini</p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Boss Battle CTA - Prominent */}
            <section className="px-4 pb-6">
                <Link to="/boss-battle">
                    <motion.div
                        className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border-2 border-purple-500/50 hover:border-purple-400 transition-all shadow-lg shadow-purple-500/20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-transparent"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                        />
                        <div className="relative flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-purple-500/30 backdrop-blur-sm">
                                    <HugeiconsIcon icon={SwordIcon} size={28} className="text-purple-200" />
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-slate-50">Boss Battle</p>
                                    <p className="text-sm text-purple-200">Lawan Concept Boss sekarang!</p>
                                </div>
                            </div>
                            <HugeiconsIcon icon={ArrowRight01Icon} size={24} className="text-purple-300" />
                        </div>
                    </motion.div>
                </Link>
            </section>

            {/* Knowledge Arena CTA */}
            <section className="px-4 pb-6">
                <Link to="/knowledge-arena">
                    <motion.div
                        className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border-2 border-cyan-500/50 hover:border-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="relative flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-cyan-500/30 backdrop-blur-sm">
                                    <HugeiconsIcon icon={StarIcon} size={28} className="text-cyan-200" />
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-slate-50">Knowledge Arena</p>
                                    <p className="text-sm text-cyan-200">Quiz multiplayer pengetahuan umum!</p>
                                </div>
                            </div>
                            <HugeiconsIcon icon={ArrowRight01Icon} size={24} className="text-cyan-300" />
                        </div>
                    </motion.div>
                </Link>
            </section>

            {/* Fun Games CTA */}
            <section className="px-4 pb-6">
                <Link to="/fun-games">
                    <motion.div
                        className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-r from-amber-600/30 to-orange-600/30 border-2 border-amber-500/50 hover:border-amber-400 transition-all shadow-lg shadow-amber-500/20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="relative flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="text-3xl">🎮</span>
                                <div>
                                    <p className="text-lg font-bold text-slate-50">Fun Games</p>
                                    <p className="text-sm text-amber-200">Memory, Logic, Pattern & lebih!</p>
                                </div>
                            </div>
                            <HugeiconsIcon icon={ArrowRight01Icon} size={24} className="text-amber-300" />
                        </div>
                    </motion.div>
                </Link>
            </section>

            {/* Subject Progress List */}
            <section className="px-4 pb-6">
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                    Progress Mata Pelajaran
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
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-2xl">{subject?.icon}</span>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-slate-50">{subject?.name}</p>
                                        <p className="text-xs text-slate-500">{progress.topicsCompleted}/{progress.totalTopics} topik</p>
                                    </div>
                                    <span className="text-lg font-bold text-indigo-400">{progress.percentage}%</span>
                                </div>
                                <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress.percentage}%` }}
                                        transition={{ duration: 0.8, delay: 0.3 + index * 0.05 }}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Achievements Gallery - Horizontal Scroll */}
            <section className="px-4 pb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                        Achievements
                    </h2>
                    <div className="flex items-center gap-1">
                        <HugeiconsIcon icon={Award01Icon} size={14} className="text-amber-500" />
                        <span className="text-xs text-slate-400">{mockAchievements.filter(a => a.unlocked).length}/{mockAchievements.length}</span>
                    </div>
                </div>

                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {mockAchievements.map((achievement, index) => (
                        <motion.div
                            key={achievement.id}
                            className={`flex-shrink-0 w-24 h-24 rounded-xl border-2 flex flex-col items-center justify-center p-2 ${achievement.unlocked
                                ? 'bg-slate-900 border-amber-500/50 shadow-lg shadow-amber-500/20'
                                : 'bg-slate-900/30 border-slate-700 opacity-40'
                                }`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: achievement.unlocked ? 1 : 0.4, scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.05 }}
                        >
                            <span className={`text-3xl mb-1 ${achievement.unlocked ? '' : 'grayscale'}`}>
                                {achievement.icon}
                            </span>
                            <p className={`text-[9px] text-center leading-tight font-medium ${achievement.unlocked ? 'text-slate-300' : 'text-slate-600'
                                }`}>
                                {achievement.name}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
