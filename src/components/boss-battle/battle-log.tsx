import { motion, AnimatePresence } from 'framer-motion';

interface BattleLogProps {
    logs: string[];
}

export function BattleLog({ logs }: BattleLogProps) {
    const recentLogs = logs.slice(-2);

    return (
        <div className="flex flex-col gap-2 items-center min-h-[50px] justify-end">
            <AnimatePresence mode='popLayout'>
                {recentLogs.map((log, index) => {
                    const isLatest = index === recentLogs.length - 1;
                    return (
                        <motion.div
                            key={`${index}-${log}`}
                            initial={{ opacity: 0, y: 15, scale: 0.9 }}
                            animate={{
                                opacity: isLatest ? 1 : 0.6,
                                y: 0,
                                scale: isLatest ? 1 : 0.95
                            }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", duration: 0.3 }}
                            className="text-center"
                        >
                            <span className={`text-sm font-bold px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg
                                ${log.includes('Regen') || log.includes('memulihkan') ? 'bg-emerald-500/90 text-white border-2 border-emerald-300' :
                                    log.includes('menyerang') || log.includes('Damage') ? 'bg-red-500/90 text-white border-2 border-red-300' :
                                        log.includes('Combo') ? 'bg-amber-500/90 text-white border-2 border-amber-300' :
                                            log.includes('PHASE') ? 'bg-purple-500/90 text-white border-2 border-purple-300' :
                                                'bg-slate-800/90 text-slate-100 border-2 border-slate-600'}`}
                            >
                                {log}
                            </span>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}
