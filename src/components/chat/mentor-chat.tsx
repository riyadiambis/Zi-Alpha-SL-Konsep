import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowDown01Icon } from '@hugeicons/core-free-icons';
import { MessageBubble } from './message-bubble';
import { ChatInput } from './chat-input';
import type { Video, Message } from '../../lib/mock-data';
import { getRandomSocraticResponse, mockChatMessages } from '../../lib/mock-data';

interface MentorChatProps {
    isOpen: boolean;
    onClose: () => void;
    video: Video | null;
}

export function MentorChat({ isOpen, onClose, video }: MentorChatProps) {
    const [messages, setMessages] = useState<Message[]>([...mockChatMessages]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Reset messages when video changes
    useEffect(() => {
        if (video) {
            setMessages([
                {
                    id: 'welcome',
                    role: 'assistant',
                    content: `Halo! Aku Zi, mentor AI kamu. Aku bisa membantumu memahami materi "${video.title}". Apa yang ingin kamu tanyakan?`,
                    timestamp: new Date(),
                }
            ]);
        }
    }, [video?.id]);

    const handleSendMessage = async (content: string) => {
        // Add user message
        const userMessage: Message = {
            id: `user-${Date.now()}`,
            role: 'user',
            content,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMessage]);

        // Simulate AI typing delay
        setIsTyping(true);
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));
        setIsTyping(false);

        // Add AI response (Socratic style)
        const aiResponse: Message = {
            id: `ai-${Date.now()}`,
            role: 'assistant',
            content: getRandomSocraticResponse(),
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Bottom sheet */}
                    <motion.div
                        className="fixed bottom-0 left-0 right-0 z-50 flex flex-col"
                        style={{ height: '70vh', maxHeight: '600px' }}
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    >
                        {/* Glass header */}
                        <div className="glass-strong rounded-t-2xl px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                    <span className="text-indigo-400 text-sm">🧠</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-50 text-sm">Zi Mentor</h3>
                                    {video && (
                                        <p className="text-xs text-slate-400 truncate max-w-[200px]">
                                            {video.subject} • {video.title}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Close button */}
                            <motion.button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-slate-800/50 transition-colors"
                                whileTap={{ scale: 0.9 }}
                            >
                                <HugeiconsIcon icon={ArrowDown01Icon} size={24} className="text-slate-400" />
                            </motion.button>
                        </div>

                        {/* Chat body */}
                        <div className="flex-1 bg-slate-950 overflow-y-auto px-4 py-4">
                            {messages.map(message => (
                                <MessageBubble key={message.id} message={message} />
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <motion.div
                                    className="flex justify-start mb-3"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <div className="bubble-ai px-4 py-3">
                                        <div className="flex items-center gap-1">
                                            <motion.span
                                                className="w-2 h-2 rounded-full bg-slate-500"
                                                animate={{ opacity: [0.3, 1, 0.3] }}
                                                transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                                            />
                                            <motion.span
                                                className="w-2 h-2 rounded-full bg-slate-500"
                                                animate={{ opacity: [0.3, 1, 0.3] }}
                                                transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                                            />
                                            <motion.span
                                                className="w-2 h-2 rounded-full bg-slate-500"
                                                animate={{ opacity: [0.3, 1, 0.3] }}
                                                transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input area */}
                        <div className="bg-slate-950 border-t border-slate-800/50">
                            <ChatInput
                                onSend={handleSendMessage}
                                disabled={isTyping}
                                placeholder="Tanya tentang materi ini..."
                            />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default MentorChat;
