import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    ArrowLeft01Icon,
    ArrowLeft02Icon,
    ArrowRight02Icon,
    ReloadIcon,
    Download01Icon,
    Note01Icon,
    RotateSquareIcon
} from '@hugeicons/core-free-icons';
import { Link } from '@tanstack/react-router';
import type { FlashcardDeck } from '../../lib/mock-data';

interface FlashcardViewerProps {
    deck: FlashcardDeck;
    onRegenerate?: () => void;
    onSave?: () => void;
}

export function FlashcardViewer({ deck, onRegenerate, onSave }: FlashcardViewerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [direction, setDirection] = useState(0);

    const currentCard = deck.cards[currentIndex];

    const handleNext = () => {
        if (currentIndex < deck.cards.length - 1) {
            setDirection(1);
            setCurrentIndex(prev => prev + 1);
            setIsFlipped(false);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setDirection(-1);
            setCurrentIndex(prev => prev - 1);
            setIsFlipped(false);
        }
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleSwipe = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (Math.abs(info.offset.x) > 100) {
            if (info.offset.x > 0) {
                handlePrev();
            } else {
                handleNext();
            }
        }
    };

    const cardVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            rotateY: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
            rotateY: isFlipped ? 180 : 0,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            rotateY: 0,
        }),
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
                            <h1 className="text-base font-semibold text-slate-50">{deck.title}</h1>
                            <p className="text-xs text-slate-400">
                                {deck.context.subject} • {deck.context.grade}
                            </p>
                        </div>
                    </div>
                    <span className="text-sm text-slate-400 font-medium">
                        {currentIndex + 1}/{deck.cards.length}
                    </span>
                </div>

                {/* Progress bar */}
                <div className="mt-3 h-1 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-indigo-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentIndex + 1) / deck.cards.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            {/* Flashcard area */}
            <div className="flex-1 flex items-center justify-center px-6 py-8 pb-40">
                <div className="relative w-full max-w-sm aspect-[3/4]" style={{ perspective: '1000px' }}>
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={cardVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: 'spring', stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 },
                                rotateY: { duration: 0.4 },
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={handleSwipe}
                            onClick={handleFlip}
                            className="absolute inset-0 cursor-pointer"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {/* Front side */}
                            <div
                                className={`absolute inset-0 rounded-2xl border border-slate-700 p-6 flex flex-col items-center justify-center text-center ${isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
                                    }`}
                                style={{
                                    background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
                                    backfaceVisibility: 'hidden',
                                }}
                            >
                                <span className="label-tech mb-4">Pertanyaan</span>
                                <p className="text-lg font-semibold text-slate-50 leading-relaxed">
                                    {currentCard.front}
                                </p>
                                <div className="absolute bottom-4 flex items-center gap-2 text-slate-500">
                                    <HugeiconsIcon icon={RotateSquareIcon} size={14} />
                                    <span className="text-xs">Tap untuk flip</span>
                                </div>
                            </div>

                            {/* Back side */}
                            <div
                                className={`absolute inset-0 rounded-2xl border border-indigo-500/30 p-6 flex flex-col items-center justify-center text-center ${isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                    }`}
                                style={{
                                    background: 'linear-gradient(135deg, #312E81 0%, #1E1B4B 100%)',
                                    transform: 'rotateY(180deg)',
                                    backfaceVisibility: 'hidden',
                                }}
                            >
                                <span className="label-tech mb-4 text-indigo-300">Jawaban</span>
                                <p className="text-sm text-slate-100 leading-relaxed whitespace-pre-line">
                                    {currentCard.back}
                                </p>
                                <div className="absolute bottom-4 flex items-center gap-2 text-indigo-400">
                                    <HugeiconsIcon icon={RotateSquareIcon} size={14} />
                                    <span className="text-xs">Tap untuk flip</span>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation buttons */}
            <div className="fixed bottom-32 left-0 right-0 flex items-center justify-center gap-8 px-6">
                <motion.button
                    className={`p-4 rounded-full ${currentIndex > 0
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-slate-900 text-slate-600 cursor-not-allowed'
                        }`}
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    whileTap={currentIndex > 0 ? { scale: 0.9 } : {}}
                >
                    <HugeiconsIcon icon={ArrowLeft02Icon} size={24} />
                </motion.button>

                <motion.button
                    className={`p-4 rounded-full ${currentIndex < deck.cards.length - 1
                        ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                        : 'bg-emerald-500 text-white hover:bg-emerald-600'
                        }`}
                    onClick={currentIndex < deck.cards.length - 1 ? handleNext : () => setCurrentIndex(0)}
                    whileTap={{ scale: 0.9 }}
                >
                    <HugeiconsIcon
                        icon={currentIndex < deck.cards.length - 1 ? ArrowRight02Icon : ReloadIcon}
                        size={24}
                    />
                </motion.button>
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

export default FlashcardViewer;
