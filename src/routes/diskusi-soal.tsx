import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Comment02Icon,
  Fire02Icon,
  Message01Icon
} from '@hugeicons/core-free-icons';
import { mockDiscussions } from '../lib/mock-data';
import type { Discussion } from '../lib/mock-data';

export const Route = createFileRoute('/diskusi-soal')({
  component: DiskusiSoalPage,
});

function DiskusiSoalPage() {
  const hotDiscussions = mockDiscussions.filter(d => d.isHot);
  const recentDiscussions = mockDiscussions.filter(d => !d.isHot);

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 glass-strong px-4 py-4 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/20">
            <HugeiconsIcon
              icon={Comment02Icon}
              size={28}
              strokeWidth={1.5}
              className="text-indigo-400"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-50">Diskusi Soal</h1>
            <p className="text-sm text-slate-400">Tanya & Jawab Bersama</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-6">
        {/* Hot Discussions Section */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <HugeiconsIcon
              icon={Fire02Icon}
              size={18}
              strokeWidth={1.5}
              className="text-amber-500"
            />
            <h2 className="text-sm font-semibold text-slate-50 uppercase tracking-wider">
              Populer
            </h2>
          </div>

          <div className="space-y-3">
            {hotDiscussions.map((discussion, index) => (
              <DiscussionCard
                key={discussion.id}
                discussion={discussion}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Recent Discussions Section */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <HugeiconsIcon
              icon={Message01Icon}
              size={18}
              strokeWidth={1.5}
              className="text-slate-400"
            />
            <h2 className="text-sm font-semibold text-slate-50 uppercase tracking-wider">
              Terbaru
            </h2>
          </div>

          <div className="space-y-3">
            {recentDiscussions.map((discussion, index) => (
              <DiscussionCard
                key={discussion.id}
                discussion={discussion}
                index={index + hotDiscussions.length}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

interface DiscussionCardProps {
  discussion: Discussion;
  index: number;
}

function DiscussionCard({ discussion, index }: DiscussionCardProps) {
  const subjectColors: Record<string, string> = {
    'Matematika': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    'IPA': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    'IPS': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'Bahasa Inggris': 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    'Fisika': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'Kimia': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  };

  const colorClass = subjectColors[discussion.subject] || 'bg-slate-500/20 text-slate-300 border-slate-500/30';

  return (
    <motion.div
      className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 cursor-pointer hover:bg-slate-900/80 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-slate-50 mb-2 line-clamp-2">
            {discussion.title}
          </h3>

          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${colorClass}`}>
              {discussion.subject}
            </span>

            <span className="text-xs text-slate-500">
              oleh {discussion.author}
            </span>
          </div>
        </div>

        {/* Reply count */}
        <div className="flex flex-col items-center gap-1 text-slate-400">
          <HugeiconsIcon
            icon={Message01Icon}
            size={16}
            strokeWidth={1.5}
          />
          <span className="text-xs font-medium">{discussion.replies}</span>
        </div>
      </div>

      {/* Hot indicator */}
      {discussion.isHot && (
        <div className="mt-3 flex items-center gap-1.5">
          <HugeiconsIcon
            icon={Fire02Icon}
            size={14}
            strokeWidth={1.5}
            className="text-amber-500"
          />
          <span className="text-xs text-amber-400 font-medium">Sedang ramai</span>
        </div>
      )}
    </motion.div>
  );
}
