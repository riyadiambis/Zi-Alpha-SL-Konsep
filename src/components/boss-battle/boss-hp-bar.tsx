import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { SecurityCheckIcon } from '@hugeicons/core-free-icons';

interface BossHPBarProps {
    shieldHP: number;
    shieldMaxHP: number;
    coreHP: number;
    coreMaxHP: number;
    bossName: string;
    phase: 1 | 2;
    isRageMode?: boolean;
    showDamage?: number;
    showRegen?: number;
}

export function BossHPBar({ shieldHP, shieldMaxHP, coreHP, coreMaxHP, bossName, phase, isRageMode, showDamage, showRegen }: BossHPBarProps) {
    const shieldPercentage = Math.max(0, (shieldHP / shieldMaxHP) * 100);
    const corePercentage = Math.max(0, (coreHP / coreMaxHP) * 100);
    const isShieldBroken = shieldHP <= 0;
    const isCritical = corePercentage <= 15;

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="flex items-center justify-between mb-3">
                <div>
                    <h3 className={`text-lg font-bold transition-colors ${isRageMode ? 'text-red-400' : 'text-slate-50'}`}>{bossName}</h3>
                    <span className={`text-sm font-semibold ${isRageMode ? 'text-red-400 animate-pulse' :
                        phase === 2 ? 'text-red-400' : 'text-purple-400'
                        }`}>
                        {isRageMode ? '⚡ RAGE MODE!' : phase === 2 ? '⚡ PHASE 2' : 'Phase 1'}
                    </span>
                </div>
                <div className="text-right">
                    <div className="flex items-center gap-2">
                        {!isShieldBroken && (
                            <div className="flex items-center gap-1">
                                <HugeiconsIcon icon={SecurityCheckIcon} size={16} className="text-cyan-400" />
                                <span className="text-sm font-bold text-cyan-400">{shieldHP}</span>
                            </div>
                        )}
                        <span className={`text-2xl font-bold ${isRageMode ? 'text-red-400' : 'text-slate-50'}`}>
                            {coreHP}
                        </span>
                        <span className="text-sm text-slate-400">/ {coreMaxHP}</span>
                    </div>
                    <AnimatePresence>
                        {showDamage != null && showDamage > 0 && (
                            <motion.span
                                className="text-sm font-bold text-red-400"
                                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                -{showDamage}
                            </motion.span>
                        )}
                        {showRegen != null && showRegen > 0 && (
                            <motion.span
                                className="text-sm font-bold text-emerald-400"
                                initial={{ opacity: 0, y: -10, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10 }}
                            >
                                +{showRegen} ❤️‍🩹
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Shield Bar */}
            {!isShieldBroken && (
                <div className="mb-2">
                    <div className="flex items-center gap-2 mb-1">
                        <HugeiconsIcon icon={SecurityCheckIcon} size={14} className="text-cyan-400" />
                        <span className="text-xs text-cyan-400 font-medium">Shield</span>
                        <span className="text-xs text-slate-400">{Math.round(shieldPercentage)}%</span>
                    </div>
                    <div className="relative h-3 rounded-full bg-slate-800/80 border-2 border-cyan-500/30 overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full relative"
                            initial={{ width: '100%' }}
                            animate={{ width: `${shieldPercentage}%` }}
                            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
                        </motion.div>
                    </div>
                </div>
            )}

            {/* Core HP Bar */}
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-medium ${isRageMode ? 'text-red-400' : 'text-purple-400'}`}>Core HP</span>
                    <span className="text-xs text-slate-400">{Math.round(corePercentage)}%</span>
                </div>
                <div className="relative h-6 rounded-full bg-slate-800/80 border-2 border-slate-700/50 overflow-hidden shadow-inner">
                    {isCritical && (
                        <motion.div
                            className="absolute inset-0 bg-red-500/30"
                            animate={{ opacity: [0.3, 0.7, 0.3] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                        />
                    )}

                    <motion.div
                        className={`h-full rounded-full relative ${isCritical || isRageMode
                            ? 'bg-gradient-to-r from-red-600 to-red-400'
                            : phase === 2
                                ? 'bg-gradient-to-r from-red-500 to-purple-500'
                                : 'bg-gradient-to-r from-purple-600 to-indigo-500'
                            }`}
                        initial={{ width: '100%' }}
                        animate={{ width: `${corePercentage}%` }}
                        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                    </motion.div>
                </div>
            </div>

            {isShieldBroken && !isRageMode && corePercentage > 40 && (
                <motion.p
                    className="text-xs text-center mt-2 text-amber-400 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    🛡️ Shield rusak! Serang Core HP!
                </motion.p>
            )}
        </div>
    );
}

export default BossHPBar;
