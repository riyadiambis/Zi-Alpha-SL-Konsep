import { useState } from 'react';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import {
    PencilIcon,
    Eraser01Icon,
    Undo02Icon,
    Redo02Icon,
    ZoomIcon,
    Search01Icon,
    Move01Icon
} from '@hugeicons/core-free-icons';

interface Tool {
    id: string;
    icon: typeof PencilIcon;
    label: string;
}

const tools: Tool[] = [
    { id: 'pen', icon: PencilIcon, label: 'Pen' },
    { id: 'eraser', icon: Eraser01Icon, label: 'Eraser' },
    { id: 'pan', icon: Move01Icon, label: 'Pan' },
];

const colors = [
    { id: 'white', value: '#FFFFFF' },
    { id: 'indigo', value: '#6366F1' },
    { id: 'emerald', value: '#10B981' },
    { id: 'amber', value: '#F59E0B' },
    { id: 'red', value: '#EF4444' },
];

interface ExplainCanvasProps {
    slideBackground?: string | null;
}

export function ExplainCanvas({ slideBackground }: ExplainCanvasProps) {
    const [activeTool, setActiveTool] = useState('pen');
    const [activeColor, setActiveColor] = useState('#FFFFFF');
    const [zoom, setZoom] = useState(100);
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);

    // Mock function to simulate drawing action
    const simulateAction = () => {
        setCanUndo(true);
        setCanRedo(false);
    };

    const handleUndo = () => {
        if (canUndo) {
            setCanRedo(true);
        }
    };

    const handleRedo = () => {
        // Mock redo
    };

    const handleZoomIn = () => {
        setZoom(prev => Math.min(prev + 20, 200));
    };

    const handleZoomOut = () => {
        setZoom(prev => Math.max(prev - 20, 50));
    };

    return (
        <div className="relative w-full h-full flex flex-col bg-slate-900 rounded-2xl overflow-hidden border border-slate-700">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-700 bg-slate-800/50">
                {/* Drawing tools */}
                <div className="flex items-center gap-1">
                    {tools.map(tool => (
                        <motion.button
                            key={tool.id}
                            onClick={() => setActiveTool(tool.id)}
                            className={`p-2 rounded-lg transition-colors ${activeTool === tool.id
                                ? 'bg-indigo-500/30 text-indigo-400'
                                : 'text-slate-400 hover:bg-slate-700'
                                }`}
                            whileTap={{ scale: 0.95 }}
                            title={tool.label}
                        >
                            <HugeiconsIcon icon={tool.icon} size={18} />
                        </motion.button>
                    ))}

                    <div className="w-px h-6 bg-slate-700 mx-2" />

                    {/* Color palette */}
                    <div className="flex items-center gap-1">
                        {colors.map(color => (
                            <motion.button
                                key={color.id}
                                onClick={() => setActiveColor(color.value)}
                                className={`w-6 h-6 rounded-full border-2 transition-all ${activeColor === color.value
                                    ? 'border-indigo-400 scale-110'
                                    : 'border-slate-600'
                                    }`}
                                style={{ backgroundColor: color.value }}
                                whileTap={{ scale: 0.9 }}
                            />
                        ))}
                    </div>
                </div>

                {/* Undo/Redo and Zoom */}
                <div className="flex items-center gap-1">
                    <motion.button
                        onClick={handleUndo}
                        disabled={!canUndo}
                        className={`p-2 rounded-lg transition-colors ${canUndo ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-600'
                            }`}
                        whileTap={{ scale: 0.95 }}
                    >
                        <HugeiconsIcon icon={Undo02Icon} size={18} />
                    </motion.button>
                    <motion.button
                        onClick={handleRedo}
                        disabled={!canRedo}
                        className={`p-2 rounded-lg transition-colors ${canRedo ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-600'
                            }`}
                        whileTap={{ scale: 0.95 }}
                    >
                        <HugeiconsIcon icon={Redo02Icon} size={18} />
                    </motion.button>

                    <div className="w-px h-6 bg-slate-700 mx-2" />

                    <motion.button
                        onClick={handleZoomOut}
                        className="p-2 rounded-lg text-slate-400 hover:bg-slate-700"
                        whileTap={{ scale: 0.95 }}
                    >
                        <HugeiconsIcon icon={Search01Icon} size={18} />
                    </motion.button>
                    <span className="text-xs text-slate-400 w-12 text-center">{zoom}%</span>
                    <motion.button
                        onClick={handleZoomIn}
                        className="p-2 rounded-lg text-slate-400 hover:bg-slate-700"
                        whileTap={{ scale: 0.95 }}
                    >
                        <HugeiconsIcon icon={ZoomIcon} size={18} />
                    </motion.button>
                </div>
            </div>

            {/* Canvas area */}
            <div
                className="flex-1 relative overflow-hidden bg-slate-950"
                onClick={simulateAction}
            >
                {/* Fixed 1000x1000 canvas (scaled for display) */}
                <motion.div
                    className="absolute bg-slate-900 border border-slate-700 rounded-lg cursor-crosshair"
                    style={{
                        width: 1000 * (zoom / 100),
                        height: 1000 * (zoom / 100),
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    {/* Canvas grid lines (visual guide) */}
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `
                                linear-gradient(to right, #94A3B8 1px, transparent 1px),
                                linear-gradient(to bottom, #94A3B8 1px, transparent 1px)
                            `,
                            backgroundSize: `${50 * (zoom / 100)}px ${50 * (zoom / 100)}px`,
                        }}
                    />

                    {/* Canvas size indicator */}
                    <div className="absolute bottom-2 right-2 text-[10px] text-slate-600">
                        1000 × 1000 px
                    </div>

                    {/* Sample drawing content (mock) */}
                    <div className="absolute top-1/4 left-1/4 text-slate-500 text-sm opacity-50">
                        {slideBackground ? (
                            <div className="text-center">
                                <div className="text-2xl mb-2">📄</div>
                                <p>Slide Background Active</p>
                                <p className="text-xs mt-1">(Drawing layer above)</p>
                            </div>
                        ) : (
                            'Tap to draw...'
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
