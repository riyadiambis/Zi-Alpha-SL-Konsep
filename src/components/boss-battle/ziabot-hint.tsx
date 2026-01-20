import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { BulbIcon, Clock01Icon } from '@hugeicons/core-free-icons';
import { getRandomBattleHint } from '../../lib/mock-data';

interface ZiAbotHintProps {
    questionHint?: string;
    cooldownSeconds?: number;
    onHintUsed?: () => void;
}

export function ZiAbotHint({ questionHint, cooldownSeconds = 30, onHintUsed }: ZiAbotHintProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [hint, setHint] = useState<string | null>(null);
    const [cooldown, setCooldown] = useState(0);
    const [usedCount, setUsedCount] = useState(0);

    // Cooldown timer
    useEffect(() => {
        if (cooldown <= 0) return;

        const timer = setInterval(() => {
            setCooldown(prev => Math.max(0, prev - 1));
        }, 1000);

        return () => clearInterval(timer);
    }, [cooldown]);

    const handleRequestHint = () => {
        if (cooldown > 0) return;

        // Use question-specific hint if available, otherwise random
        const hintText = questionHint || getRandomBattleHint();
        setHint(hintText);
        setIsOpen(true);
        setCooldown(cooldownSeconds);
        setUsedCount(prev => prev + 1);
        onHintUsed?.();
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div className="relative">
            {/* Hint Button */}
            <motion.button
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${cooldown > 0
                    ? 'bg-slate-800/50 text-slate-500 cursor-not-allowed'
                    : 'bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 border border-indigo-500/30'
                    }`}
                onClick={handleRequestHint}
                disabled={cooldown > 0}
                whileTap={cooldown > 0 ? {} : { scale: 0.95 }}
            >
                <HugeiconsIcon
                    icon={cooldown > 0 ? Clock01Icon : BulbIcon}
                    size={18}
                />
                <span className="text-sm font-medium">
                    {cooldown > 0 ? `${cooldown}s` : 'Minta Petunjuk'}
                </span>
                {usedCount > 0 && cooldown === 0 && (
                    <span className="text-[10px] text-slate-400">
                        ({usedCount}x)
                    </span>
                )}
            </motion.button>

            {/* Hint Modal */}
            <AnimatePresence>
                {isOpen && hint && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 bg-black/50 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleClose}
                        />

                        {/* Hint Card */}
                        <motion.div
                            className="fixed left-4 right-4 bottom-24 z-50 bg-slate-900 rounded-2xl border border-indigo-500/30 p-4 shadow-xl"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                        >
                            {/* Header */}
                            <div className="flex items-center gap-2 mb-3">
                                <div className="p-1.5 rounded-lg bg-indigo-500/20">
                                    <HugeiconsIcon icon={BulbIcon} size={16} className="text-indigo-400" />
                                </div>
                                <span className="text-sm font-semibold text-indigo-400">
                                    Petunjuk dari ZiAbot
                                </span>
                            </div>

                            {/* Hint Content */}
                            <p className="text-sm text-slate-300 leading-relaxed mb-4">
                                💡 {hint}
                            </p>

                            {/* Disclaimer */}
                            <p className="text-[10px] text-slate-500 italic mb-3">
                                ZiAbot membantu kamu berpikir, bukan memberi jawaban langsung.
                            </p>

                            {/* Close Button */}
                            <motion.button
                                className="w-full py-2 rounded-xl bg-indigo-500/20 text-indigo-400 font-medium text-sm hover:bg-indigo-500/30"
                                onClick={handleClose}
                                whileTap={{ scale: 0.98 }}
                            >
                                Mengerti
                            </motion.button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

export default ZiAbotHint;
