import { motion } from 'framer-motion';
import type { Message } from '../../lib/mock-data';

interface MessageBubbleProps {
    message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
    const isAI = message.role === 'assistant';

    return (
        <motion.div
            className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-3`}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
        >
            <div
                className={`max-w-[80%] px-4 py-3 ${isAI ? 'bubble-ai' : 'bubble-user'
                    }`}
            >
                {/* AI indicator */}
                {isAI && (
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-indigo-400">Zi Mentor</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    </div>
                )}

                {/* Message content */}
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                </p>

                {/* Timestamp */}
                <div className={`text-[10px] mt-2 ${isAI ? 'text-slate-500' : 'text-indigo-200'}`}>
                    {message.timestamp.toLocaleTimeString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </div>
            </div>
        </motion.div>
    );
}

export default MessageBubble;
