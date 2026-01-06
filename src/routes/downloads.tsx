import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft02Icon, Download01Icon } from '@hugeicons/core-free-icons';
import { OfflineCard } from '../components/downloads/offline-card';
import { mockDownloads } from '../lib/mock-data';

export const Route = createFileRoute('/downloads')({
    component: DownloadsPage,
});

function DownloadsPage() {
    return (
        <div className="min-h-screen bg-slate-950">
            {/* Header */}
            <header className="sticky top-0 z-20 glass-strong px-4 py-4 flex items-center gap-4">
                <Link to="/">
                    <motion.button
                        className="p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
                        whileTap={{ scale: 0.95 }}
                    >
                        <HugeiconsIcon icon={ArrowLeft02Icon} size={24} className="text-slate-50" />
                    </motion.button>
                </Link>
                <h1 className="text-lg font-bold text-slate-50">Downloads</h1>
            </header>

            {/* Content */}
            <main className="px-4 py-6">
                {/* Stats */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                            <HugeiconsIcon icon={Download01Icon} size={20} className="text-indigo-400" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-50">
                                {mockDownloads.filter(d => d.status === 'completed').length} Videos
                            </p>
                            <p className="text-xs text-slate-400">Ready to watch offline</p>
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="text-sm font-medium text-slate-50">135 MB</p>
                        <p className="text-xs text-slate-400">Total size</p>
                    </div>
                </div>

                {/* Download cards grid */}
                <div className="grid gap-4">
                    {mockDownloads.map((download, index) => (
                        <motion.div
                            key={download.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <OfflineCard
                                download={download}
                                onPlay={() => console.log('Play:', download.video.title)}
                                onPause={() => console.log('Pause:', download.id)}
                                onResume={() => console.log('Resume:', download.id)}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Empty state if no downloads */}
                {mockDownloads.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                            <HugeiconsIcon icon={Download01Icon} size={32} className="text-slate-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-400 mb-2">No Downloads</h3>
                        <p className="text-sm text-slate-500 text-center max-w-xs">
                            Download videos to watch offline when you don't have internet connection.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}
