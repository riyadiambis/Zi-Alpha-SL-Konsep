import { useState } from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    ArrowLeft02Icon,
    Settings02Icon,
    ChartLineData02Icon,
    StarIcon,
    Download01Icon,
    Video01Icon,
    UserIcon,
    PaintBoardIcon,
    ArrowRight01Icon,
    CheckmarkCircle02Icon,
    Clock01Icon,
    Edit02Icon
} from '@hugeicons/core-free-icons';
import { StreakFlame } from '../components/gamification/streak-flame';
import { BadgeDisplay } from '../components/gamification/badge-display';
import { mockUser, mockCreatorContent, mockDownloads, type CreatorContentStatus } from '../lib/mock-data';

export const Route = createFileRoute('/profile')({
    component: ProfilePage,
});

function ProfilePage() {
    const navigate = useNavigate();
    const [isCreatorMode, setIsCreatorMode] = useState(false);

    // Calculate level progress (mock)
    const levelProgress = (mockUser.xp % 500) / 500 * 100;
    const xpToNextLevel = 500 - (mockUser.xp % 500);

    const statusColors: Record<CreatorContentStatus, { bg: string; text: string; label: string }> = {
        draft: { bg: 'bg-slate-500/20', text: 'text-slate-400', label: 'Draft' },
        review: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: 'Under Review' },
        approved: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'Approved' },
        rejected: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Rejected' },
    };

    const statusIcons: Record<CreatorContentStatus, typeof CheckmarkCircle02Icon> = {
        draft: Edit02Icon,
        review: Clock01Icon,
        approved: CheckmarkCircle02Icon,
        rejected: CheckmarkCircle02Icon,
    };

    return (
        <div className="min-h-screen bg-slate-950 pb-20">
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

            {/* Role Toggle */}
            <section className="px-4 pt-4">
                <div className="flex items-center justify-between p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-3">
                        <HugeiconsIcon
                            icon={isCreatorMode ? Video01Icon : UserIcon}
                            size={20}
                            className={isCreatorMode ? 'text-purple-400' : 'text-indigo-400'}
                        />
                        <div>
                            <p className="text-sm font-medium text-slate-50">
                                {isCreatorMode ? 'Creator Mode' : 'Student Mode'}
                            </p>
                            <p className="text-xs text-slate-500">
                                {isCreatorMode ? 'Create and manage content' : 'Learn and practice'}
                            </p>
                        </div>
                    </div>
                    <motion.button
                        onClick={() => setIsCreatorMode(!isCreatorMode)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${isCreatorMode ? 'bg-purple-500' : 'bg-slate-700'
                            }`}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div
                            className="absolute top-1 w-4 h-4 bg-white rounded-full"
                            animate={{ left: isCreatorMode ? 28 : 4 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                    </motion.button>
                </div>
            </section>

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

            {/* Creator Mode Section */}
            <AnimatePresence>
                {isCreatorMode && (
                    <motion.section
                        className="px-4 pb-6"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-4">
                            Creator Tools
                        </h3>

                        {/* Explain Mode Entry */}
                        <motion.button
                            onClick={() => navigate({ to: '/creator/explain' as any })}
                            className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-xl border border-purple-500/30 mb-4"
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="p-3 rounded-xl bg-purple-500/20">
                                <HugeiconsIcon icon={PaintBoardIcon} size={24} className="text-purple-400" />
                            </div>
                            <div className="flex-1 text-left">
                                <p className="font-semibold text-slate-50">Explain Mode</p>
                                <p className="text-xs text-slate-400">Create lessons with camera + canvas</p>
                            </div>
                            <HugeiconsIcon icon={ArrowRight01Icon} size={20} className="text-slate-400" />
                        </motion.button>

                        {/* My Content */}
                        <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
                            My Content
                        </h4>
                        <div className="space-y-2">
                            {mockCreatorContent.map((content, index) => {
                                const status = statusColors[content.status];
                                const StatusIcon = statusIcons[content.status];
                                return (
                                    <motion.div
                                        key={content.id}
                                        className="flex items-center gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center">
                                            <HugeiconsIcon icon={Video01Icon} size={20} className="text-slate-500" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-slate-50 truncate">{content.title}</p>
                                            <p className="text-xs text-slate-500">{content.subject}</p>
                                        </div>
                                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${status.bg}`}>
                                            <HugeiconsIcon icon={StatusIcon} size={12} className={status.text} />
                                            <span className={`text-[10px] font-medium ${status.text}`}>{status.label}</span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

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
                            <div className="flex items-center gap-3">
                                <HugeiconsIcon icon={Download01Icon} size={18} className="text-slate-400" />
                                <span className="text-sm text-slate-50">My Downloads</span>
                            </div>
                            <span className="text-xs text-slate-400">{mockDownloads.length} videos</span>
                        </motion.div>
                    </Link>
                    <Link to="/settings">
                        <motion.div
                            className="flex items-center justify-between p-4 bg-slate-900 rounded-xl border border-slate-800"
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex items-center gap-3">
                                <HugeiconsIcon icon={Settings02Icon} size={18} className="text-slate-400" />
                                <span className="text-sm text-slate-50">Settings</span>
                            </div>
                            <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="text-slate-400" />
                        </motion.div>
                    </Link>
                </div>
            </section>
        </div>
    );
}
