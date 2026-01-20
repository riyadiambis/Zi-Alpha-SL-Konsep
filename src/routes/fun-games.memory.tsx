import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowLeft01Icon,
  RefreshIcon,
  Clock01Icon
} from '@hugeicons/core-free-icons';
import { useState, useEffect, useCallback } from 'react';

export const Route = createFileRoute('/fun-games/memory')({
  component: MemoryGame,
});

const symbols = ['🍎', '🍊', '🍋', '🍇', '🍓', '🫐', '🥝', '🍑'];

interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

function MemoryGame() {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [timer, setTimer] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);

  const getPairCount = useCallback(() => {
    switch (difficulty) {
      case 'easy': return 4;
      case 'medium': return 6;
      case 'hard': return 8;
    }
  }, [difficulty]);

  const initGame = useCallback(() => {
    const pairCount = getPairCount();
    const selectedSymbols = symbols.slice(0, pairCount);
    const cardPairs = [...selectedSymbols, ...selectedSymbols];

    const shuffled = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameStarted(true);
    setGameComplete(false);
    setTimer(0);
  }, [getPairCount]);

  useEffect(() => {
    if (gameStarted && !gameComplete) {
      const interval = setInterval(() => setTimer(t => t + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [gameStarted, gameComplete]);

  useEffect(() => {
    if (matches === getPairCount() && gameStarted) {
      setGameComplete(true);
      const baseXP = difficulty === 'easy' ? 20 : difficulty === 'medium' ? 35 : 50;
      const timeBonus = Math.max(0, 60 - timer);
      const moveBonus = Math.max(0, 30 - moves);
      setXpEarned(baseXP + timeBonus + moveBonus);
    }
  }, [matches, gameStarted, difficulty, timer, moves, getPairCount]);

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length >= 2) return;
    if (cards[cardId].isFlipped || cards[cardId].isMatched) return;

    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);
    setFlippedCards([...flippedCards, cardId]);

    if (flippedCards.length === 1) {
      setMoves(m => m + 1);
      const firstCard = cards[flippedCards[0]];
      const secondCard = newCards[cardId];

      if (firstCard.symbol === secondCard.symbol) {
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            c.id === firstCard.id || c.id === secondCard.id
              ? { ...c, isMatched: true }
              : c
          ));
          setMatches(m => m + 1);
          setFlippedCards([]);
        }, 500);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            c.id === firstCard.id || c.id === secondCard.id
              ? { ...c, isFlipped: false }
              : c
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-slate-950 pb-20">
        <header className="sticky top-0 z-30 glass-strong px-4 py-4 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <Link to="/fun-games">
              <motion.button className="p-2 rounded-lg hover:bg-slate-800/50" whileTap={{ scale: 0.9 }}>
                <HugeiconsIcon icon={ArrowLeft01Icon} size={20} className="text-slate-400" />
              </motion.button>
            </Link>
            <h1 className="text-lg font-bold text-slate-50">Memory Game</h1>
          </div>
        </header>

        <div className="px-4 py-8 space-y-6">
          <div className="text-center">
            <span className="text-6xl">🧠</span>
            <h2 className="text-xl font-bold text-slate-50 mt-4">Latih Ingatanmu!</h2>
            <p className="text-slate-400 mt-2">Cocokkan pasangan kartu yang sama</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-400 uppercase">Pilih Kesulitan</h3>
            {(['easy', 'medium', 'hard'] as const).map(d => (
              <motion.button
                key={d}
                className={`w-full p-4 rounded-xl border-2 text-left ${difficulty === d
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}
                onClick={() => setDifficulty(d)}
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-bold capitalize">{d}</span>
                <span className="text-sm ml-2">
                  ({d === 'easy' ? '8' : d === 'medium' ? '12' : '16'} kartu)
                </span>
              </motion.button>
            ))}
          </div>

          <motion.button
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-lg"
            onClick={initGame}
            whileTap={{ scale: 0.98 }}
          >
            Mulai Main
          </motion.button>
        </div>
      </div>
    );
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <motion.div className="text-center w-full max-w-md" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <span className="text-6xl">🎉</span>
          <h2 className="text-2xl font-bold text-emerald-400 mt-4">Selesai!</h2>

          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 mt-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Waktu</span>
              <span className="font-bold text-slate-50">{timer}s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Gerakan</span>
              <span className="font-bold text-slate-50">{moves}</span>
            </div>
            <div className="flex justify-between border-t border-slate-700 pt-3">
              <span className="text-slate-400">XP Diperoleh</span>
              <span className="font-bold text-emerald-400">+{xpEarned} XP</span>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Link to="/fun-games" className="flex-1">
              <motion.button className="w-full py-3 rounded-xl bg-slate-800 text-slate-300 font-medium" whileTap={{ scale: 0.98 }}>
                Kembali
              </motion.button>
            </Link>
            <motion.button
              className="flex-1 py-3 rounded-xl bg-emerald-500 text-white font-medium flex items-center justify-center gap-2"
              onClick={initGame}
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

  const gridCols = difficulty === 'hard' ? 'grid-cols-4' : 'grid-cols-4';

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
            <span className="text-slate-50 font-bold">Memory</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-slate-400"><HugeiconsIcon icon={Clock01Icon} size={16} className="inline mr-1" />{timer}s</span>
            <span className="text-emerald-400">{matches}/{getPairCount()}</span>
          </div>
        </div>
      </header>

      <div className="px-4 py-6">
        <div className={`grid ${gridCols} gap-2`}>
          {cards.map(card => (
            <motion.button
              key={card.id}
              className={`aspect-square rounded-xl text-3xl flex items-center justify-center ${card.isMatched
                  ? 'bg-emerald-500/30 border-2 border-emerald-500'
                  : card.isFlipped
                    ? 'bg-slate-700 border-2 border-cyan-500'
                    : 'bg-slate-800 border-2 border-slate-700'
                }`}
              onClick={() => handleCardClick(card.id)}
              whileTap={{ scale: 0.95 }}
            >
              {(card.isFlipped || card.isMatched) && (
                <span>{card.symbol}</span>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MemoryGame;
