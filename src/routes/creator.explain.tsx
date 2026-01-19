import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowLeft02Icon,
  RecordIcon,
  StopIcon,
  RotateClockwiseIcon,
  ViewIcon,
  ViewOffSlashIcon,
  PauseIcon,
  PlayIcon,
  File01Icon,
  CheckmarkCircle02Icon
} from '@hugeicons/core-free-icons';
import { CameraPreview } from '../components/creator/camera-preview';
import { ExplainCanvas } from '../components/creator/explain-canvas';

export const Route = createFileRoute('/creator/explain')({
  component: ExplainModePage,
});

// Recording states per spec Section H
type RecordingState = 'idle' | 'recording' | 'paused' | 'saved';

function ExplainModePage() {
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [recordingTime, setRecordingTime] = useState(0);
  const [cameraOn, setCameraOn] = useState(true);
  const [focusMode, setFocusMode] = useState<'split' | 'camera' | 'canvas'>('split');
  const [slideFile, setSlideFile] = useState<string | null>(null);

  const startRecording = () => {
    setRecordingState('recording');
    // Mock recording timer
    const interval = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    (window as any).__recordingInterval = interval;
  };

  const pauseRecording = () => {
    setRecordingState('paused');
    clearInterval((window as any).__recordingInterval);
  };

  const resumeRecording = () => {
    setRecordingState('recording');
    const interval = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    (window as any).__recordingInterval = interval;
  };

  const stopRecording = () => {
    setRecordingState('idle');
    clearInterval((window as any).__recordingInterval);
    setRecordingTime(0);
  };

  const saveAsDraft = () => {
    setRecordingState('saved');
    clearInterval((window as any).__recordingInterval);
    // Mock save - in real app, would upload/store locally
    setTimeout(() => {
      setRecordingState('idle');
      setRecordingTime(0);
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setRecordingState('idle');
    setRecordingTime(0);
    clearInterval((window as any).__recordingInterval);
  };

  // Mock slide upload handler (Phase 2 UI placeholder)
  const handleSlideUpload = () => {
    // Mock file selection - in real app, would open file picker
    setSlideFile('presentation.pptx');
  };

  const clearSlide = () => {
    setSlideFile(null);
  };

  return (
    <div className="h-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-3">
          <Link to="/profile">
            <motion.button
              className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <HugeiconsIcon icon={ArrowLeft02Icon} size={20} className="text-slate-50" />
            </motion.button>
          </Link>
          <div>
            <h1 className="text-sm font-semibold text-slate-50">Explain Mode</h1>
            <p className="text-xs text-slate-500">
              {recordingState === 'idle' && 'Camera + Canvas'}
              {recordingState === 'recording' && 'Recording...'}
              {recordingState === 'paused' && 'Paused'}
              {recordingState === 'saved' && 'Saving...'}
            </p>
          </div>
        </div>

        {/* Recording indicator */}
        <AnimatePresence>
          {(recordingState === 'recording' || recordingState === 'paused') && (
            <motion.div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${recordingState === 'recording'
                  ? 'bg-red-500/20 border-red-500/50'
                  : 'bg-amber-500/20 border-amber-500/50'
                }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className={`w-2 h-2 rounded-full ${recordingState === 'recording' ? 'bg-red-500 animate-pulse' : 'bg-amber-500'
                }`} />
              <span className={`text-xs font-mono ${recordingState === 'recording' ? 'text-red-400' : 'text-amber-400'
                }`}>
                {formatTime(recordingTime)}
              </span>
            </motion.div>
          )}
          {recordingState === 'saved' && (
            <motion.div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/50"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <HugeiconsIcon icon={CheckmarkCircle02Icon} size={14} className="text-emerald-400" />
              <span className="text-xs text-emerald-400">Saving Draft...</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Focus mode toggle */}
        <div className="flex items-center gap-2">
          <motion.button
            onClick={() => setFocusMode(focusMode === 'canvas' ? 'split' : 'canvas')}
            className={`p-2 rounded-lg transition-colors ${focusMode === 'canvas' ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:bg-slate-800'
              }`}
            whileTap={{ scale: 0.95 }}
            title="Focus on Canvas"
          >
            <HugeiconsIcon icon={focusMode === 'canvas' ? ViewOffSlashIcon : ViewIcon} size={18} />
          </motion.button>
        </div>
      </header>

      {/* Slide Upload Section (Phase 2 UI Placeholder) */}
      <div className="px-4 py-2 border-b border-slate-800 bg-slate-900/30">
        {slideFile ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={File01Icon} size={16} className="text-indigo-400" />
              <span className="text-xs text-slate-300">{slideFile}</span>
              <span className="text-[10px] text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">Slide 1/5</span>
            </div>
            <motion.button
              onClick={clearSlide}
              className="text-xs text-slate-500 hover:text-slate-400"
              whileTap={{ scale: 0.95 }}
            >
              Remove
            </motion.button>
          </div>
        ) : (
          <motion.button
            onClick={handleSlideUpload}
            className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-slate-700 rounded-lg text-xs text-slate-500 hover:border-indigo-500/50 hover:text-indigo-400 transition-colors"
            whileTap={{ scale: 0.98 }}
          >
            <HugeiconsIcon icon={File01Icon} size={14} />
            Upload PPT/PDF (Phase 2)
          </motion.button>
        )}
      </div>

      {/* Split View Content */}
      <div className="flex-1 flex flex-col md:flex-row gap-2 p-2 overflow-hidden">
        {/* Camera Section */}
        {focusMode !== 'canvas' && (
          <motion.div
            className={`${focusMode === 'split'
                ? 'h-[30%] md:h-full md:w-[35%]'
                : 'flex-1'
              }`}
            layout
          >
            <CameraPreview isOn={cameraOn} onToggle={() => setCameraOn(!cameraOn)} />
          </motion.div>
        )}

        {/* Canvas Section */}
        {focusMode !== 'camera' && (
          <motion.div
            className={`${focusMode === 'split'
                ? 'flex-1'
                : 'flex-1'
              }`}
            layout
          >
            <ExplainCanvas slideBackground={slideFile} />
          </motion.div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-center gap-4 px-4 py-4 border-t border-slate-800 bg-slate-900/50">
        {/* Reset / Save Draft button */}
        {recordingState === 'idle' ? (
          <motion.button
            onClick={handleReset}
            className="p-3 rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 transition-colors"
            whileTap={{ scale: 0.95 }}
            disabled={recordingTime === 0}
          >
            <HugeiconsIcon icon={RotateClockwiseIcon} size={20} />
          </motion.button>
        ) : (
          <motion.button
            onClick={saveAsDraft}
            className="px-4 py-2 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors text-xs font-medium"
            whileTap={{ scale: 0.95 }}
            disabled={recordingState === 'saved'}
          >
            Save Draft
          </motion.button>
        )}

        {/* Main Record/Pause/Stop button */}
        {recordingState === 'idle' && (
          <motion.button
            onClick={startRecording}
            className="p-5 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition-all"
            whileTap={{ scale: 0.9 }}
          >
            <HugeiconsIcon icon={RecordIcon} size={28} />
          </motion.button>
        )}

        {recordingState === 'recording' && (
          <div className="flex items-center gap-3">
            <motion.button
              onClick={pauseRecording}
              className="p-4 rounded-full bg-amber-500 text-white hover:bg-amber-600 transition-all"
              whileTap={{ scale: 0.9 }}
            >
              <HugeiconsIcon icon={PauseIcon} size={24} />
            </motion.button>
            <motion.button
              onClick={stopRecording}
              className="p-5 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all"
              whileTap={{ scale: 0.9 }}
            >
              <HugeiconsIcon icon={StopIcon} size={28} />
            </motion.button>
          </div>
        )}

        {recordingState === 'paused' && (
          <div className="flex items-center gap-3">
            <motion.button
              onClick={resumeRecording}
              className="p-4 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition-all"
              whileTap={{ scale: 0.9 }}
            >
              <HugeiconsIcon icon={PlayIcon} size={24} />
            </motion.button>
            <motion.button
              onClick={stopRecording}
              className="p-5 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all"
              whileTap={{ scale: 0.9 }}
            >
              <HugeiconsIcon icon={StopIcon} size={28} />
            </motion.button>
          </div>
        )}

        {recordingState === 'saved' && (
          <motion.div
            className="p-5 rounded-full bg-emerald-500/50 text-white"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <HugeiconsIcon icon={CheckmarkCircle02Icon} size={28} />
          </motion.div>
        )}

        {/* Placeholder for symmetry */}
        <div className="w-12" />
      </div>

      {/* Info banner */}
      <div className="px-4 py-2 bg-indigo-500/10 border-t border-indigo-500/20">
        <p className="text-xs text-indigo-300 text-center">
          Canvas: 1000 × 1000 px (fixed) • Zoom affects viewport only • Recording captures full canvas
        </p>
      </div>
    </div>
  );
}
