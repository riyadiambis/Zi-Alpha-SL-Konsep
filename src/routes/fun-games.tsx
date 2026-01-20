import { createFileRoute, Link, Outlet, useMatches } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    ArrowLeft01Icon,
    ArrowRight01Icon,
    GameController01Icon
} from '@hugeicons/core-free-icons';

export const Route = createFileRoute('/fun-games')({
    component: FunGamesLayout,
});

function FunGamesLayout() {
    const matches = useMatches();
    const isChildRoute = matches.some(match =>
        match.id.includes('memory') ||
        match.id.includes('logic') ||
        match.id.includes('pattern') ||
        match.id.includes('arena')
    );

    if (isChildRoute) {
        return <Outlet />;
    }

    return <FunGamesHome />;
}

const games = [
    {
        id: 'arena',
        name: 'Knowledge Arena',
        description: 'Quiz multiplayer pengetahuan umum',
        icon: '⚔️',
        color: 'from-cyan-500 to-blue-600',
        borderColor: 'border-cyan-500',
        path: '/knowledge-arena',
    },
    {
        id: 'memory',
        name: 'Memory Game',
        description: 'Latih ingatan dengan mencocokkan kartu',
        icon: '🧠',
        color: 'from-emerald-500 to-teal-600',
        borderColor: 'border-emerald-500',
        path: '/fun-games/memory',
    },
    {
        id: 'logic',
        name: 'Logic Puzzle',
        description: 'Asah logika dan penalaran',
        icon: '🧩',
        color: 'from-purple-500 to-violet-600',
        borderColor: 'border-purple-500',
        path: '/fun-games/logic',
    },
    {
        id: 'pattern',
        name: 'Pattern Game',
        description: 'Kenali pola angka dan simbol',
        icon: '🎯',
        color: 'from-orange-500 to-amber-600',
        borderColor: 'border-orange-500',
        path: '/fun-games/pattern',
    },
];

function FunGamesHome() {
    return (
        <div className="min-h-screen bg-slate-950 pb-20">
            <header className="sticky top-0 z-30 glass-strong px-4 py-4 border-b border-slate-800/50">
                <div className="flex items-center gap-3">
                    <Link to="/progress">
                        <motion.button
                            className="p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
                            whileTap={{ scale: 0.9 }}
                        >
                            <HugeiconsIcon icon={ArrowLeft01Icon} size={20} className="text-slate-400" />
                        </motion.button>
                    </Link>
                    <HugeiconsIcon icon={GameController01Icon} size={24} className="text-amber-400" />
                    <h1 className="text-lg font-bold text-slate-50">Fun Games</h1>
                </div>
            </header>

            <div className="px-4 py-6">
                <div className="text-center mb-8">
                    <span className="text-5xl">🎮</span>
                    <h2 className="text-xl font-bold text-slate-50 mt-4">Main & Dapatkan XP!</h2>
                    <p className="text-slate-400 mt-2">Games seru yang bikin belajar jadi menyenangkan</p>
                </div>

                <div className="space-y-4">
                    {games.map((game, index) => (
                        <Link key={game.id} to={game.path}>
                            <motion.div
                                className={`relative overflow-hidden rounded-2xl p-5 bg-gradient-to-r ${game.color} bg-opacity-20 border-2 ${game.borderColor} border-opacity-50 hover:border-opacity-100 transition-all`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <span className="text-4xl">{game.icon}</span>
                                        <div>
                                            <p className="text-lg font-bold text-slate-50">{game.name}</p>
                                            <p className="text-sm text-slate-300/80">{game.description}</p>
                                        </div>
                                    </div>
                                    <HugeiconsIcon icon={ArrowRight01Icon} size={24} className="text-white/70" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 bg-slate-900/50 rounded-2xl p-5 border border-slate-800/50">
                    <h3 className="text-sm font-semibold text-slate-400 mb-3">🏆 Cara Dapat XP</h3>
                    <ul className="space-y-2 text-sm text-slate-400">
                        <li>• Selesaikan game untuk mendapat XP</li>
                        <li>• Main lebih cepat = bonus XP lebih besar</li>
                        <li>• Streak jawaban benar = bonus tambahan</li>
                        <li>• Semua XP berkontribusi ke level kamu!</li>
                    </ul>
                </div>
            </div>

            <Outlet />
        </div>
    );
}

export default FunGamesLayout;
