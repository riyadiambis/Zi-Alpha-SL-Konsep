import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowLeft01Icon,
  RefreshIcon,
  Tick01Icon,
  Cancel01Icon
} from '@hugeicons/core-free-icons';
import { useState } from 'react';

export const Route = createFileRoute('/fun-games/logic')({
  component: LogicPuzzle,
});

interface Puzzle {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const puzzles: Puzzle[] = [
  {
    id: '1',
    question: 'Jika semua kucing adalah hewan, dan Mimi adalah kucing, maka...',
    options: ['Mimi bukan hewan', 'Mimi adalah hewan', 'Semua hewan adalah kucing', 'Mimi adalah anjing'],
    correctIndex: 1,
    explanation: 'Karena Mimi adalah kucing, dan semua kucing adalah hewan, maka Mimi adalah hewan.',
  },
  {
    id: '2',
    question: 'A lebih tinggi dari B. C lebih pendek dari B. Siapa yang paling tinggi?',
    options: ['A', 'B', 'C', 'Sama semua'],
    correctIndex: 0,
    explanation: 'A > B > C, jadi A yang paling tinggi.',
  },
  {
    id: '3',
    question: 'Urutan mana yang benar? 2, 4, 8, 16, ...',
    options: ['20', '24', '32', '18'],
    correctIndex: 2,
    explanation: 'Setiap angka dikalikan 2. 16 × 2 = 32.',
  },
  {
    id: '4',
    question: 'Hari ini Rabu. 3 hari lalu adalah hari apa?',
    options: ['Senin', 'Minggu', 'Sabtu', 'Jumat'],
    correctIndex: 1,
    explanation: 'Rabu - 3 hari = Minggu.',
  },
  {
    id: '5',
    question: 'Jika hujan, jalan basah. Jalan basah. Maka...',
    options: ['Pasti hujan', 'Belum tentu hujan', 'Tidak hujan', 'Jalan kering'],
    correctIndex: 1,
    explanation: 'Jalan bisa basah karena hal lain. Ini adalah logical fallacy.',
  },
  {
    id: '6',
    question: 'Lima orang antri. Budi di depan Ani tapi di belakang Citra. Siapa paling depan?',
    options: ['Budi', 'Ani', 'Citra', 'Tidak bisa ditentukan'],
    correctIndex: 2,
    explanation: 'Urutan: Citra - Budi - Ani. Citra paling depan.',
  },
  {
    id: '7',
    question: 'Angka berapa yang hilang? 1, 1, 2, 3, 5, 8, ...',
    options: ['10', '11', '13', '15'],
    correctIndex: 2,
    explanation: 'Ini adalah deret Fibonacci. 5 + 8 = 13.',
  },
  {
    id: '8',
    question: 'Semua bunga mawar harum. Bunga ini harum. Apakah ini mawar?',
    options: ['Ya, pasti mawar', 'Belum tentu mawar', 'Bukan mawar', 'Tidak ada jawaban'],
    correctIndex: 1,
    explanation: 'Bunga lain juga bisa harum. Tidak bisa disimpulkan ini mawar.',
  },
];

function LogicPuzzle() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [streak, setStreak] = useState(0);

  const puzzle = puzzles[currentIndex];
  const totalPuzzles = 5;

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    const isCorrect = index === puzzle.correctIndex;

    if (isCorrect) {
      setScore(s => s + 100 + streak * 10);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }

    setShowResult(true);
  };

  const nextPuzzle = () => {
    if (currentIndex + 1 >= totalPuzzles) {
      setGameComplete(true);
    } else {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameComplete(false);
    setStreak(0);
  };

  if (gameComplete) {
    const xpEarned = Math.floor(score / 10) + 15;
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <motion.div className="text-center w-full max-w-md" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
          <span className="text-6xl">🧩</span>
          <h2 className="text-2xl font-bold text-purple-400 mt-4">Puzzle Selesai!</h2>

          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 mt-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Skor</span>
              <span className="font-bold text-slate-50">{score}</span>
            </div>
            <div className="flex justify-between border-t border-slate-700 pt-3">
              <span className="text-slate-400">XP Diperoleh</span>
              <span className="font-bold text-purple-400">+{xpEarned} XP</span>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Link to="/fun-games" className="flex-1">
              <motion.button className="w-full py-3 rounded-xl bg-slate-800 text-slate-300 font-medium" whileTap={{ scale: 0.98 }}>
                Kembali
              </motion.button>
            </Link>
            <motion.button
              className="flex-1 py-3 rounded-xl bg-purple-500 text-white font-medium flex items-center justify-center gap-2"
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
            <span className="text-slate-50 font-bold">Logic Puzzle</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-slate-400">Soal {currentIndex + 1}/{totalPuzzles}</span>
            <span className="text-purple-400 font-bold">{score} pts</span>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {streak >= 2 && (
          <motion.div
            className="text-center text-amber-400 font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            🔥 Streak x{streak}!
          </motion.div>
        )}

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
          <p className="text-lg text-slate-50 text-center font-medium">{puzzle.question}</p>
        </div>

        <div className="space-y-3">
          {puzzle.options.map((option, index) => {
            const isCorrect = index === puzzle.correctIndex;
            const isSelected = selectedAnswer === index;

            let bgColor = 'bg-slate-900 border-slate-700';
            if (showResult) {
              if (isCorrect) bgColor = 'bg-emerald-500/20 border-emerald-500';
              else if (isSelected) bgColor = 'bg-red-500/20 border-red-500';
            }

            return (
              <motion.button
                key={index}
                className={`w-full p-4 rounded-xl border-2 text-left flex items-center gap-3 ${bgColor}`}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
              >
                <span className={`flex-1 ${showResult && isCorrect ? 'text-emerald-400' : showResult && isSelected ? 'text-red-400' : 'text-slate-50'}`}>
                  {option}
                </span>
                {showResult && isCorrect && <HugeiconsIcon icon={Tick01Icon} size={20} className="text-emerald-400" />}
                {showResult && isSelected && !isCorrect && <HugeiconsIcon icon={Cancel01Icon} size={20} className="text-red-400" />}
              </motion.button>
            );
          })}
        </div>

        {showResult && (
          <motion.div
            className="bg-slate-800/50 rounded-xl p-4 border border-slate-700"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm text-slate-300">{puzzle.explanation}</p>
          </motion.div>
        )}

        {showResult && (
          <motion.button
            className="w-full py-4 rounded-2xl bg-purple-500 text-white font-bold text-lg"
            onClick={nextPuzzle}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {currentIndex + 1 >= totalPuzzles ? 'Lihat Hasil' : 'Lanjut'}
          </motion.button>
        )}
      </div>
    </div>
  );
}

export default LogicPuzzle;
