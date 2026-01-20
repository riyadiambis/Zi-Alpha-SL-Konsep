import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { Tick02Icon, Cancel01Icon } from '@hugeicons/core-free-icons';
import type { BattleQuestion } from '../../lib/mock-data';

interface BattleQuizProps {
    question: BattleQuestion;
    questionNumber: number;
    totalQuestions: number;
    onAnswer: (selectedIndex: number, isCorrect: boolean) => void;
    disabled?: boolean;
}

export function BattleQuiz({
    question,
    questionNumber,
    totalQuestions,
    onAnswer,
    disabled = false
}: BattleQuizProps) {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleSelectAnswer = (index: number) => {
        if (disabled || showResult) return;

        setSelectedAnswer(index);
        const correct = index === question.correctAnswer;
        setIsCorrect(correct);
        setShowResult(true);

        // Delay before proceeding to next question
        setTimeout(() => {
            onAnswer(index, correct);
            setSelectedAnswer(null);
            setShowResult(false);
        }, 1500);
    };

    const getOptionStyle = (index: number) => {
        if (!showResult) {
            return selectedAnswer === index
                ? 'border-indigo-500 bg-indigo-500/20'
                : 'border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-600';
        }

        if (index === question.correctAnswer) {
            return 'border-emerald-500 bg-emerald-500/20';
        }

        if (selectedAnswer === index && !isCorrect) {
            return 'border-red-500 bg-red-500/20';
        }

        return 'border-slate-700 bg-slate-800/30 opacity-50';
    };

    return (
        <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            {/* Question Header */}
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-400">
                    Pertanyaan {questionNumber} / {totalQuestions}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${question.difficulty === 'easy'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : question.difficulty === 'medium'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                    {question.difficulty === 'easy' ? 'Mudah' : question.difficulty === 'medium' ? 'Sedang' : 'Sulit'}
                </span>
            </div>

            {/* Question */}
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 mb-4">
                <p className="text-sm text-slate-50 leading-relaxed">{question.question}</p>
            </div>

            {/* Options */}
            <div className="space-y-2">
                {question.options.map((option, index) => (
                    <motion.button
                        key={index}
                        className={`w-full p-3 rounded-xl border text-left transition-all duration-200 ${getOptionStyle(index)}`}
                        onClick={() => handleSelectAnswer(index)}
                        disabled={disabled || showResult}
                        whileTap={{ scale: disabled || showResult ? 1 : 0.98 }}
                    >
                        <div className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${showResult && index === question.correctAnswer
                                ? 'bg-emerald-500 text-white'
                                : showResult && selectedAnswer === index && !isCorrect
                                    ? 'bg-red-500 text-white'
                                    : 'bg-slate-700 text-slate-300'
                                }`}>
                                {showResult && index === question.correctAnswer ? (
                                    <HugeiconsIcon icon={Tick02Icon} size={14} />
                                ) : showResult && selectedAnswer === index && !isCorrect ? (
                                    <HugeiconsIcon icon={Cancel01Icon} size={14} />
                                ) : (
                                    String.fromCharCode(65 + index)
                                )}
                            </span>
                            <span className="text-sm text-slate-200 flex-1">{option}</span>
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Result Feedback */}
            <AnimatePresence>
                {showResult && (
                    <motion.div
                        className={`mt-4 p-3 rounded-xl text-center ${isCorrect
                            ? 'bg-emerald-500/20 border border-emerald-500/30'
                            : 'bg-red-500/20 border border-red-500/30'
                            }`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <p className={`text-sm font-semibold ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                            {isCorrect ? '✨ Benar! Damage ke Boss!' : '💔 Salah! Kamu terkena damage!'}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default BattleQuiz;
