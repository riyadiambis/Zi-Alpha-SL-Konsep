import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    ArrowLeft02Icon,
    Notification02Icon,
    DownloadCircle02Icon,
    LanguageCircleIcon,
    InformationCircleIcon,
    Logout01Icon
} from '@hugeicons/core-free-icons';
import { useState } from 'react';

export const Route = createFileRoute('/settings')({
    component: SettingsPage,
});

interface SettingToggleProps {
    label: string;
    description: string;
    icon: typeof Notification02Icon;
    enabled: boolean;
    onChange: (enabled: boolean) => void;
}

function SettingToggle({ label, description, icon, enabled, onChange }: SettingToggleProps) {
    return (
        <div className="flex items-center justify-between p-4 bg-slate-900 rounded-xl border border-slate-800">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                    <HugeiconsIcon icon={icon} size={20} className="text-slate-400" strokeWidth={1.5} />
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-50">{label}</p>
                    <p className="text-xs text-slate-400">{description}</p>
                </div>
            </div>

            {/* Toggle switch */}
            <motion.button
                className={`w-12 h-7 rounded-full p-1 transition-colors ${enabled ? 'bg-indigo-500' : 'bg-slate-700'
                    }`}
                onClick={() => onChange(!enabled)}
                whileTap={{ scale: 0.95 }}
            >
                <motion.div
                    className="w-5 h-5 rounded-full bg-white shadow-sm"
                    animate={{ x: enabled ? 20 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
            </motion.button>
        </div>
    );
}

function SettingsPage() {
    const [notifications, setNotifications] = useState(true);
    const [autoDownload, setAutoDownload] = useState(false);

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Header */}
            <header className="sticky top-0 z-20 glass-strong px-4 py-4 flex items-center gap-4">
                <Link to="/profile">
                    <motion.button
                        className="p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
                        whileTap={{ scale: 0.95 }}
                    >
                        <HugeiconsIcon icon={ArrowLeft02Icon} size={24} className="text-slate-50" />
                    </motion.button>
                </Link>
                <h1 className="text-lg font-bold text-slate-50">Settings</h1>
            </header>

            {/* Settings list */}
            <main className="px-4 py-6 space-y-6">
                {/* General section */}
                <section>
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-1">
                        General
                    </h3>
                    <div className="space-y-3">
                        <SettingToggle
                            label="Notifications"
                            description="Remind me to learn daily"
                            icon={Notification02Icon}
                            enabled={notifications}
                            onChange={setNotifications}
                        />

                        <SettingToggle
                            label="Auto-download on WiFi"
                            description="Download new videos automatically"
                            icon={DownloadCircle02Icon}
                            enabled={autoDownload}
                            onChange={setAutoDownload}
                        />
                    </div>
                </section>

                {/* App section */}
                <section>
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-1">
                        App
                    </h3>
                    <div className="space-y-3">
                        <Link to="/">
                            <motion.div
                                className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-slate-800"
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                                    <HugeiconsIcon icon={LanguageCircleIcon} size={20} className="text-slate-400" strokeWidth={1.5} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-slate-50">Language</p>
                                    <p className="text-xs text-slate-400">Bahasa Indonesia</p>
                                </div>
                            </motion.div>
                        </Link>

                        <Link to="/">
                            <motion.div
                                className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-slate-800"
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                                    <HugeiconsIcon icon={InformationCircleIcon} size={20} className="text-slate-400" strokeWidth={1.5} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-slate-50">About</p>
                                    <p className="text-xs text-slate-400">Version 1.0.0</p>
                                </div>
                            </motion.div>
                        </Link>
                    </div>
                </section>

                {/* Account section */}
                <section>
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-1">
                        Account
                    </h3>
                    <Link to="/auth/login">
                        <motion.div
                            className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-red-900/30"
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                                <HugeiconsIcon icon={Logout01Icon} size={20} className="text-red-400" strokeWidth={1.5} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-red-400">Log Out</p>
                                <p className="text-xs text-slate-400">(Placeholder - Auth not implemented)</p>
                            </div>
                        </motion.div>
                    </Link>
                </section>
            </main>
        </div>
    );
}
