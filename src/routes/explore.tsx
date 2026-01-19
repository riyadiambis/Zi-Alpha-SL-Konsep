import { useState } from 'react';
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    Search01Icon,
    ArrowRight01Icon,
    AiBrain01Icon,
    PlayIcon
} from '@hugeicons/core-free-icons';
import { mockSubjects, mockGrades, mockTopics, mockSubjectProgress } from '../lib/mock-data';

export const Route = createFileRoute('/explore')({
    component: ExplorePage,
});

function ExplorePage() {
    const navigate = useNavigate();
    const [selectedGrade, setSelectedGrade] = useState<string>('8');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredSubjects = mockSubjects.filter(subject =>
        subject.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Also search topics and playlists
    const filteredTopics = mockTopics.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mockSubjects.find(s => s.id === t.subjectId)?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleTopicClick = (_subjectId: string, _topicId: string) => {
        // Navigate to ZiAbot (topic context would be passed differently in real app)
        navigate({
            to: '/ziabot' as any,
        });
    };

    return (
        <div className="min-h-screen bg-slate-950 pb-20">
            {/* Header with search */}
            <header className="sticky top-0 z-30 glass-strong px-4 py-4">
                <h1 className="text-lg font-bold text-slate-50 mb-3">Explore</h1>

                {/* Search bar */}
                <div className="relative">
                    <HugeiconsIcon
                        icon={Search01Icon}
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                        type="text"
                        placeholder="Cari mata pelajaran, topik, atau playlist..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
                    />
                </div>

                {/* Grade filter chips */}
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                    {mockGrades.map(grade => (
                        <motion.button
                            key={grade.id}
                            onClick={() => setSelectedGrade(grade.id)}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${selectedGrade === grade.id
                                ? 'bg-indigo-500 text-white'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                }`}
                            whileTap={{ scale: 0.95 }}
                        >
                            {grade.name}
                        </motion.button>
                    ))}
                </div>
            </header>

            {/* Subjects Grid */}
            <section className="px-4 py-6">
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                    Mata Pelajaran
                </h2>

                <div className="grid grid-cols-2 gap-3">
                    {filteredSubjects.map((subject, index) => {
                        const progress = mockSubjectProgress.find(p => p.subjectId === subject.id);
                        return (
                            <motion.div
                                key={subject.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link
                                    to="/explore/$subjectId"
                                    params={{ subjectId: subject.id }}
                                    className="block bg-slate-900 rounded-xl p-4 border border-slate-800 hover:border-indigo-500/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-2xl">{subject.icon}</span>
                                        <h3 className="font-semibold text-slate-50 text-sm">{subject.name}</h3>
                                    </div>

                                    {/* Progress bar */}
                                    {progress && (
                                        <div className="mb-3">
                                            <div className="flex justify-between text-[10px] mb-1">
                                                <span className="text-slate-500">Progress</span>
                                                <span className="text-indigo-400">{progress.percentage}%</span>
                                            </div>
                                            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-indigo-500"
                                                    style={{ width: `${progress.percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Topics preview */}
                                    <div className="space-y-1.5">
                                        {mockTopics
                                            .filter(t => t.subjectId === subject.id && t.gradeId === selectedGrade)
                                            .slice(0, 2)
                                            .map(topic => (
                                                <div
                                                    key={topic.id}
                                                    className="flex items-center justify-between p-2 rounded-lg bg-slate-800/50 text-left"
                                                >
                                                    <span className="text-xs text-slate-300 truncate flex-1">{topic.name}</span>
                                                    <span className="flex items-center gap-1 text-[10px] text-slate-500">
                                                        <HugeiconsIcon icon={PlayIcon} size={12} />
                                                        {topic.videoCount}
                                                    </span>
                                                </div>
                                            ))}
                                    </div>

                                    {/* Entry points */}
                                    <div className="flex gap-2 mt-3">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate({ to: '/ziabot' as any });
                                            }}
                                            className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs font-medium hover:bg-indigo-500/30 transition-colors"
                                        >
                                            <HugeiconsIcon icon={AiBrain01Icon} size={14} />
                                            ZiAbot
                                        </button>
                                        <div className="flex items-center justify-center px-3 py-2 rounded-lg bg-slate-800 text-slate-400">
                                            <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Featured Topics */}
            <section className="px-4 pb-6">
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                    Topik Populer
                </h2>

                <div className="space-y-2">
                    {mockTopics
                        .filter(t => t.gradeId === selectedGrade && t.isPopular)
                        .slice(0, 5)
                        .map((topic, index) => {
                            const subject = mockSubjects.find(s => s.id === topic.subjectId);
                            return (
                                <motion.button
                                    key={topic.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => handleTopicClick(topic.subjectId, topic.id)}
                                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-colors text-left"
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="text-lg">{subject?.icon}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-50 truncate">{topic.name}</p>
                                        <p className="text-xs text-slate-500">{subject?.name}</p>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-slate-500">
                                        <HugeiconsIcon icon={PlayIcon} size={12} />
                                        {topic.videoCount}
                                    </div>
                                </motion.button>
                            );
                        })}
                </div>
            </section>
        </div>
    );
}
