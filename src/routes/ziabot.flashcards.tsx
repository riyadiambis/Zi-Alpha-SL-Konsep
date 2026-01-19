import { createFileRoute } from '@tanstack/react-router';
import { FlashcardViewer } from '../components/ziabot/flashcard-viewer';
import { generateMockFlashcards } from '../lib/mock-data';
import type { FlashcardDeck } from '../lib/mock-data';

export const Route = createFileRoute('/ziabot/flashcards')({
    component: FlashcardsPage,
});

function FlashcardsPage() {
    // Get flashcard deck from sessionStorage or use default
    const storedFlashcards = sessionStorage.getItem('ziabot-flashcards');
    const deck: FlashcardDeck = storedFlashcards
        ? JSON.parse(storedFlashcards)
        : generateMockFlashcards('Contoh Topik', {
            type: 'topic',
            subject: 'Matematika',
            grade: 'Kelas 8',
            topic: 'Contoh Topik',
        });

    const handleRegenerate = () => {
        const newDeck = generateMockFlashcards(
            deck.context.topic || deck.context.videoTitle || 'Topik',
            deck.context
        );
        sessionStorage.setItem('ziabot-flashcards', JSON.stringify(newDeck));
        window.location.reload();
    };

    const handleSave = () => {
        // Mock save
        alert('Flashcards berhasil disimpan! (Mock)');
    };

    return (
        <FlashcardViewer
            deck={deck}
            onRegenerate={handleRegenerate}
            onSave={handleSave}
        />
    );
}
