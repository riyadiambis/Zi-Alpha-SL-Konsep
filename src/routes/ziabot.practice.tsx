import { createFileRoute } from '@tanstack/react-router';
import { PracticeViewer } from '../components/ziabot/practice-viewer';
import { generateMockPracticeQuestions } from '../lib/mock-data';
import type { PracticeSet } from '../lib/mock-data';

export const Route = createFileRoute('/ziabot/practice')({
    component: PracticePage,
});

function PracticePage() {
    // Get practice set from sessionStorage or use default
    const storedPractice = sessionStorage.getItem('ziabot-practice');
    const practiceSet: PracticeSet = storedPractice
        ? JSON.parse(storedPractice)
        : generateMockPracticeQuestions('Contoh Topik', {
            type: 'topic',
            subject: 'Matematika',
            grade: 'Kelas 8',
            topic: 'Contoh Topik',
        });

    const handleRegenerate = () => {
        const newPractice = generateMockPracticeQuestions(
            practiceSet.context.topic || practiceSet.context.videoTitle || 'Topik',
            practiceSet.context
        );
        sessionStorage.setItem('ziabot-practice', JSON.stringify(newPractice));
        window.location.reload();
    };

    const handleSave = () => {
        // Mock save
        alert('Latihan soal berhasil disimpan! (Mock)');
    };

    return (
        <PracticeViewer
            practiceSet={practiceSet}
            onRegenerate={handleRegenerate}
            onSave={handleSave}
        />
    );
}
