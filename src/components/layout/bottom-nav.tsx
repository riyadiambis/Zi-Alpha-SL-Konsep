import { Link, useLocation } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    Home01Icon,
    Download01Icon,
    User02Icon,
    AiBrain01Icon,
    Comment02Icon
} from '@hugeicons/core-free-icons';

interface NavItem {
    to: string;
    icon: typeof Home01Icon;
    label: string;
}

const navItems: NavItem[] = [
    { to: '/', icon: Home01Icon, label: 'Home' },
    { to: '/ziabot', icon: AiBrain01Icon, label: 'ZiAbot' },
    { to: '/downloads', icon: Download01Icon, label: 'Downloads' },
    { to: '/diskusi-soal', icon: Comment02Icon, label: 'Diskusi' },
    { to: '/profile', icon: User02Icon, label: 'Profile' },
];

export function BottomNav() {
    const location = useLocation();

    // Don't show on auth pages
    if (location.pathname.startsWith('/auth')) {
        return null;
    }

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-40 glass-strong border-t border-slate-800/50">
            <div className="flex items-center justify-around py-2 px-2 max-w-lg mx-auto">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.to;

                    return (
                        <Link key={item.to} to={item.to}>
                            <motion.div
                                className="flex flex-col items-center gap-0.5 px-3 py-1.5 relative"
                                whileTap={{ scale: 0.9 }}
                            >
                                <HugeiconsIcon
                                    icon={item.icon}
                                    size={22}
                                    strokeWidth={isActive ? 2 : 1.5}
                                    className={isActive ? 'text-indigo-400' : 'text-slate-400'}
                                />
                                <span className={`text-[9px] ${isActive ? 'text-indigo-400 font-medium' : 'text-slate-500'}`}>
                                    {item.label}
                                </span>

                                {/* Active indicator dot */}
                                {isActive && (
                                    <motion.div
                                        className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-indigo-400"
                                        layoutId="activeTab"
                                    />
                                )}
                            </motion.div>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}

export default BottomNav;
