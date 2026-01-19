import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    SentIcon,
    Note01Icon,
    Quiz02Icon,
    FlashIcon,
    AiBrain01Icon
} from '@hugeicons/core-free-icons';
import { MessageBubble } from '../chat/message-bubble';
import type { Message, ZiAbotContext } from '../../lib/mock-data';
import { getRandomZiAbotResponse, ziabotResponses, getVideoContextResponse } from '../../lib/mock-data';

interface ZiAbotChatProps {
    context: ZiAbotContext | null;
    onGenerateNotes: () => void;
    onGeneratePractice: () => void;
    onGenerateFlashcards: () => void;
}

export function ZiAbotChat({
    context,
    onGenerateNotes,
    onGeneratePractice,
    onGenerateFlashcards,
}: ZiAbotChatProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initialize with greeting based on context
    useEffect(() => {
        if (context) {
            let welcomeMessage = '';
            if (context.type === 'video' && context.videoTitle) {
                welcomeMessage = getVideoContextResponse(context.videoTitle);
            } else if (context.type === 'topic' && context.topic) {
                welcomeMessage = `Hai! Kamu memilih topik "${context.topic}" untuk ${context.subject} ${context.grade}. ${ziabotResponses.disclaimer}\n\nApa yang ingin kamu pelajari?`;
            } else {
                welcomeMessage = getRandomZiAbotResponse('greeting');
            }

            setMessages([{
                id: 'welcome',
                role: 'assistant',
                content: welcomeMessage,
                timestamp: new Date(),
            }]);
        } else {
            setMessages([{
                id: 'initial',
                role: 'assistant',
                content: 'Silakan pilih topik di atas untuk memulai. ZiAbot siap membantumu belajar! 📚',
                timestamp: new Date(),
            }]);
        }
    }, [context]);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!inputValue.trim() || !context) return;

        const userMessage: Message = {
            id: `user-${Date.now()}`,
            role: 'user',
            content: inputValue,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');

        // Simulate AI response
        setIsTyping(true);
        await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 1000));
        setIsTyping(false);

        const aiMessage: Message = {
            id: `ai-${Date.now()}`,
            role: 'assistant',
            content: getRandomZiAbotResponse('socratic'),
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMessage]);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                {messages.map(message => (
                    <MessageBubble key={message.id} message={message} />
                ))}

                {/* Typing indicator */}
                <AnimatePresence>
                    {isTyping && (
                        <motion.div
                            className="flex justify-start mb-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="bubble-ai px-4 py-3">
                                <div className="flex items-center gap-1">
                                    <motion.span
                                        className="w-2 h-2 rounded-full bg-indigo-400"
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                                    />
                                    <motion.span
                                        className="w-2 h-2 rounded-full bg-indigo-400"
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                                    />
                                    <motion.span
                                        className="w-2 h-2 rounded-full bg-indigo-400"
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
            </div>

            {/* Quick action buttons */}
            {context && (
                <div className="px-4 pb-2">
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        <motion.button
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium whitespace-nowrap"
                            onClick={onGenerateNotes}
                            whileTap={{ scale: 0.95 }}
                        >
                            <HugeiconsIcon icon={Note01Icon} size={14} />
                            Buat Catatan
                        </motion.button>
                        <motion.button
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium whitespace-nowrap"
                            onClick={onGeneratePractice}
                            whileTap={{ scale: 0.95 }}
                        >
                            <HugeiconsIcon icon={Quiz02Icon} size={14} />
                            Latihan Soal
                        </motion.button>
                        <motion.button
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-medium whitespace-nowrap"
                            onClick={onGenerateFlashcards}
                            whileTap={{ scale: 0.95 }}
                        >
                            <HugeiconsIcon icon={FlashIcon} size={14} />
                            Flashcards
                        </motion.button>
                    </div>
                </div>
            )}

            {/* Input area */}
            <div className="p-4 border-t border-slate-800/50 bg-slate-900/50">
                <div className="flex items-center gap-2">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={context ? "Tanya ZiAbot..." : "Pilih topik terlebih dahulu"}
                            disabled={!context || isTyping}
                            className="w-full px-4 py-2.5 pr-12 rounded-full bg-slate-800 border border-slate-700 text-slate-50 text-sm placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-50"
                        />
                        <div className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-indigo-500/20">
                            <HugeiconsIcon icon={AiBrain01Icon} size={16} className="text-indigo-400" />
                        </div>
                    </div>
                    <motion.button
                        className={`p-2.5 rounded-full transition-colors ${inputValue.trim() && context
                                ? 'bg-indigo-500 text-white'
                                : 'bg-slate-800 text-slate-500'
                            }`}
                        onClick={handleSend}
                        disabled={!inputValue.trim() || !context || isTyping}
                        whileTap={inputValue.trim() && context ? { scale: 0.9 } : {}}
                    >
                        <HugeiconsIcon icon={SentIcon} size={20} />
                    </motion.button>
                </div>
            </div>
        </div>
    );
}

export default ZiAbotChat;
