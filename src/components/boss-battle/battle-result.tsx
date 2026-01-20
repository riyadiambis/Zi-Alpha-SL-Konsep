import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    Award01Icon,
    SadIcon,
    StarIcon,
    Target01Icon,
    Fire02Icon,
    ReloadIcon,
    Home01Icon
} from '@hugeicons/core-free-icons';
import { Link } from '@tanstack/react-router';
import type { BattleResult } from '../../lib/mock-data';

interface BattleResultScreenProps {
    result: BattleResult;
    bossName: string;
    isPractice: boolean;
    onPlayAgain?: () => void;
}

export function BattleResultScreen({ result, bossName, isPractice, onPlayAgain }: BattleResultScreenProps) {
    const accuracy = result.questionsAnswered > 0
        ? Math.round((result.correctAnswers / result.questionsAnswered) * 100)
        : 0;

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <motion.div
                className={`w-full max-w-sm rounded-2xl border p-6 ${result.victory
                    ? 'bg-gradient-to-b from-emerald-900/50 to-slate-900 border-emerald-500/30'
                    : 'bg-gradient-to-b from-red-900/30 to-slate-900 border-red-500/30'
                    }`}
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: 0.1, type: 'spring', damping: 20 }}
            >
                {/* Victory/Defeat Icon */}
                <motion.div
                    className="flex justify-center mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                >
                    <div className={`p-4 rounded-full ${result.victory
                        ? 'bg-emerald-500/20'
                        : 'bg-red-500/20'
                        }`}>
                        <HugeiconsIcon
                            icon={result.victory ? Award01Icon : SadIcon}
                            size={48}
                            className={result.victory ? 'text-emerald-400' : 'text-red-400'}
                        />
                    </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                    className={`text-2xl font-bold text-center mb-2 ${result.victory ? 'text-emerald-400' : 'text-red-400'
                        }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {result.victory ? '🎉 Kemenangan!' : '💔 Kalah...'}
                </motion.h2>

                <motion.p
                    className="text-sm text-slate-400 text-center mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {result.victory
                        ? `${bossName} telah dikalahkan!`
                        : `${bossName} terlalu kuat. Coba lagi!`}
                </motion.p>

                {/* Stats Grid */}
                <motion.div
                    className="grid grid-cols-2 gap-3 mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    {/* XP Earned */}
                    <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center gap-2 mb-1">
                            <HugeiconsIcon icon={StarIcon} size={14} className="text-amber-400" />
                            <span className="text-[10px] text-slate-400 uppercase">XP Earned</span>
                        </div>
                        <p className="text-lg font-bold text-amber-400">
                            +{result.xpEarned}
                            {isPractice && <span className="text-[10px] text-slate-500 ml-1">(practice)</span>}
                        </p>
                    </div>

                    {/* Accuracy */}
                    <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center gap-2 mb-1">
                            <HugeiconsIcon icon={Target01Icon} size={14} className="text-indigo-400" />
                            <span className="text-[10px] text-slate-400 uppercase">Akurasi</span>
                        </div>
                        <p className="text-lg font-bold text-indigo-400">{accuracy}%</p>
                    </div>

                    {/* Correct Answers */}
                    <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] text-slate-400 uppercase">Jawaban Benar</span>
                        </div>
                        <p className="text-lg font-bold text-emerald-400">
                            {result.correctAnswers}/{result.questionsAnswered}
                        </p>
                    </div>

                    {/* Max Combo */}
                    <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center gap-2 mb-1">
                            <HugeiconsIcon icon={Fire02Icon} size={14} className="text-orange-400" />
                            <span className="text-[10px] text-slate-400 uppercase">Max Combo</span>
                        </div>
                        <p className="text-lg font-bold text-orange-400">{result.maxCombo}x</p>
                    </div>
                </motion.div>

                {/* Actions */}
                <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <motion.button
                        className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold flex items-center justify-center gap-2"
                        onClick={onPlayAgain}
                        whileTap={{ scale: 0.98 }}
                    >
                        <HugeiconsIcon icon={ReloadIcon} size={18} />
                        Main Lagi
                    </motion.button>

                    <Link to="/boss-battle" className="block">
                        <motion.button
                            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium flex items-center justify-center gap-2"
                            whileTap={{ scale: 0.98 }}
                        >
                            <HugeiconsIcon icon={Home01Icon} size={18} />
                            Kembali ke Lobby
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Practice Mode Notice */}
                {isPractice && (
                    <motion.p
                        className="text-[10px] text-center text-slate-500 mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        🛡️ Mode latihan: XP dikurangi 50%, damage boss dikurangi 50%
                    </motion.p>
                )}
            </motion.div>
        </motion.div>
    );
}

export default BattleResultScreen;
