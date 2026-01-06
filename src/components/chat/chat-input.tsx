import { useState, type FormEvent, type KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUp01Icon } from '@hugeicons/core-free-icons';

interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
    placeholder?: string;
}

export function ChatInput({ onSend, disabled = false, placeholder = 'Tanya ke Mentor...' }: ChatInputProps) {
    const [input, setInput] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (input.trim() && !disabled) {
            onSend(input.trim());
            setInput('');
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as unknown as FormEvent);
        }
    };

    const canSend = input.trim().length > 0 && !disabled;

    return (
        <form onSubmit={handleSubmit} className="p-4 border-t border-slate-800/50">
            <div className="flex items-end gap-3">
                {/* Input field - pill-shaped */}
                <div className="flex-1 relative">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        disabled={disabled}
                        rows={1}
                        className="w-full px-5 py-3 bg-slate-800 text-slate-50 rounded-full resize-none 
                       placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                       disabled:opacity-50 disabled:cursor-not-allowed
                       text-sm leading-relaxed"
                        style={{
                            minHeight: '48px',
                            maxHeight: '120px',
                            overflowY: input.split('\n').length > 1 ? 'auto' : 'hidden'
                        }}
                    />
                </div>

                {/* Send button - Indigo circle with arrow */}
                <motion.button
                    type="submit"
                    disabled={!canSend}
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
                      transition-all duration-200
                      ${canSend
                            ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-600'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                    whileTap={canSend ? { scale: 0.9 } : {}}
                >
                    <HugeiconsIcon icon={ArrowUp01Icon} size={20} strokeWidth={2} />
                </motion.button>
            </div>

            {/* Hint for multiline */}
            <p className="text-[10px] text-slate-600 mt-2 text-center">
                Shift + Enter untuk baris baru
            </p>
        </form>
    );
}

export default ChatInput;
