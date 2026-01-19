import { createFileRoute } from '@tanstack/react-router';
import { NotesViewer } from '../components/ziabot/notes-viewer';
import { generateMockNotes } from '../lib/mock-data';
import type { StudyNote } from '../lib/mock-data';

export const Route = createFileRoute('/ziabot/notes')({
    component: NotesPage,
});

function NotesPage() {
    // Get notes from sessionStorage or use default
    const storedNotes = sessionStorage.getItem('ziabot-notes');
    const notes: StudyNote = storedNotes
        ? JSON.parse(storedNotes)
        : generateMockNotes('Contoh Topik', {
            type: 'topic',
            subject: 'Matematika',
            grade: 'Kelas 8',
            topic: 'Contoh Topik',
        });

    const handleRegenerate = () => {
        const newNotes = generateMockNotes(
            notes.context.topic || notes.context.videoTitle || 'Topik',
            notes.context
        );
        sessionStorage.setItem('ziabot-notes', JSON.stringify(newNotes));
        window.location.reload();
    };

    const handleSave = () => {
        // Mock save - in real app would save to backend
        alert('Catatan berhasil disimpan! (Mock)');
    };

    return (
        <NotesViewer
            notes={notes}
            onRegenerate={handleRegenerate}
            onSave={handleSave}
        />
    );
}
