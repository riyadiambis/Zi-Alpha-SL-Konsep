import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowLeft01Icon,
  RefreshIcon,
  Clock01Icon
} from '@hugeicons/core-free-icons';
import { useState, useEffect, useCallback } from 'react';

export const Route = createFileRoute('/fun-games/pattern')({
  component: PatternGame,
});

interface Pattern {
  id: string;
  sequence: (string | number)[];
  options: (string | number)[];
  correctIndex: number;
}

const patterns: Pattern[] = [
  { id: '1', sequence: [2, 4, 6, 8], options: [9, 10, 12, 14], correctIndex: 1 },
  { id: '2', sequence: [1, 3, 5, 7], options: [8, 9, 10, 11], correctIndex: 1 },
  { id: '3', sequence: ['🔴', '🔵', '🔴', '🔵'], options: ['🟢', '🔴', '🟡', '🔵'], correctIndex: 1 },
  { id: '4', sequence: [3, 6, 9, 12], options: [14, 15, 16, 18], correctIndex: 1 },
  { id: '5', sequence: ['⭐', '⭐', '🌙', '⭐', '⭐'], options: ['⭐', '🌙', '☀️', '🌍'], correctIndex: 1 },
  { id: '6', sequence: [1, 4, 9, 16], options: [20, 23, 25, 30], correctIndex: 2 },
  { id: '7', sequence: ['🍎', '🍊', '🍋', '🍎', '🍊'], options: ['🍎', '🍋', '🍊', '🍇'], correctIndex: 1 },
  { id: '8', sequence: [2, 3, 5, 7, 11], options: [12, 13, 14, 15], correctIndex: 1 },
  { id: '9', sequence: [1, 1, 2, 3, 5], options: [6, 7, 8, 9], correctIndex: 2 },
  { id: '10', sequence: ['🔺', '🔻', '🔺', '🔻'], options: ['⬛', '🔺', '⬜', '🔶'], correctIndex: 1 },
];

function PatternGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const totalRounds = 8;
  const pattern = patterns[currentIndex % patterns.length];

  const nextPattern = useCallback(() => {
    if (currentIndex + 1 >= totalRounds) {
      setGameComplete(true);
    } else {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setTimer(10);
    }
  }, [currentIndex]);

  const handleTimeout = useCallback(() => {
    if (selectedAnswer === null) {
      setSelectedAnswer(-1);
      setTimeout(nextPattern, 1000);
    }
  }, [selectedAnswer, nextPattern]);

  useEffect(() => {
    if (gameComplete || selectedAnswer !== null) return;

    const interval = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          handleTimeout();
          return 10;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex, selectedAnswer, gameComplete, handleTimeout]);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    const isCorrect = index === pattern.correctIndex;

    if (isCorrect) {
      const timeBonus = timer * 10;
      setScore(s => s + 100 + timeBonus);
      setCorrectCount(c => c + 1);
    }

    setTimeout(nextPattern, 1200);
  };

  const restart = () => {
    setCurrentIndex(0);
    setScore(0);
    setTimer(10);
    setSelectedAnswer(null);
    setGameComplete(false);
    setCorrectCount(0);
  };

  if (gameComplete) {
    const xpEarned = Math.floor(score / 15) + 10;
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <motion.div className="text-center w-full max-w-md" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
          <span className="text-6xl">🎯</span>
          <h2 className="text-2xl font-bold text-orange-400 mt-4">Pattern Complete!</h2>

          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 mt-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Benar</span>
              <span className="font-bold text-slate-50">{correctCount}/{totalRounds}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Skor</span>
              <span className="font-bold text-slate-50">{score}</span>
            </div>
            <div className="flex justify-between border-t border-slate-700 pt-3">
              <span className="text-slate-400">XP Diperoleh</span>
              <span className="font-bold text-orange-400">+{xpEarned} XP</span>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Link to="/fun-games" className="flex-1">
              <motion.button className="w-full py-3 rounded-xl bg-slate-800 text-slate-300 font-medium" whileTap={{ scale: 0.98 }}>
                Kembali
              </motion.button>
            </Link>
            <motion.button
              className="flex-1 py-3 rounded-xl bg-orange-500 text-white font-medium flex items-center justify-center gap-2"
              onClick={restart}
              whileTap={{ scale: 0.98 }}
            >
              <HugeiconsIcon icon={RefreshIcon} size={18} />
              Main Lagi
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      <header className="sticky top-0 z-30 glass-strong px-4 py-3 border-b border-slate-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/fun-games">
              <motion.button className="p-2 rounded-lg hover:bg-slate-800/50" whileTap={{ scale: 0.9 }}>
                <HugeiconsIcon icon={ArrowLeft01Icon} size={20} className="text-slate-400" />
              </motion.button>
            </Link>
            <span className="text-slate-50 font-bold">Pattern Game</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <motion.div
              className={`flex items-center gap-1 px-3 py-1 rounded-full ${timer <= 3 ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-slate-300'}`}
              animate={timer <= 3 ? { scale: [1, 1.1, 1] } : {}}
              transition={{ repeat: timer <= 3 ? Infinity : 0, duration: 0.5 }}
            >
              <HugeiconsIcon icon={Clock01Icon} size={16} />
              {timer}s
            </motion.div>
            <span className="text-orange-400 font-bold">{score}</span>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        <div className="text-center text-sm text-slate-400">
          Pola {currentIndex + 1} dari {totalRounds}
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
          <p className="text-sm text-slate-400 text-center mb-4">Lanjutkan pola berikut:</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {pattern.sequence.map((item, i) => (
              <motion.div
                key={i}
                className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xl font-bold text-slate-50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {item}
              </motion.div>
            ))}
            <motion.div
              className="w-12 h-12 rounded-xl bg-orange-500/20 border-2 border-dashed border-orange-500 flex items-center justify-center text-orange-400 text-xl"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              ?
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {pattern.options.map((option, index) => {
            const isCorrect = index === pattern.correctIndex;
            const isSelected = selectedAnswer === index;

            let bgColor = 'bg-slate-900 border-slate-700 hover:border-orange-500';
            if (selectedAnswer !== null) {
              if (isCorrect) bgColor = 'bg-emerald-500/20 border-emerald-500';
              else if (isSelected) bgColor = 'bg-red-500/20 border-red-500';
            }

            return (
              <motion.button
                key={index}
                className={`p-6 rounded-xl border-2 text-center text-2xl font-bold ${bgColor}`}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                whileTap={selectedAnswer === null ? { scale: 0.95 } : {}}
              >
                <span className={selectedAnswer !== null && isCorrect ? 'text-emerald-400' : selectedAnswer !== null && isSelected ? 'text-red-400' : 'text-slate-50'}>
                  {option}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PatternGame;
