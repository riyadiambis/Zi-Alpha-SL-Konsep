import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    ArrowLeft02Icon,
    Settings02Icon,
    ChartLineData02Icon,
    StarIcon
} from '@hugeicons/core-free-icons';
import { StreakFlame } from '../components/gamification/streak-flame';
import { BadgeDisplay } from '../components/gamification/badge-display';
import { mockUser } from '../lib/mock-data';

export const Route = createFileRoute('/profile')({
    component: ProfilePage,
});

function ProfilePage() {
    // Calculate level progress (mock)
    const levelProgress = (mockUser.xp % 500) / 500 * 100;
    const xpToNextLevel = 500 - (mockUser.xp % 500);

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Header */}
            <header className="sticky top-0 z-20 glass-strong px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/">
                        <motion.button
                            className="p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
                            whileTap={{ scale: 0.95 }}
                        >
                            <HugeiconsIcon icon={ArrowLeft02Icon} size={24} className="text-slate-50" />
                        </motion.button>
                    </Link>
                    <h1 className="text-lg font-bold text-slate-50">Profile</h1>
                </div>

                <Link to="/settings">
                    <motion.button
                        className="p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
                        whileTap={{ scale: 0.95 }}
                    >
                        <HugeiconsIcon icon={Settings02Icon} size={24} className="text-slate-400" />
                    </motion.button>
                </Link>
            </header>

            {/* Profile card */}
            <section className="px-4 py-6">
                <motion.div
                    className="bg-slate-900 rounded-2xl p-6 border border-slate-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {/* Avatar and name */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                            {mockUser.name.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-50">{mockUser.name}</h2>
                            <p className="text-sm text-slate-400">{mockUser.grade}</p>
                        </div>
                    </div>

                    {/* Level progress */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-indigo-400">Level {mockUser.level}</span>
                            </div>
                            <span className="text-xs text-slate-400">{xpToNextLevel} XP to next</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full xp-bar-shimmer rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${levelProgress}%` }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                            />
                        </div>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                            <div className="flex justify-center mb-2">
                                <StreakFlame streak={mockUser.streak} isActive={true} />
                            </div>
                            <p className="text-xs text-slate-400">Day Streak</p>
                        </div>

                        <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                            <div className="flex items-center justify-center gap-1 mb-2">
                                <HugeiconsIcon icon={StarIcon} size={16} className="text-emerald-400" />
                                <span className="text-lg font-bold text-emerald-400">{mockUser.xp.toLocaleString()}</span>
                            </div>
                            <p className="text-xs text-slate-400">Total XP</p>
                        </div>

                        <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                            <div className="flex items-center justify-center gap-1 mb-2">
                                <HugeiconsIcon icon={ChartLineData02Icon} size={16} className="text-amber-400" />
                                <span className="text-lg font-bold text-amber-400">{mockUser.badges.length}</span>
                            </div>
                            <p className="text-xs text-slate-400">Badges</p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Badges section */}
            <section className="px-4 pb-6">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                    Earned Badges
                </h3>
                <BadgeDisplay badges={mockUser.badges} />
            </section>

            {/* Quick actions */}
            <section className="px-4 pb-8">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                    Quick Actions
                </h3>
                <div className="space-y-2">
                    <Link to="/downloads">
                        <motion.div
                            className="flex items-center justify-between p-4 bg-slate-900 rounded-xl border border-slate-800"
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="text-sm text-slate-50">My Downloads</span>
                            <span className="text-xs text-slate-400">3 videos</span>
                        </motion.div>
                    </Link>
                    <Link to="/settings">
                        <motion.div
                            className="flex items-center justify-between p-4 bg-slate-900 rounded-xl border border-slate-800"
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="text-sm text-slate-50">Settings</span>
                            <HugeiconsIcon icon={Settings02Icon} size={16} className="text-slate-400" />
                        </motion.div>
                    </Link>
                </div>
            </section>
        </div>
    );
}
