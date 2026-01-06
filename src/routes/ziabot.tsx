import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { AiBrain01Icon, Rocket02Icon, Idea01Icon } from '@hugeicons/core-free-icons';

export const Route = createFileRoute('/ziabot')({
    component: ZiAbotPage,
});

function ZiAbotPage() {
    return (
        <div className="min-h-screen bg-slate-950 pb-20">
            {/* Header */}
            <div className="sticky top-0 z-30 glass-strong px-4 py-4 border-b border-slate-800/50">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-indigo-500/20">
                        <HugeiconsIcon
                            icon={AiBrain01Icon}
                            size={28}
                            strokeWidth={1.5}
                            className="text-indigo-400"
                        />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-50">ZiAbot</h1>
                        <p className="text-sm text-slate-400">AI Learning Companion</p>
                    </div>
                </div>
            </div>

            {/* Empty State */}
            <div className="flex flex-col items-center justify-center px-6 py-20">
                <motion.div
                    className="relative mb-8"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Glow effect */}
                    <div className="absolute inset-0 blur-3xl bg-indigo-500/20 rounded-full" />

                    <div className="relative p-8 rounded-3xl bg-slate-900/80 border border-slate-800">
                        <HugeiconsIcon
                            icon={AiBrain01Icon}
                            size={80}
                            strokeWidth={1.5}
                            className="text-indigo-400"
                        />
                    </div>
                </motion.div>

                <motion.h2
                    className="text-2xl font-bold text-slate-50 mb-3 text-center"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Selamat Datang di ZiAbot
                </motion.h2>

                <motion.p
                    className="text-slate-400 text-center max-w-xs mb-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Asisten AI personal kamu untuk belajar lebih efektif. Tanyakan apapun seputar pelajaran!
                </motion.p>

                {/* Features Preview */}
                <motion.div
                    className="w-full max-w-sm space-y-3"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                        <div className="p-2 rounded-lg bg-emerald-500/20">
                            <HugeiconsIcon
                                icon={Idea01Icon}
                                size={20}
                                strokeWidth={1.5}
                                className="text-emerald-400"
                            />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-50">Penjelasan Konsep</p>
                            <p className="text-xs text-slate-400">Pahami materi dengan cara Socratic</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                        <div className="p-2 rounded-lg bg-amber-500/20">
                            <HugeiconsIcon
                                icon={Rocket02Icon}
                                size={20}
                                strokeWidth={1.5}
                                className="text-amber-400"
                            />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-50">Latihan Soal</p>
                            <p className="text-xs text-slate-400">Berlatih dengan panduan AI</p>
                        </div>
                    </div>
                </motion.div>

                {/* Coming Soon Badge */}
                <motion.div
                    className="mt-8 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                >
                    <span className="text-sm font-medium text-indigo-300">Coming Soon</span>
                </motion.div>
            </div>
        </div>
    );
}
