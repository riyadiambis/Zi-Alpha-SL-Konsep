import { useState, useRef, useEffect } from 'react';
import { createFileRoute, useSearch, useNavigate } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    AiBrain01Icon,
    InformationCircleIcon,
    File01Icon,
    Cancel01Icon,
    Note01Icon,
    CheckmarkBadge01Icon,
    FlashIcon,
    SentIcon,
    SparklesIcon
} from '@hugeicons/core-free-icons';
import type { ZiAbotContext } from '../lib/mock-data';
import { generateMockNotes, generateMockPracticeQuestions, generateMockFlashcards, ziabotResponses } from '../lib/mock-data';

// Search params for receiving video context
interface ZiAbotSearch {
    videoId?: string;
    videoTitle?: string;
    action?: 'notes' | 'practice' | 'flashcards';
}

export const Route = createFileRoute('/ziabot')({
    component: ZiAbotPage,
    validateSearch: (search: Record<string, unknown>): ZiAbotSearch => {
        return {
            videoId: search.videoId as string | undefined,
            videoTitle: search.videoTitle as string | undefined,
            action: search.action as ZiAbotSearch['action'] | undefined,
        };
    },
});

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

interface DocFile {
    id: string;
    name: string;
    type: string;
    uploadedAt: Date;
}

function ZiAbotPage() {
    const search = useSearch({ from: '/ziabot' });
    const navigate = useNavigate();

    // Initialize context from search params (video context mode)
    const [context, setContext] = useState<ZiAbotContext | null>(() => {
        if (search.videoId && search.videoTitle) {
            return {
                type: 'video',
                videoId: search.videoId,
                videoTitle: search.videoTitle,
            };
        }
        return null;
    });

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [uploadedDoc, setUploadedDoc] = useState<DocFile | null>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Scroll to bottom when messages change
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (text: string) => {
        if (!text.trim()) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: text,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI response delay
        setTimeout(() => {
            const response = ziabotResponses.socratic[Math.floor(Math.random() * ziabotResponses.socratic.length)];
            const assistantMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, assistantMessage]);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000);
    };

    const handleDocumentUpload = () => {
        // Mock file upload
        const mockDoc = {
            id: Date.now().toString(),
            name: 'Materi Matematika Kelas 8.pdf',
            type: 'pdf' as const,
            uploadedAt: new Date(),
        };
        setUploadedDoc(mockDoc);

        // Set document context
        setContext({
            type: 'document',
            documentId: mockDoc.id,
            documentName: mockDoc.name,
        });

        // Add system message about document
        const systemMessage: ChatMessage = {
            id: Date.now().toString(),
            role: 'assistant',
            content: `📄 Dokumen "${mockDoc.name}" berhasil dimuat!\n\nSekarang saya bisa membantu kamu:\n• Membuat rangkuman materi\n• Menyusun soal latihan\n• Membuat flashcard\n\nTanyakan apa saja dari dokumen ini!`,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, systemMessage]);
    };

    const handleRemoveDocument = () => {
        setUploadedDoc(null);
        setContext(null);
    };

    const handleGenerateNotes = () => {
        const topic = context?.type === 'video' ? context.videoTitle :
            context?.type === 'document' ? context.documentName : 'Topik';
        const notes = generateMockNotes(topic || 'Topik', context!);
        sessionStorage.setItem('ziabot-notes', JSON.stringify(notes));
        navigate({ to: '/ziabot/notes' });
    };

    const handleGeneratePractice = () => {
        const topic = context?.type === 'video' ? context.videoTitle :
            context?.type === 'document' ? context.documentName : 'Topik';
        const practice = generateMockPracticeQuestions(topic || 'Topik', context!);
        sessionStorage.setItem('ziabot-practice', JSON.stringify(practice));
        navigate({ to: '/ziabot/practice' });
    };

    const handleGenerateFlashcards = () => {
        const topic = context?.type === 'video' ? context.videoTitle :
            context?.type === 'document' ? context.documentName : 'Topik';
        const flashcards = generateMockFlashcards(topic || 'Topik', context!);
        sessionStorage.setItem('ziabot-flashcards', JSON.stringify(flashcards));
        navigate({ to: '/ziabot/flashcards' });
    };

    const hasStartedConversation = messages.length > 0;

    return (
        <div className="min-h-screen bg-slate-950 pb-20 flex flex-col">
            {/* Header */}
            <div className="sticky top-0 z-30 glass-strong px-4 py-3 border-b border-slate-800/50">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
                        <HugeiconsIcon
                            icon={AiBrain01Icon}
                            size={24}
                            strokeWidth={1.5}
                            className="text-indigo-400"
                        />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-lg font-bold text-slate-50">ZiAbot</h1>
                        <p className="text-xs text-slate-400">
                            {context?.type === 'video' && `Video: ${context.videoTitle}`}
                            {context?.type === 'document' && `📄 ${context.documentName}`}
                            {!context && 'AI Study Assistant'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Hero Section - Only show when no conversation started */}
            <AnimatePresence>
                {!hasStartedConversation && (
                    <motion.div
                        className="flex-1 flex flex-col items-center justify-center px-6 py-8"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        {/* Hero Icon */}
                        <motion.div
                            className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <HugeiconsIcon icon={AiBrain01Icon} size={48} className="text-white" />
                        </motion.div>

                        {/* Hero Title */}
                        <motion.h2
                            className="text-2xl font-bold text-slate-50 text-center mb-2"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Meet ZiAbot
                        </motion.h2>
                        <motion.p
                            className="text-slate-400 text-center mb-8 max-w-xs"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Your AI-powered study mentor. Ask questions, explore concepts, or upload documents to learn smarter.
                        </motion.p>

                        {/* Document Upload Card */}
                        {!uploadedDoc && (
                            <motion.button
                                onClick={handleDocumentUpload}
                                className="w-full max-w-sm p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all group"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors">
                                        <HugeiconsIcon icon={File01Icon} size={24} className="text-indigo-400" />
                                    </div>
                                    <div className="text-left flex-1">
                                        <p className="font-semibold text-slate-50">Upload Document</p>
                                        <p className="text-xs text-slate-500">PDF, Image, or Doc • Learn with AI</p>
                                    </div>
                                    <HugeiconsIcon icon={SparklesIcon} size={20} className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </motion.button>
                        )}

                        {/* Uploaded Document Card */}
                        {uploadedDoc && (
                            <motion.div
                                className="w-full max-w-sm p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-emerald-500/20">
                                        <HugeiconsIcon icon={File01Icon} size={20} className="text-emerald-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-50 truncate">{uploadedDoc.name}</p>
                                        <p className="text-xs text-slate-500">PDF Document</p>
                                    </div>
                                    <motion.button
                                        onClick={handleRemoveDocument}
                                        className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-500"
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <HugeiconsIcon icon={Cancel01Icon} size={16} />
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}

                        {/* Quick Actions */}
                        {(context || uploadedDoc) && (
                            <motion.div
                                className="flex gap-2 mt-6"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <motion.button
                                    onClick={handleGenerateNotes}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition-colors"
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <HugeiconsIcon icon={Note01Icon} size={16} />
                                    Notes
                                </motion.button>
                                <motion.button
                                    onClick={handleGeneratePractice}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition-colors"
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <HugeiconsIcon icon={CheckmarkBadge01Icon} size={16} />
                                    Practice
                                </motion.button>
                                <motion.button
                                    onClick={handleGenerateFlashcards}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition-colors"
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <HugeiconsIcon icon={FlashIcon} size={16} />
                                    Cards
                                </motion.button>
                            </motion.div>
                        )}

                        {/* Disclaimer */}
                        <motion.div
                            className="mt-8 px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-800 max-w-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <div className="flex gap-2">
                                <HugeiconsIcon icon={InformationCircleIcon} size={14} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                                <p className="text-[11px] text-slate-500 leading-relaxed">
                                    {ziabotResponses.disclaimer}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat Messages */}
            {hasStartedConversation && (
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                    {/* Document indicator */}
                    {uploadedDoc && (
                        <div className="flex justify-center mb-4">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                                <HugeiconsIcon icon={File01Icon} size={12} className="text-emerald-400" />
                                <span className="text-xs text-emerald-400">{uploadedDoc.name}</span>
                                <button onClick={handleRemoveDocument} className="text-slate-500 hover:text-slate-400">
                                    <HugeiconsIcon icon={Cancel01Icon} size={12} />
                                </button>
                            </div>
                        </div>
                    )}

                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div
                                className={`max-w-[80%] px-4 py-3 rounded-2xl ${message.role === 'user'
                                    ? 'bg-indigo-500 text-white rounded-br-md'
                                    : 'bg-slate-800 text-slate-100 rounded-bl-md'
                                    }`}
                            >
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            </div>
                        </motion.div>
                    ))}

                    {isTyping && (
                        <motion.div
                            className="flex justify-start"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className="bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-md">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Quick action buttons when in conversation */}
                    {context && messages.length > 0 && !isTyping && (
                        <motion.div
                            className="flex flex-wrap gap-2 justify-center pt-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <button
                                onClick={handleGenerateNotes}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-slate-400 text-xs hover:bg-slate-800 transition-colors"
                            >
                                <HugeiconsIcon icon={Note01Icon} size={12} />
                                Generate Notes
                            </button>
                            <button
                                onClick={handleGeneratePractice}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-slate-400 text-xs hover:bg-slate-800 transition-colors"
                            >
                                <HugeiconsIcon icon={CheckmarkBadge01Icon} size={12} />
                                Practice Questions
                            </button>
                            <button
                                onClick={handleGenerateFlashcards}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-slate-400 text-xs hover:bg-slate-800 transition-colors"
                            >
                                <HugeiconsIcon icon={FlashIcon} size={12} />
                                Flashcards
                            </button>
                        </motion.div>
                    )}

                    <div ref={chatEndRef} />
                </div>
            )}

            {/* Input Area */}
            <div className="sticky bottom-16 px-4 py-3 bg-slate-950 border-t border-slate-800">
                <div className="flex items-center gap-2">
                    {!hasStartedConversation && !uploadedDoc && (
                        <motion.button
                            onClick={handleDocumentUpload}
                            className="p-3 rounded-xl bg-slate-800 text-slate-400 hover:text-indigo-400 hover:bg-slate-700 transition-colors"
                            whileTap={{ scale: 0.95 }}
                        >
                            <HugeiconsIcon icon={File01Icon} size={20} />
                        </motion.button>
                    )}
                    <div className="flex-1 relative">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                            placeholder="Ask ZiAbot anything..."
                            className="w-full px-4 py-3 pr-12 rounded-xl bg-slate-800 border border-slate-700 text-slate-50 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                        <motion.button
                            onClick={() => handleSendMessage(inputValue)}
                            disabled={!inputValue.trim()}
                            className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors ${inputValue.trim()
                                ? 'bg-indigo-500 text-white'
                                : 'bg-slate-700 text-slate-500'
                                }`}
                            whileTap={{ scale: 0.9 }}
                        >
                            <HugeiconsIcon icon={SentIcon} size={18} />
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
}
