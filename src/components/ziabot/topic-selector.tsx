import { useState } from 'react';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowDown01Icon, Tick02Icon } from '@hugeicons/core-free-icons';
import { mockSubjects, mockGrades } from '../../lib/mock-data';
import type { ZiAbotContext } from '../../lib/mock-data';

interface TopicSelectorProps {
    onContextSet: (context: ZiAbotContext) => void;
    currentContext: ZiAbotContext | null;
}

export function TopicSelector({ onContextSet, currentContext }: TopicSelectorProps) {
    const [subject, setSubject] = useState<string>(currentContext?.subject || '');
    const [grade, setGrade] = useState<string>(currentContext?.grade || '');
    const [topic, setTopic] = useState<string>(currentContext?.topic || '');
    const [isExpanded, setIsExpanded] = useState(!currentContext);

    const handleApply = () => {
        if (subject && grade && topic) {
            onContextSet({
                type: 'topic',
                subject,
                grade,
                topic,
            });
            setIsExpanded(false);
        }
    };

    const selectedSubject = mockSubjects.find(s => s.id === subject);
    const selectedGrade = mockGrades.find(g => g.id === grade);

    return (
        <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
            {/* Collapsed header */}
            <motion.button
                className="w-full px-4 py-3 flex items-center justify-between"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-500/20">
                        <span className="text-lg">{selectedSubject?.icon || '📚'}</span>
                    </div>
                    <div className="text-left">
                        {currentContext?.topic ? (
                            <>
                                <p className="text-sm font-medium text-slate-50">
                                    {currentContext.topic}
                                </p>
                                <p className="text-xs text-slate-400">
                                    {selectedSubject?.name} • {selectedGrade?.name}
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="text-sm font-medium text-slate-50">Pilih Topik</p>
                                <p className="text-xs text-slate-400">
                                    Tentukan materi yang ingin dipelajari
                                </p>
                            </>
                        )}
                    </div>
                </div>
                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <HugeiconsIcon icon={ArrowDown01Icon} size={20} className="text-slate-400" />
                </motion.div>
            </motion.button>

            {/* Expanded form */}
            <motion.div
                initial={false}
                animate={{
                    height: isExpanded ? 'auto' : 0,
                    opacity: isExpanded ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
            >
                <div className="px-4 pb-4 space-y-3 border-t border-slate-800/50 pt-3">
                    {/* Subject selector */}
                    <div>
                        <label className="label-tech mb-1.5 block">Mata Pelajaran</label>
                        <div className="grid grid-cols-4 gap-2">
                            {mockSubjects.slice(0, 8).map((s) => (
                                <motion.button
                                    key={s.id}
                                    className={`p-2 rounded-lg text-center transition-colors ${subject === s.id
                                            ? 'bg-indigo-500/20 border border-indigo-500/50'
                                            : 'bg-slate-800/50 border border-transparent hover:border-slate-700'
                                        }`}
                                    onClick={() => setSubject(s.id)}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="text-lg">{s.icon}</span>
                                    <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                                        {s.name}
                                    </p>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Grade selector */}
                    <div>
                        <label className="label-tech mb-1.5 block">Kelas</label>
                        <div className="flex gap-2">
                            {mockGrades.map((g) => (
                                <motion.button
                                    key={g.id}
                                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${grade === g.id
                                            ? 'bg-indigo-500 text-white'
                                            : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'
                                        }`}
                                    onClick={() => setGrade(g.id)}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {g.name}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Topic input */}
                    <div>
                        <label className="label-tech mb-1.5 block">Topik / Materi</label>
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="Contoh: Teorema Pythagoras, Fotosintesis..."
                            className="w-full px-3 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-50 text-sm placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                    </div>

                    {/* Apply button */}
                    <motion.button
                        className={`w-full py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors ${subject && grade && topic
                                ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
                                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            }`}
                        onClick={handleApply}
                        disabled={!subject || !grade || !topic}
                        whileTap={subject && grade && topic ? { scale: 0.98 } : {}}
                    >
                        <HugeiconsIcon icon={Tick02Icon} size={18} />
                        Terapkan Konteks
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}

export default TopicSelector;
