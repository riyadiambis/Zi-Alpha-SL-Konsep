import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    ArrowLeft01Icon,
    ReloadIcon,
    Download01Icon,
    Note01Icon,
    Tick02Icon,
    PlayIcon
} from '@hugeicons/core-free-icons';
import { Link } from '@tanstack/react-router';
import type { PracticeSet } from '../../lib/mock-data';

interface PracticeViewerProps {
    practiceSet: PracticeSet;
    onRegenerate?: () => void;
    onSave?: () => void;
}

type Difficulty = 'all' | 'easy' | 'medium' | 'hard';

export function PracticeViewer({ practiceSet, onRegenerate, onSave }: PracticeViewerProps) {
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('all');
    const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
    const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});

    const filteredQuestions = practiceSet.questions.filter(
        q => selectedDifficulty === 'all' || q.difficulty === selectedDifficulty
    );

    const difficultyColors = {
        easy: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        hard: 'bg-red-500/20 text-red-400 border-red-500/30',
    };

    const toggleAnswer = (questionId: string) => {
        setShowAnswers(prev => ({
            ...prev,
            [questionId]: !prev[questionId],
        }));
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
                            <h1 className="text-base font-semibold text-slate-50">{practiceSet.title}</h1>
                            <p className="text-xs text-slate-400">
                                {practiceSet.questions.length} soal • {practiceSet.context.subject}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Difficulty filter */}
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                    {(['all', 'easy', 'medium', 'hard'] as Difficulty[]).map((diff) => (
                        <motion.button
                            key={diff}
                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${selectedDifficulty === diff
                                ? diff === 'all'
                                    ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
                                    : difficultyColors[diff as keyof typeof difficultyColors]
                                : 'bg-slate-800/50 text-slate-400 border-slate-700'
                                }`}
                            onClick={() => setSelectedDifficulty(diff)}
                            whileTap={{ scale: 0.95 }}
                        >
                            {diff === 'all' ? 'Semua' : diff === 'easy' ? 'Mudah' : diff === 'medium' ? 'Sedang' : 'Sulit'}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Questions list */}
            <div className="flex-1 px-4 py-4 pb-40 space-y-3">
                {filteredQuestions.map((question, index) => (
                    <motion.div
                        key={question.id}
                        className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        {/* Question header */}
                        <div
                            className="p-4 cursor-pointer"
                            onClick={() => setExpandedQuestion(expandedQuestion === question.id ? null : question.id)}
                        >
                            <div className="flex items-start gap-3">
                                <span className="text-sm font-semibold text-indigo-400 mt-0.5">
                                    {index + 1}.
                                </span>
                                <div className="flex-1">
                                    <p className="text-sm text-slate-50 leading-relaxed">
                                        {question.question}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${difficultyColors[question.difficulty]}`}>
                                            {question.difficulty === 'easy' ? 'Mudah' : question.difficulty === 'medium' ? 'Sedang' : 'Sulit'}
                                        </span>
                                        <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px]">
                                            {question.type === 'mcq' ? 'Pilihan Ganda' : 'Uraian'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* MCQ Options */}
                        {question.type === 'mcq' && question.options && (
                            <div className="px-4 pb-3 space-y-2">
                                {question.options.map((option, optIndex) => (
                                    <motion.button
                                        key={optIndex}
                                        className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${showAnswers[question.id] && option.startsWith(question.correctAnswer)
                                            ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                                            : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800'
                                            }`}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <span className="font-medium text-slate-400 mr-2">
                                            {String.fromCharCode(65 + optIndex)}.
                                        </span>
                                        {option}
                                        {showAnswers[question.id] && option.startsWith(question.correctAnswer) && (
                                            <HugeiconsIcon icon={Tick02Icon} size={16} className="inline ml-2 text-emerald-400" />
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        )}

                        {/* Show/Hide Answer */}
                        <div className="px-4 pb-4">
                            <motion.button
                                className="text-xs text-indigo-400 font-medium"
                                onClick={() => toggleAnswer(question.id)}
                                whileTap={{ scale: 0.98 }}
                            >
                                {showAnswers[question.id] ? 'Sembunyikan Jawaban' : 'Lihat Jawaban'}
                            </motion.button>

                            <AnimatePresence>
                                {showAnswers[question.id] && (
                                    <motion.div
                                        className="mt-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <p className="text-xs text-slate-400 mb-1">Penjelasan:</p>
                                        <p className="text-sm text-slate-300">{question.explanation}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Bottom actions */}
            <div className="fixed bottom-16 left-0 right-0 glass-strong border-t border-slate-800/50 p-4">
                {/* Start Quiz CTA */}
                <motion.button
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold flex items-center justify-center gap-2 mb-3"
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ scale: 1.01 }}
                >
                    <HugeiconsIcon icon={PlayIcon} size={20} />
                    Mulai Quiz
                </motion.button>

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
                        className="flex-1 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium flex items-center justify-center gap-2"
                        onClick={onSave}
                        whileTap={{ scale: 0.98 }}
                    >
                        <HugeiconsIcon icon={Download01Icon} size={16} />
                        Simpan
                    </motion.button>
                    <Link to="/ziabot/notes">
                        <motion.button
                            className="py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                            whileTap={{ scale: 0.98 }}
                        >
                            <HugeiconsIcon icon={Note01Icon} size={16} />
                        </motion.button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PracticeViewer;
