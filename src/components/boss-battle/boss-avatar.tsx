import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    HelpCircleIcon,
    BookOpen01Icon,
    TriangleIcon,
    OrganicFoodIcon,
    SquareIcon,
    Alert02Icon
} from '@hugeicons/core-free-icons';

interface BossAvatarProps {
    avatarColor: string;
    avatarIcon: string;
    phase: 1 | 2;
    isRageMode?: boolean;
    isTakingDamage?: boolean;
}

export function BossAvatar({ avatarColor, avatarIcon, phase, isRageMode, isTakingDamage }: BossAvatarProps) {

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'slime': return HelpCircleIcon;
            case 'triangle': return TriangleIcon;
            case 'leaf': return OrganicFoodIcon;
            case 'cube': return SquareIcon;
            case 'book': return BookOpen01Icon;
            default: return HelpCircleIcon;
        }
    };

    const IconComponent = getIcon(avatarIcon);

    return (
        <div className={`relative mx-auto mb-6 transition-all duration-500 ${isRageMode ? 'w-48 h-48' : 'w-32 h-32'}`}>
            {(phase === 2 || isRageMode) && (
                <motion.div
                    className={`absolute inset-0 rounded-full blur-3xl ${isRageMode ? 'bg-red-600/50' : 'bg-red-500/30'}`}
                    animate={{
                        scale: isRageMode ? [1, 1.4, 1] : [1, 1.3, 1],
                        opacity: isRageMode ? [0.4, 0.8, 0.4] : [0.3, 0.7, 0.3]
                    }}
                    transition={{ repeat: Infinity, duration: isRageMode ? 1.5 : 2 }}
                />
            )}

            <motion.div
                className={`relative w-full h-full rounded-3xl bg-gradient-to-br ${avatarColor} flex items-center justify-center shadow-2xl border-4 ${isRageMode ? 'border-red-500 shadow-red-500/50' :
                        phase === 2 ? 'border-red-500/50' : 'border-white/20'
                    }`}
                animate={isTakingDamage ? {
                    x: [-10, 10, -10, 10, 0],
                    scale: [1, 0.92, 1],
                    filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
                } : isRageMode ? {
                    scale: [1, 1.05, 1],
                } : {
                    scale: [1, 1.02, 1],
                }}
                transition={isTakingDamage ? { duration: 0.5 } : { repeat: Infinity, duration: isRageMode ? 2 : 3, ease: "easeInOut" }}
            >
                <HugeiconsIcon
                    icon={IconComponent}
                    size={isRageMode ? 96 : 64}
                    className={`text-white drop-shadow-lg transition-all duration-500 ${isRageMode ? 'drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]' : ''}`}
                />

                {(phase === 2 || isRageMode) && (
                    <motion.div
                        className={`absolute -top-4 -right-4 bg-red-500 rounded-full p-2 border-4 border-slate-900 shadow-lg ${isRageMode ? 'p-3' : ''}`}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{
                            scale: isRageMode ? [1, 1.2, 1] : 1,
                            rotate: 0
                        }}
                        transition={isRageMode ? { repeat: Infinity, duration: 1 } : { type: "spring", duration: 0.5 }}
                    >
                        <HugeiconsIcon icon={Alert02Icon} size={isRageMode ? 28 : 20} className="text-white" />
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
