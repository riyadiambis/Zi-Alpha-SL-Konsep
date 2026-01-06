import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { Fire02Icon } from '@hugeicons/core-free-icons';

interface StreakFlameProps {
    streak: number;
    isActive?: boolean;
}

export function StreakFlame({ streak, isActive = true }: StreakFlameProps) {
    return (
        <motion.div
            className="flex items-center gap-1"
            whileTap={{ scale: 0.95 }}
        >
            <motion.div
                className={`relative ${isActive ? 'flame-glow' : ''}`}
                animate={isActive ? {
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                } : {}}
                transition={{
                    repeat: isActive ? Infinity : 0,
                    duration: 2,
                    ease: 'easeInOut',
                }}
            >
                <HugeiconsIcon
                    icon={Fire02Icon}
                    size={24}
                    strokeWidth={1.5}
                    className={isActive ? 'text-amber-500' : 'text-slate-600'}
                />
            </motion.div>

            {/* Streak count badge */}
            {streak > 0 && (
                <motion.span
                    className={`text-sm font-bold ${isActive ? 'text-amber-500' : 'text-slate-600'}`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    {streak}
                </motion.span>
            )}
        </motion.div>
    );
}

export default StreakFlame;
