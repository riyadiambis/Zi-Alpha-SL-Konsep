import { useState } from 'react';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    ArrowLeft01Icon,
    Edit01Icon,
    Tick02Icon,
    ReloadIcon,
    Download01Icon,
    FlashIcon
} from '@hugeicons/core-free-icons';
import { Link } from '@tanstack/react-router';
import type { StudyNote } from '../../lib/mock-data';

interface NotesViewerProps {
    notes: StudyNote;
    onRegenerate?: () => void;
    onSave?: () => void;
}

export function NotesViewer({ notes, onRegenerate, onSave }: NotesViewerProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(notes.content);

    const handleSave = () => {
        setIsEditing(false);
        onSave?.();
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col">
            {/* Header */}
            <div className="sticky top-0 z-30 glass-strong px-4 py-3 border-b border-slate-800/50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link to="/ziabot">
                            <motion.button
                                className="p-2 rounded-lg hover:bg-slate-800/50"
                                whileTap={{ scale: 0.9 }}
                            >
                                <HugeiconsIcon icon={ArrowLeft01Icon} size={20} className="text-slate-400" />
                            </motion.button>
                        </Link>
                        <div>
                            <h1 className="text-base font-semibold text-slate-50">{notes.title}</h1>
                            <p className="text-xs text-slate-400">
                                {notes.context.subject} • {notes.context.grade}
                            </p>
                        </div>
                    </div>
                    <motion.button
                        className={`p-2 rounded-lg ${isEditing ? 'bg-emerald-500/20 text-emerald-400' : 'hover:bg-slate-800/50 text-slate-400'}`}
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        whileTap={{ scale: 0.9 }}
                    >
                        <HugeiconsIcon icon={isEditing ? Tick02Icon : Edit01Icon} size={20} />
                    </motion.button>
                </div>
            </div>

            {/* Notes content */}
            <div className="flex-1 px-4 py-6 pb-32">
                <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4">
                    {isEditing ? (
                        <textarea
                            value={editedContent.join('\n')}
                            onChange={(e) => setEditedContent(e.target.value.split('\n'))}
                            className="w-full min-h-[400px] bg-transparent text-slate-50 text-sm leading-relaxed resize-none focus:outline-none"
                        />
                    ) : (
                        <div className="space-y-2">
                            {editedContent.map((line, index) => {
                                if (!line) return <div key={index} className="h-3" />;

                                const isBold = line.includes('**');
                                const isHeader = line.startsWith('📌');
                                const isBullet = line.startsWith('•');

                                let displayText = line.replace(/\*\*/g, '');

                                return (
                                    <p
                                        key={index}
                                        className={`text-sm leading-relaxed ${isHeader
                                            ? 'text-indigo-400 font-semibold mt-4 first:mt-0'
                                            : isBullet
                                                ? 'text-slate-300 pl-4'
                                                : isBold
                                                    ? 'text-slate-50 font-medium'
                                                    : 'text-slate-300'
                                            }`}
                                    >
                                        {displayText}
                                    </p>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Disclaimer */}
                <p className="text-xs text-slate-500 text-center mt-4">
                    Catatan ini dibuat oleh ZiAbot berdasarkan konteks yang diberikan.
                </p>
            </div>

            {/* Bottom actions */}
            <div className="fixed bottom-16 left-0 right-0 glass-strong border-t border-slate-800/50 px-4 py-3">
                <div className="flex items-center gap-2">
                    <motion.button
                        className="flex-1 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium flex items-center justify-center gap-2"
                        onClick={onRegenerate}
                        whileTap={{ scale: 0.98 }}
                    >
                        <HugeiconsIcon icon={ReloadIcon} size={16} />
                        Regenerate
                    </motion.button>
                    <motion.button
                        className="flex-1 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium flex items-center justify-center gap-2"
                        onClick={onSave}
                        whileTap={{ scale: 0.98 }}
                    >
                        <HugeiconsIcon icon={Download01Icon} size={16} />
                        Simpan
                    </motion.button>
                    <Link to="/ziabot/flashcards">
                        <motion.button
                            className="py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                            whileTap={{ scale: 0.98 }}
                        >
                            <HugeiconsIcon icon={FlashIcon} size={16} />
                        </motion.button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotesViewer;
