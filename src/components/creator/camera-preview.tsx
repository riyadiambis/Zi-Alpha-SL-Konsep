import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    Video01Icon,
    VideoOffIcon
} from '@hugeicons/core-free-icons';

interface CameraPreviewProps {
    isOn: boolean;
    onToggle: () => void;
}

export function CameraPreview({ isOn, onToggle }: CameraPreviewProps) {
    return (
        <div className="relative w-full h-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-700">
            {isOn ? (
                // Mock camera feed (placeholder)
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white mx-auto mb-4">
                            T
                        </div>
                        <p className="text-sm text-slate-400">Camera Preview</p>
                        <p className="text-xs text-slate-500 mt-1">(Mock - no real camera)</p>
                    </div>

                    {/* Recording indicator */}
                    <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs text-slate-300">Live</span>
                    </div>
                </div>
            ) : (
                // Camera off state
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900">
                    <HugeiconsIcon icon={VideoOffIcon} size={48} className="text-slate-600 mb-4" />
                    <p className="text-sm text-slate-500">Camera is off</p>
                </div>
            )}

            {/* Camera toggle button */}
            <motion.button
                onClick={onToggle}
                className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${isOn
                        ? 'bg-red-500/20 border-red-500/50 text-red-400'
                        : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                    }`}
                whileTap={{ scale: 0.95 }}
            >
                <HugeiconsIcon icon={isOn ? VideoOffIcon : Video01Icon} size={16} />
                <span className="text-xs font-medium">{isOn ? 'Turn Off' : 'Turn On'}</span>
            </motion.button>
        </div>
    );
}
