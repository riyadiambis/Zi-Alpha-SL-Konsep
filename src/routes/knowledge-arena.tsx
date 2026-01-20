import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowLeft01Icon,
  UserMultipleIcon,
  GameController01Icon,
  Clock01Icon,
  ArrowRight01Icon
} from '@hugeicons/core-free-icons';
import { useState } from 'react';

export const Route = createFileRoute('/knowledge-arena')({
  component: KnowledgeArenaHome,
});

const difficultyPresets = [
  { id: 'sd-1-3', label: 'SD 1-3', color: 'emerald' },
  { id: 'sd-4-6', label: 'SD 4-6', color: 'blue' },
  { id: 'smp', label: 'SMP', color: 'purple' },
  { id: 'sma', label: 'SMA', color: 'orange' },
  { id: 'utbk', label: 'UTBK', color: 'red' },
];

const playerCounts = [2, 3, 4];

function KnowledgeArenaHome() {
  const [selectedPreset, setSelectedPreset] = useState('smp');
  const [playerCount, setPlayerCount] = useState(2);
  const [gameMode, setGameMode] = useState<'ffa' | '2v2'>('ffa');
  const [roomCode, setRoomCode] = useState('');

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      <header className="sticky top-0 z-30 glass-strong px-4 py-4 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <Link to="/progress">
            <motion.button
              className="p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={20} className="text-slate-400" />
            </motion.button>
          </Link>
          <HugeiconsIcon icon={GameController01Icon} size={24} className="text-cyan-400" />
          <h1 className="text-lg font-bold text-slate-50">Knowledge Arena</h1>
        </div>
      </header>

      <section className="px-4 py-6">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Pilih Tingkat Kesulitan
        </h2>
        <div className="flex flex-wrap gap-2">
          {difficultyPresets.map(preset => (
            <motion.button
              key={preset.id}
              className={`px-4 py-2 rounded-xl font-medium text-sm border-2 transition-all ${selectedPreset === preset.id
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'
                }`}
              onClick={() => setSelectedPreset(preset.id)}
              whileTap={{ scale: 0.95 }}
            >
              {preset.label}
            </motion.button>
          ))}
        </div>
      </section>

      <section className="px-4 pb-6">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Jumlah Pemain
        </h2>
        <div className="flex gap-3">
          {playerCounts.map(count => (
            <motion.button
              key={count}
              className={`flex-1 py-4 rounded-xl font-bold text-lg border-2 transition-all ${playerCount === count
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'
                }`}
              onClick={() => setPlayerCount(count)}
              whileTap={{ scale: 0.95 }}
            >
              <HugeiconsIcon icon={UserMultipleIcon} size={20} className="mx-auto mb-1" />
              {count} Pemain
            </motion.button>
          ))}
        </div>
      </section>

      {playerCount === 4 && (
        <section className="px-4 pb-6">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Mode Permainan
          </h2>
          <div className="flex gap-3">
            <motion.button
              className={`flex-1 py-4 rounded-xl font-medium border-2 transition-all ${gameMode === 'ffa'
                  ? 'bg-orange-500/20 border-orange-500 text-orange-300'
                  : 'bg-slate-900 border-slate-700 text-slate-400'
                }`}
              onClick={() => setGameMode('ffa')}
              whileTap={{ scale: 0.95 }}
            >
              Free-for-All
            </motion.button>
            <motion.button
              className={`flex-1 py-4 rounded-xl font-medium border-2 transition-all ${gameMode === '2v2'
                  ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                  : 'bg-slate-900 border-slate-700 text-slate-400'
                }`}
              onClick={() => setGameMode('2v2')}
              whileTap={{ scale: 0.95 }}
            >
              2 vs 2
            </motion.button>
          </div>
        </section>
      )}

      <section className="px-4 pb-6">
        <Link to={`/knowledge-arena/lobby?preset=${selectedPreset}&players=${playerCount}&mode=${gameMode}`}>
          <motion.button
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg shadow-lg shadow-cyan-500/30"
            whileTap={{ scale: 0.98 }}
          >
            Buat Room Baru
          </motion.button>
        </Link>
      </section>

      <section className="px-4 pb-6">
        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Gabung Room
          </h3>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Masukkan kode room"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-50 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              maxLength={6}
            />
            <motion.button
              className="px-6 py-3 rounded-xl bg-slate-700 text-slate-300 font-medium hover:bg-slate-600 transition-colors disabled:opacity-50"
              whileTap={{ scale: 0.95 }}
              disabled={roomCode.length < 4}
            >
              Gabung
            </motion.button>
          </div>
        </div>
      </section>

      <section className="px-4 pb-6">
        <div className="bg-slate-900/50 rounded-2xl p-5 border border-slate-800/50">
          <h3 className="text-sm font-semibold text-slate-400 mb-3 flex items-center gap-2">
            <HugeiconsIcon icon={Clock01Icon} size={16} />
            Cara Bermain
          </h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>• Jawab 15 pertanyaan pengetahuan umum</li>
            <li>• Skor = Akurasi × Kecepatan</li>
            <li>• Pemain dengan skor tertinggi menang</li>
            <li>• Mode 2v2: Total skor tim menentukan pemenang</li>
          </ul>
        </div>
      </section>

      <Outlet />
    </div>
  );
}

export default KnowledgeArenaHome;
