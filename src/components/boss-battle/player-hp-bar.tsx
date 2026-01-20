import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { UserIcon, UserMultiple02Icon } from '@hugeicons/core-free-icons';

interface PlayerHPBarProps {
    currentHP: number;
    maxHP: number;
    playerName: string;
    totalXP: number;
    isPartner?: boolean;
    showDamage?: number;
}

export function PlayerHPBar({
    currentHP,
    maxHP,
    playerName,
    totalXP,
    isPartner = false,
    showDamage
}: PlayerHPBarProps) {
    const hpPercentage = Math.max(0, (currentHP / maxHP) * 100);
    const isLowHP = hpPercentage <= 30;
    const isCritical = hpPercentage <= 15;
    const isDefeated = currentHP <= 0;

    return (
        <motion.div
            className={`flex-1 p-3 rounded-xl border ${isDefeated
                ? 'bg-slate-900/50 border-red-500/30 opacity-60'
                : isPartner
                    ? 'bg-slate-900/50 border-cyan-500/30'
                    : 'bg-slate-900/50 border-emerald-500/30'
                }`}
            animate={isDefeated ? { scale: 0.98 } : {}}
        >
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
                <div className={`p-1 rounded-lg ${isPartner ? 'bg-cyan-500/20' : 'bg-emerald-500/20'}`}>
                    <HugeiconsIcon
                        icon={isPartner ? UserMultiple02Icon : UserIcon}
                        size={14}
                        className={isPartner ? 'text-cyan-400' : 'text-emerald-400'}
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-50 truncate">
                        {playerName}
                        {isDefeated && <span className="ml-1 text-red-400">(KO)</span>}
                    </p>
                    <p className="text-[10px] text-slate-400">
                        {maxHP} HP dari {totalXP.toLocaleString()} XP
                    </p>
                </div>
            </div>

            {/* HP Bar */}
            <div className="relative h-2.5 rounded-full bg-slate-800 overflow-hidden">
                {/* Critical pulse effect */}
                {isCritical && !isDefeated && (
                    <motion.div
                        className="absolute inset-0 bg-red-500/30"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ repeat: Infinity, duration: 0.6 }}
                    />
                )}

                {/* HP Fill */}
                <motion.div
                    className={`h-full rounded-full ${isDefeated
                        ? 'bg-slate-600'
                        : isCritical
                            ? 'bg-gradient-to-r from-red-600 to-red-400'
                            : isLowHP
                                ? 'bg-gradient-to-r from-orange-500 to-amber-400'
                                : isPartner
                                    ? 'bg-gradient-to-r from-cyan-500 to-blue-400'
                                    : 'bg-gradient-to-r from-emerald-500 to-green-400'
                        }`}
                    initial={{ width: '100%' }}
                    animate={{ width: `${hpPercentage}%` }}
                    transition={{ type: 'spring', damping: 15 }}
                />
            </div>

            {/* HP Numbers */}
            <div className="flex items-center justify-between mt-1.5">
                <span className={`text-[10px] font-medium ${isDefeated ? 'text-red-400' : 'text-slate-400'}`}>
                    {currentHP} / {maxHP}
                </span>
                {showDamage && showDamage > 0 && (
                    <motion.span
                        className="text-[10px] font-bold text-red-400"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                    >
                        -{showDamage}
                    </motion.span>
                )}
            </div>
        </motion.div>
    );
}

export default PlayerHPBar;
