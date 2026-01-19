import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    Message01Icon,
    Cancel01Icon,
    SentIcon,
    AiBrain01Icon,
    ThumbsUpIcon
} from '@hugeicons/core-free-icons';
import type { Video } from '../../lib/mock-data';

interface QACommentsProps {
    video: Video;
    isOpen: boolean;
    onClose: () => void;
}

interface Comment {
    id: string;
    userId: string;
    userName: string;
    userAvatar: string;
    content: string;
    isQuestion: boolean;
    likes: number;
    timestamp: Date;
    replies?: Comment[];
}

// Mock Q&A-style comments
const mockComments: Comment[] = [
    {
        id: '1',
        userId: 'u1',
        userName: 'Andi Pratama',
        userAvatar: 'A',
        content: 'Pak, bagaimana cara menentukan sisi miring kalau yang diketahui hanya panjang sisi-sisi alasnya?',
        isQuestion: true,
        likes: 12,
        timestamp: new Date('2024-02-10T10:30:00'),
        replies: [
            {
                id: '1-1',
                userId: 'creator',
                userName: 'Pak Ahmad',
                userAvatar: '👨‍🏫',
                content: 'Gunakan rumus c² = a² + b² dimana c adalah sisi miring (hipotenusa). Tinggal akarkan hasilnya!',
                isQuestion: false,
                likes: 8,
                timestamp: new Date('2024-02-10T11:00:00'),
            }
        ]
    },
    {
        id: '2',
        userId: 'u2',
        userName: 'Siti Rahma',
        userAvatar: 'S',
        content: 'Apakah teorema ini berlaku untuk semua jenis segitiga?',
        isQuestion: true,
        likes: 5,
        timestamp: new Date('2024-02-10T14:20:00'),
    },
    {
        id: '3',
        userId: 'u3',
        userName: 'Budi Santoso',
        userAvatar: 'B',
        content: 'Menit 2:30 kurang jelas penjelasannya, bisa diulang lagi konsep dasarnya?',
        isQuestion: true,
        likes: 3,
        timestamp: new Date('2024-02-11T09:15:00'),
    }
];

export function QAComments({ video, isOpen, onClose }: QACommentsProps) {
    const [comments] = useState<Comment[]>(mockComments);
    const [newComment, setNewComment] = useState('');

    const handleSubmit = () => {
        if (newComment.trim()) {
            // Mock submit - in real app would send to backend
            setNewComment('');
        }
    };

    const handleAskZiAbot = (question: string) => {
        // Mock - in real app would open ZiAbot with question context
        console.log('Ask ZiAbot:', question);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="absolute inset-0 z-50 bg-slate-950/95 flex flex-col"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 25 }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                            <HugeiconsIcon icon={Message01Icon} size={20} className="text-indigo-400" />
                            <h2 className="font-semibold text-slate-50">Tanya Jawab</h2>
                            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-xs text-slate-400">
                                {comments.length}
                            </span>
                        </div>
                        <motion.button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-slate-800"
                            whileTap={{ scale: 0.95 }}
                        >
                            <HugeiconsIcon icon={Cancel01Icon} size={20} className="text-slate-400" />
                        </motion.button>
                    </div>

                    {/* Video context */}
                    <div className="px-4 py-2 bg-slate-900/50 border-b border-slate-800">
                        <p className="text-xs text-slate-500 truncate">
                            Diskusi: {video.title}
                        </p>
                    </div>

                    {/* Q&A Guidelines */}
                    <div className="px-4 py-2 bg-indigo-500/10 border-b border-indigo-500/20">
                        <p className="text-[11px] text-indigo-300">
                            💡 Ajukan pertanyaan tentang materi video ini. Fokus pada pemahaman konsep!
                        </p>
                    </div>

                    {/* Comments list */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {comments.map(comment => (
                            <motion.div
                                key={comment.id}
                                className="space-y-3"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {/* Main comment */}
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                                        {comment.userAvatar}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-sm font-medium text-slate-50">{comment.userName}</span>
                                            {comment.isQuestion && (
                                                <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-400">
                                                    Pertanyaan
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-300 leading-relaxed">{comment.content}</p>

                                        {/* Actions */}
                                        <div className="flex items-center gap-4 mt-2">
                                            <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-400">
                                                <HugeiconsIcon icon={ThumbsUpIcon} size={12} />
                                                {comment.likes}
                                            </button>
                                            <button
                                                onClick={() => handleAskZiAbot(comment.content)}
                                                className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300"
                                            >
                                                <HugeiconsIcon icon={AiBrain01Icon} size={12} />
                                                Tanya ZiAbot
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Replies */}
                                {comment.replies && comment.replies.length > 0 && (
                                    <div className="ml-11 space-y-3">
                                        {comment.replies.map(reply => (
                                            <div key={reply.id} className="flex gap-3">
                                                <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center text-sm flex-shrink-0">
                                                    {reply.userAvatar}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-sm font-medium text-emerald-400">{reply.userName}</span>
                                                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400">
                                                            Pengajar
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-slate-300 leading-relaxed">{reply.content}</p>
                                                    <div className="flex items-center gap-4 mt-2">
                                                        <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-400">
                                                            <HugeiconsIcon icon={ThumbsUpIcon} size={12} />
                                                            {reply.likes}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Ajukan pertanyaan tentang materi ini..."
                                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                            />
                            <motion.button
                                onClick={handleSubmit}
                                disabled={!newComment.trim()}
                                className={`p-2.5 rounded-xl transition-colors ${newComment.trim()
                                        ? 'bg-indigo-500 text-white'
                                        : 'bg-slate-800 text-slate-500'
                                    }`}
                                whileTap={{ scale: 0.95 }}
                            >
                                <HugeiconsIcon icon={SentIcon} size={18} />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
