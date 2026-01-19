import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    CloudUploadIcon,
    File01Icon,
    Loading03Icon,
    Cancel01Icon,
    InformationCircleIcon
} from '@hugeicons/core-free-icons';

interface DocumentUploadProps {
    className?: string;
}

export function DocumentUpload({ className = '' }: DocumentUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'processing'>('idle');
    const [fileName, setFileName] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            simulateUpload(file.name);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            simulateUpload(file.name);
        }
    };

    const simulateUpload = (name: string) => {
        setFileName(name);
        setUploadState('uploading');
        setProgress(0);

        // Simulate upload progress
        const uploadInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(uploadInterval);
                    setUploadState('processing');
                    // Simulate processing (stays in processing - Phase 2 placeholder)
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    const handleCancel = () => {
        setUploadState('idle');
        setFileName(null);
        setProgress(0);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className={`bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden ${className}`}>
            {/* Header */}
            <div className="px-4 py-3 border-b border-slate-800/50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-slate-800">
                            <HugeiconsIcon icon={File01Icon} size={16} className="text-slate-400" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-50">Upload Dokumen</p>
                            <p className="text-[10px] text-slate-500">Phase 2 — Coming Soon</p>
                        </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-medium">
                        BETA
                    </span>
                </div>
            </div>

            {/* Upload area */}
            <div className="p-4">
                {uploadState === 'idle' ? (
                    <motion.div
                        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${isDragging
                                ? 'border-indigo-500 bg-indigo-500/5'
                                : 'border-slate-700 hover:border-slate-600'
                            }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                        <HugeiconsIcon
                            icon={CloudUploadIcon}
                            size={32}
                            className={isDragging ? 'text-indigo-400' : 'text-slate-500'}
                        />
                        <p className="mt-2 text-sm text-slate-400">
                            Drag & drop atau <span className="text-indigo-400">browse</span>
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                            PDF, DOC, atau Gambar (max 10MB)
                        </p>
                    </motion.div>
                ) : (
                    <div className="space-y-3">
                        {/* File info */}
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50">
                            <div className="p-2 rounded-lg bg-indigo-500/20">
                                <HugeiconsIcon icon={File01Icon} size={20} className="text-indigo-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-50 truncate">
                                    {fileName}
                                </p>
                                <p className="text-xs text-slate-400">
                                    {uploadState === 'uploading'
                                        ? `Uploading... ${progress}%`
                                        : 'Memproses dokumen...'}
                                </p>
                            </div>
                            <motion.button
                                onClick={handleCancel}
                                className="p-1.5 rounded-lg hover:bg-slate-700"
                                whileTap={{ scale: 0.9 }}
                            >
                                <HugeiconsIcon icon={Cancel01Icon} size={16} className="text-slate-400" />
                            </motion.button>
                        </div>

                        {/* Progress bar */}
                        <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <motion.div
                                className={`h-full ${uploadState === 'processing'
                                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
                                        : 'bg-indigo-500'
                                    }`}
                                initial={{ width: 0 }}
                                animate={{
                                    width: `${progress}%`,
                                    ...(uploadState === 'processing' && {
                                        backgroundPosition: ['0% 0%', '100% 0%'],
                                    }),
                                }}
                                transition={
                                    uploadState === 'processing'
                                        ? { backgroundPosition: { repeat: Infinity, duration: 1 } }
                                        : {}
                                }
                            />
                        </div>

                        {/* Processing state notice */}
                        {uploadState === 'processing' && (
                            <motion.div
                                className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <HugeiconsIcon icon={Loading03Icon} size={16} className="text-amber-400 animate-spin mt-0.5" />
                                <div>
                                    <p className="text-xs font-medium text-amber-300">
                                        Fitur Document Mode Segera Hadir
                                    </p>
                                    <p className="text-[10px] text-amber-400/70 mt-0.5">
                                        Saat ini dokumen tidak diproses. Fitur ini dalam pengembangan.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </div>
                )}

                {/* Info notice */}
                <div className="flex items-start gap-2 mt-3 p-2 rounded-lg bg-slate-800/30">
                    <HugeiconsIcon icon={InformationCircleIcon} size={14} className="text-slate-500 mt-0.5" />
                    <p className="text-[10px] text-slate-500 leading-relaxed">
                        Document Mode akan memungkinkan ZiAbot menganalisis dokumen dan menjawab pertanyaan berdasarkan konten dokumen.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default DocumentUpload;
