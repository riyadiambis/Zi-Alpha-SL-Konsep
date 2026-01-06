import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    Rocket01Icon,
    Fire02Icon,
    Award01Icon,
    CalculatorIcon
} from '@hugeicons/core-free-icons';
import type { Badge } from '../../lib/mock-data';

interface BadgeDisplayProps {
    badges: Badge[];
    compact?: boolean;
}

const iconMap: Record<string, typeof Rocket01Icon> = {
    rocket: Rocket01Icon,
    flame: Fire02Icon,
    trophy: Award01Icon,
    calculator: CalculatorIcon,
};

const rarityColors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
    common: {
        bg: 'bg-slate-800',
        border: 'border-slate-600',
        text: 'text-slate-300',
        glow: '',
    },
    rare: {
        bg: 'bg-blue-900/50',
        border: 'border-blue-500/50',
        text: 'text-blue-300',
        glow: 'shadow-blue-500/20',
    },
    epic: {
        bg: 'bg-purple-900/50',
        border: 'border-purple-500/50',
        text: 'text-purple-300',
        glow: 'shadow-purple-500/30',
    },
    legendary: {
        bg: 'bg-amber-900/30',
        border: 'border-amber-500/50',
        text: 'text-amber-300',
        glow: 'shadow-amber-500/40',
    },
};

export function BadgeDisplay({ badges, compact = false }: BadgeDisplayProps) {
    if (compact) {
        // Show badges inline as small icons
        return (
            <div className="flex items-center gap-1">
                {badges.slice(0, 5).map((badge, index) => {
                    const colors = rarityColors[badge.rarity];
                    const IconComponent = iconMap[badge.icon] || Rocket01Icon;

                    return (
                        <motion.div
                            key={badge.id}
                            className={`w-8 h-8 rounded-full ${colors.bg} ${colors.border} border flex items-center justify-center`}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            title={badge.name}
                        >
                            <HugeiconsIcon
                                icon={IconComponent}
                                size={16}
                                className={colors.text}
                                strokeWidth={1.5}
                            />
                        </motion.div>
                    );
                })}
                {badges.length > 5 && (
                    <span className="text-xs text-slate-400 ml-1">+{badges.length - 5}</span>
                )}
            </div>
        );
    }

    // Full badge grid
    return (
        <div className="grid grid-cols-2 gap-3">
            {badges.map((badge, index) => {
                const colors = rarityColors[badge.rarity];
                const IconComponent = iconMap[badge.icon] || Rocket01Icon;

                return (
                    <motion.div
                        key={badge.id}
                        className={`p-4 rounded-xl ${colors.bg} ${colors.border} border ${colors.glow} shadow-lg`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
                                <HugeiconsIcon
                                    icon={IconComponent}
                                    size={24}
                                    className={colors.text}
                                    strokeWidth={1.5}
                                />
                            </div>
                            <div>
                                <h4 className={`font-semibold text-sm ${colors.text}`}>{badge.name}</h4>
                                <span className="text-[10px] uppercase tracking-wider text-slate-500">
                                    {badge.rarity}
                                </span>
                            </div>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            {badge.description}
                        </p>
                        <p className="text-[10px] text-slate-600 mt-2">
                            {badge.earnedAt.toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            })}
                        </p>
                    </motion.div>
                );
            })}
        </div>
    );
}

export default BadgeDisplay;
