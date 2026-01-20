import { createFileRoute, Link, Outlet, useMatches } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    SwordIcon,
    Shield01Icon,
    Target01Icon,
    ArrowRight01Icon,
    ArrowLeft01Icon,
    SparklesIcon,
    UserMultiple02Icon
} from '@hugeicons/core-free-icons';
import {
    mockBosses,
    mockUser,
    calculateBattleHP,
    type Boss
} from '../lib/mock-data';

export const Route = createFileRoute('/boss-battle')({
    component: BossBattleLayout,
});

function BossBattleLayout() {
    const matches = useMatches();
    const isChildRoute = matches.some(match => match.id.includes('$battleId'));

    // If on a child route (battle screen), render the outlet only
    if (isChildRoute) {
        return <Outlet />;
    }

    // Otherwise render the lobby
    return <BossBattleLobbyPage />;
}

function BossBattleLobbyPage() {
    const playerBattleHP = calculateBattleHP(mockUser.xp);

    // Separate practice boss from regular bosses
    const practiceBoss = mockBosses.find(b => b.isPractice);
    const regularBosses = mockBosses.filter(b => !b.isPractice);

    return (
        <div className="min-h-screen bg-slate-950 pb-20">
            {/* Header */}
            <div className="sticky top-0 z-30 glass-strong px-4 py-4 border-b border-slate-800/50">
                <div className="flex items-center gap-3">
                    <Link to="/progress">
                        <motion.button
                            className="p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
                            whileTap={{ scale: 0.9 }}
                        >
                            <HugeiconsIcon icon={ArrowLeft01Icon} size={20} className="text-slate-400" />
                        </motion.button>
                    </Link>
                    <div className="p-2 rounded-xl bg-purple-500/20">
                        <HugeiconsIcon icon={SwordIcon} size={24} className="text-purple-400" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-slate-50">Boss Battle</h1>
                        <p className="text-xs text-slate-400">Tantang boss dan uji pemahamanmu!</p>
                    </div>
                </div>
            </div>

            <div className="px-4 py-4 space-y-6">
                {/* Player Stats Card */}
                <motion.div
                    className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-emerald-500/20">
                                <HugeiconsIcon icon={Shield01Icon} size={16} className="text-emerald-400" />
                            </div>
                            <span className="text-sm font-semibold text-slate-50">Battle Stats</span>
                        </div>
                        <span className="text-xs text-slate-400">Level {mockUser.level}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-slate-800/50">
                            <p className="text-[10px] text-slate-400 uppercase mb-1">Total XP</p>
                            <p className="text-lg font-bold text-emerald-400">{mockUser.xp.toLocaleString()}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-800/50">
                            <p className="text-[10px] text-slate-400 uppercase mb-1">Battle HP</p>
                            <p className="text-lg font-bold text-indigo-400">{playerBattleHP}</p>
                        </div>
                    </div>

                    <p className="text-[10px] text-slate-500 mt-3 text-center">
                        Battle HP diperoleh dari XP kamu. Semakin banyak belajar, semakin kuat!
                    </p>
                </motion.div>

                {/* Partner Notice */}
                <motion.div
                    className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <HugeiconsIcon icon={UserMultiple02Icon} size={20} className="text-cyan-400" />
                    <div className="flex-1">
                        <p className="text-xs text-cyan-400 font-medium">Mode Cooperative</p>
                        <p className="text-[10px] text-slate-400">Kamu akan bertarung bersama partner AI</p>
                    </div>
                </motion.div>

                {/* Practice Boss Section */}
                {practiceBoss && (
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <HugeiconsIcon icon={SparklesIcon} size={16} className="text-amber-400" />
                            <h2 className="text-sm font-semibold text-slate-200">Boss Latihan</h2>
                            <span className="text-[10px] text-slate-400">(Untuk Pemula)</span>
                        </div>
                        <BossCard boss={practiceBoss} isPractice />
                    </div>
                )}

                {/* Regular Bosses */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <HugeiconsIcon icon={Target01Icon} size={16} className="text-purple-400" />
                        <h2 className="text-sm font-semibold text-slate-200">Concept Bosses</h2>
                    </div>
                    <div className="space-y-3">
                        {regularBosses.map((boss, index) => (
                            <motion.div
                                key={boss.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + index * 0.05 }}
                            >
                                <BossCard boss={boss} />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* How It Works */}
                <motion.div
                    className="p-4 rounded-xl bg-slate-900/50 border border-slate-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <h3 className="text-sm font-semibold text-slate-200 mb-3">Cara Bermain</h3>
                    <div className="space-y-2 text-[11px] text-slate-400">
                        <p>⚔️ <span className="text-slate-300">Jawab pertanyaan untuk menyerang Boss</span></p>
                        <p>🛡️ <span className="text-slate-300">Salah jawab = Boss menyerang kamu</span></p>
                        <p>🔥 <span className="text-slate-300">Combo benar berturut = damage bonus!</span></p>
                        <p>💡 <span className="text-slate-300">ZiAbot siap membantu dengan petunjuk</span></p>
                        <p>🏆 <span className="text-slate-300">Menang = XP reward untuk kamu!</span></p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

// Boss Card Component
interface BossCardProps {
    boss: Boss;
    isPractice?: boolean;
}

function BossCard({ boss, isPractice = false }: BossCardProps) {
    const difficultyColors = {
        easy: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        hard: 'bg-red-500/20 text-red-400 border-red-500/30',
    };

    return (
        <Link to="/boss-battle/$battleId" params={{ battleId: boss.id }}>
            <motion.div
                className={`p-4 rounded-xl border transition-all ${isPractice
                    ? 'bg-gradient-to-r from-amber-900/20 to-slate-900 border-amber-500/30 hover:border-amber-500/50'
                    : 'bg-slate-900/70 border-slate-800 hover:border-purple-500/50 hover:bg-slate-900'
                    }`}
                whileTap={{ scale: 0.98 }}
            >
                <div className="flex items-start gap-3">
                    {/* Boss Icon Placeholder */}
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${isPractice
                        ? 'bg-amber-500/20'
                        : 'bg-purple-500/20'
                        }`}>
                        <span className="text-2xl">
                            {isPractice ? '🟢' : boss.subject === 'Matematika' ? '📐' : boss.subject === 'IPA' ? '🔬' : '📖'}
                        </span>
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-bold text-slate-50 truncate">{boss.name}</h3>
                            {isPractice && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-amber-500/20 text-amber-400">
                                    LATIHAN
                                </span>
                            )}
                        </div>
                        <p className="text-[11px] text-slate-400 mb-2">{boss.description}</p>

                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px]">
                                {boss.subject}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px]">
                                HP: {boss.maxHP}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] border ${difficultyColors[boss.difficulty]}`}>
                                {boss.difficulty === 'easy' ? 'Mudah' : boss.difficulty === 'medium' ? 'Sedang' : 'Sulit'}
                            </span>
                        </div>
                    </div>

                    <HugeiconsIcon
                        icon={ArrowRight01Icon}
                        size={20}
                        className="text-slate-500 self-center"
                    />
                </div>
            </motion.div>
        </Link>
    );
}

export default BossBattleLobbyPage;
