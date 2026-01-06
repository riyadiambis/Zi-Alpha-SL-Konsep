import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { StarIcon } from '@hugeicons/core-free-icons';

interface XPToastProps {
    xp: number;
    reason: string;
    show: boolean;
    onComplete?: () => void;
}

export function XPToast({ xp, reason, show, onComplete }: XPToastProps) {
    const [isVisible, setIsVisible] = useState(show);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                onComplete?.();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed top-16 left-1/2 z-50 xp-toast-animate"
                    initial={{ y: -100, x: '-50%', opacity: 0 }}
                    animate={{ y: 0, x: '-50%', opacity: 1 }}
                    exit={{ y: -100, x: '-50%', opacity: 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                >
                    <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-slate-900/90 backdrop-blur-lg border border-slate-700/50 shadow-lg">
                        {/* Emerald star icon */}
                        <motion.div
                            className="text-emerald-500"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                        >
                            <HugeiconsIcon icon={StarIcon} size={20} strokeWidth={1.5} />
                        </motion.div>

                        {/* XP amount */}
                        <span className="text-emerald-400 font-bold text-sm">
                            +{xp} XP
                        </span>

                        {/* Divider */}
                        <div className="w-px h-4 bg-slate-700" />

                        {/* Reason */}
                        <span className="text-slate-300 text-sm">
                            {reason}
                        </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Hook to manage XP toast state
export function useXPToast() {
    const [toast, setToast] = useState<{ xp: number; reason: string; show: boolean }>({
        xp: 0,
        reason: '',
        show: false,
    });

    const showXPToast = (xp: number, reason: string) => {
        setToast({ xp, reason, show: true });
    };

    const hideXPToast = () => {
        setToast(prev => ({ ...prev, show: false }));
    };

    return { toast, showXPToast, hideXPToast };
}

export default XPToast;
