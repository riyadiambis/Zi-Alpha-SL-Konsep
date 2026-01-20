import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { Fire02Icon, SparklesIcon } from '@hugeicons/core-free-icons';

interface ComboIndicatorProps {
    comboCount: number;
    showBonusDamage?: boolean;
}

export function ComboIndicator({ comboCount, showBonusDamage }: ComboIndicatorProps) {
    const isMaxCombo = comboCount >= 5;
    const bonusDamage = comboCount * 5;

    if (comboCount === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ scale: 0, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0, y: -20 }}
                className="inline-flex items-center gap-2"
            >
                <motion.div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg border-2 ${isMaxCombo
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 border-amber-300'
                            : 'bg-gradient-to-r from-orange-500 to-red-500 border-orange-300'
                        }`}
                    animate={isMaxCombo ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ repeat: isMaxCombo ? Infinity : 0, duration: 1 }}
                >
                    <HugeiconsIcon
                        icon={isMaxCombo ? SparklesIcon : Fire02Icon}
                        size={20}
                        className="text-white"
                    />
                    <span className="text-white font-bold text-lg">
                        {comboCount}x COMBO
                    </span>
                </motion.div>

                {showBonusDamage && bonusDamage > 0 && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        className="px-3 py-1 rounded-full bg-emerald-500 border-2 border-emerald-300 text-white font-bold text-sm shadow-lg"
                    >
                        +{bonusDamage} DMG
                    </motion.div>
                )}
            </motion.div>
        </AnimatePresence>
    );
}

export default ComboIndicator;
