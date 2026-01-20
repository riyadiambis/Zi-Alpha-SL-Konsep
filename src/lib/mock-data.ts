// Mock data for Zi-Alpha frontend
// All data is static/mock - no backend integration

export interface Video {
    id: string;
    title: string;
    creator: string;
    grade: string;
    subject: string;
    thumbnailUrl: string;
    videoUrl: string;
    likes: number;
    isLiked: boolean;
    duration: number; // seconds
}

export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    grade: string;
    streak: number;
    xp: number;
    level: number;
    badges: Badge[];
    joinedAt: Date;
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    earnedAt: Date;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface DownloadedVideo {
    id: string;
    video: Video;
    downloadedAt: Date;
    fileSize: string;
    progress: number; // 0-100
    status: 'downloading' | 'completed' | 'paused' | 'failed';
}

export interface Discussion {
    id: string;
    title: string;
    subject: string;
    author: string;
    replies: number;
    createdAt: Date;
    isHot: boolean;
}

// Mock Discussions for Diskusi Soal
export const mockDiscussions: Discussion[] = [
    {
        id: 'disc-1',
        title: 'Cara menghitung luas segitiga yang tidak beraturan?',
        subject: 'Matematika',
        author: 'Budi Santoso',
        replies: 24,
        createdAt: new Date('2024-02-17T10:30:00'),
        isHot: true,
    },
    {
        id: 'disc-2',
        title: 'Apa perbedaan sel hewan dan sel tumbuhan?',
        subject: 'IPA',
        author: 'Siti Rahayu',
        replies: 18,
        createdAt: new Date('2024-02-17T09:15:00'),
        isHot: true,
    },
    {
        id: 'disc-3',
        title: 'Bagaimana cara menggunakan present perfect tense?',
        subject: 'Bahasa Inggris',
        author: 'Andi Wijaya',
        replies: 12,
        createdAt: new Date('2024-02-17T08:00:00'),
        isHot: false,
    },
    {
        id: 'disc-4',
        title: 'Siapa tokoh-tokoh penting dalam Sumpah Pemuda?',
        subject: 'IPS',
        author: 'Maya Putri',
        replies: 8,
        createdAt: new Date('2024-02-16T14:20:00'),
        isHot: false,
    },
    {
        id: 'disc-5',
        title: 'Rumus kecepatan, jarak, dan waktu gimana ya?',
        subject: 'Fisika',
        author: 'Rizky Pratama',
        replies: 31,
        createdAt: new Date('2024-02-16T11:45:00'),
        isHot: true,
    },
    {
        id: 'disc-6',
        title: 'Apa itu reaksi kimia eksotermik dan endotermik?',
        subject: 'Kimia',
        author: 'Dewi Lestari',
        replies: 6,
        createdAt: new Date('2024-02-16T09:30:00'),
        isHot: false,
    },
];

// Mock Videos
export const mockVideos: Video[] = [
    {
        id: '1',
        title: 'Memahami Teorema Pythagoras',
        creator: 'Pak Ahmad',
        grade: 'Kelas 8',
        subject: 'Matematika',
        thumbnailUrl: '/api/placeholder/1080/1920',
        videoUrl: '',
        likes: 1234,
        isLiked: false,
        duration: 180,
    },
    {
        id: '2',
        title: 'Fotosintesis: Proses Kehidupan Tumbuhan',
        creator: 'Bu Sari',
        grade: 'Kelas 7',
        subject: 'IPA',
        thumbnailUrl: '/api/placeholder/1080/1920',
        videoUrl: '',
        likes: 892,
        isLiked: true,
        duration: 240,
    },
    {
        id: '3',
        title: 'Perang Diponegoro: Perlawanan Rakyat',
        creator: 'Pak Budi',
        grade: 'Kelas 8',
        subject: 'IPS',
        thumbnailUrl: '/api/placeholder/1080/1920',
        videoUrl: '',
        likes: 567,
        isLiked: false,
        duration: 300,
    },
    {
        id: '4',
        title: 'Present Continuous Tense Explained',
        creator: 'Ms. Linda',
        grade: 'Kelas 9',
        subject: 'Bahasa Inggris',
        thumbnailUrl: '/api/placeholder/1080/1920',
        videoUrl: '',
        likes: 2103,
        isLiked: false,
        duration: 210,
    },
    {
        id: '5',
        title: 'Struktur Atom dan Tabel Periodik',
        creator: 'Pak Dimas',
        grade: 'Kelas 9',
        subject: 'IPA',
        thumbnailUrl: '/api/placeholder/1080/1920',
        videoUrl: '',
        likes: 1567,
        isLiked: true,
        duration: 270,
    },
];

// Mock User Profile
export const mockUser: UserProfile = {
    id: 'user-1',
    name: 'Andi Pratama',
    email: 'andi@example.com',
    avatarUrl: '/api/placeholder/200/200',
    grade: 'Kelas 8',
    streak: 7,
    xp: 2450,
    level: 12,
    badges: [
        {
            id: 'b1',
            name: 'First Steps',
            description: 'Menyelesaikan video pertama',
            icon: 'rocket',
            earnedAt: new Date('2024-01-15'),
            rarity: 'common',
        },
        {
            id: 'b2',
            name: 'Streak Master',
            description: 'Belajar 7 hari berturut-turut',
            icon: 'flame',
            earnedAt: new Date('2024-01-22'),
            rarity: 'rare',
        },
        {
            id: 'b3',
            name: 'Quiz Champion',
            description: 'Menjawab 50 quiz dengan benar',
            icon: 'trophy',
            earnedAt: new Date('2024-02-01'),
            rarity: 'epic',
        },
        {
            id: 'b4',
            name: 'Math Wizard',
            description: 'Menguasai semua materi Matematika',
            icon: 'calculator',
            earnedAt: new Date('2024-02-10'),
            rarity: 'legendary',
        },
    ],
    joinedAt: new Date('2024-01-01'),
};

// Mock Downloaded Videos
export const mockDownloads: DownloadedVideo[] = [
    {
        id: 'd1',
        video: mockVideos[0],
        downloadedAt: new Date('2024-02-15'),
        fileSize: '45 MB',
        progress: 100,
        status: 'completed',
    },
    {
        id: 'd2',
        video: mockVideos[1],
        downloadedAt: new Date('2024-02-16'),
        fileSize: '52 MB',
        progress: 100,
        status: 'completed',
    },
    {
        id: 'd3',
        video: mockVideos[2],
        downloadedAt: new Date('2024-02-17'),
        fileSize: '38 MB',
        progress: 65,
        status: 'downloading',
    },
];

// Mock Chat Messages (Socratic AI Mentor)
export const mockChatMessages: Message[] = [
    {
        id: 'm1',
        role: 'assistant',
        content: 'Halo! Saya mentor AI kamu. Apa yang ingin kamu pelajari dari video ini?',
        timestamp: new Date(),
    },
];

// Mock Socratic Responses
export const socraticResponses = [
    'Pertanyaan bagus! Menurutmu, apa yang terjadi jika...',
    'Coba pikirkan lagi. Apa hubungannya dengan konsep yang kita pelajari tadi?',
    'Bagus! Sekarang, bisa kamu jelaskan dengan kata-katamu sendiri?',
    'Hmm, menarik! Tapi apakah kamu sudah mempertimbangkan...',
    'Benar sekali! Sekarang coba terapkan konsep ini pada contoh lain.',
    'Apa yang membuatmu berpikir demikian? Coba jelaskan alasanmu.',
    'Bagaimana jika kita lihat dari sudut pandang yang berbeda?',
    'Excellent! Kamu sudah memahami konsep dasarnya. Mari kita lanjut ke level berikutnya.',
];

// Helper function to get random Socratic response
export const getRandomSocraticResponse = (): string => {
    return socraticResponses[Math.floor(Math.random() * socraticResponses.length)];
};

// Helper to format duration
export const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Helper to format number with K/M suffix
export const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
};

// XP rewards for different actions
export const XP_REWARDS = {
    WATCH_VIDEO: 25,
    COMPLETE_QUIZ: 50,
    STREAK_BONUS: 10,
    FIRST_VIDEO_OF_DAY: 15,
    ASK_MENTOR: 5,
} as const;

// ========================================
// ZiAbot - AI Study Assistant Types & Mock Data
// ========================================

export interface Subject {
    id: string;
    name: string;
    icon: string;
}

export interface Grade {
    id: string;
    name: string;
}

export interface ZiAbotContext {
    type: 'topic' | 'video' | 'document';
    subject?: string;
    grade?: string;
    topic?: string;
    videoId?: string;
    videoTitle?: string;
    documentId?: string;
    documentName?: string;
}

export interface StudyNote {
    id: string;
    title: string;
    content: string[]; // Array of bullet points
    createdAt: Date;
    context: ZiAbotContext;
}

export interface PracticeQuestion {
    id: string;
    type: 'mcq' | 'short-answer';
    question: string;
    options?: string[]; // For MCQ
    correctAnswer: string;
    explanation: string;
    difficulty: 'easy' | 'medium' | 'hard';
}

export interface PracticeSet {
    id: string;
    title: string;
    questions: PracticeQuestion[];
    createdAt: Date;
    context: ZiAbotContext;
}

export interface Flashcard {
    id: string;
    front: string; // Term or question
    back: string;  // Definition or answer
}

export interface FlashcardDeck {
    id: string;
    title: string;
    cards: Flashcard[];
    createdAt: Date;
    context: ZiAbotContext;
}

export interface UploadedDocument {
    id: string;
    name: string;
    type: 'pdf' | 'image' | 'doc';
    uploadedAt: Date;
    status: 'uploading' | 'processing' | 'ready' | 'failed';
    progress: number;
}

// Mock Subjects
export const mockSubjects: Subject[] = [
    { id: 'math', name: 'Matematika', icon: '📐' },
    { id: 'science', name: 'IPA', icon: '🔬' },
    { id: 'social', name: 'IPS', icon: '🌍' },
    { id: 'english', name: 'Bahasa Inggris', icon: '🔤' },
    { id: 'indonesian', name: 'Bahasa Indonesia', icon: '📖' },
    { id: 'physics', name: 'Fisika', icon: '⚡' },
    { id: 'chemistry', name: 'Kimia', icon: '🧪' },
    { id: 'biology', name: 'Biologi', icon: '🧬' },
];

// Mock Grades
export const mockGrades: Grade[] = [
    { id: '7', name: 'Kelas 7' },
    { id: '8', name: 'Kelas 8' },
    { id: '9', name: 'Kelas 9' },
];

// ZiAbot Socratic Responses (extended)
export const ziabotResponses = {
    greeting: [
        'Halo! Saya ZiAbot, asisten belajar AI kamu. Apa yang ingin kamu pelajari hari ini?',
        'Hai! Siap membantu kamu belajar. Tentang apa yang ingin kamu tanyakan?',
        'Selamat datang! ZiAbot di sini untuk membantumu belajar step by step.',
    ],
    socratic: [
        'Pertanyaan bagus! Sebelum saya jelaskan, menurutmu apa yang terjadi jika...',
        'Coba pikirkan dulu: apa hubungannya dengan konsep yang kita bahas?',
        'Hmm, menarik! Tapi apakah kamu sudah mempertimbangkan aspek lain?',
        'Bagaimana jika kita lihat dari sudut pandang yang berbeda?',
        'Apa yang membuatmu berpikir demikian? Coba jelaskan alasanmu.',
        'Bagus! Sekarang coba terapkan konsep ini pada contoh nyata.',
    ],
    encouragement: [
        'Kamu sudah di jalur yang benar! Mari kita lanjutkan.',
        'Excellent! Pemahamanmu semakin baik.',
        'Pertanyaan cermat! Ini menunjukkan kamu berpikir kritis.',
    ],
    disclaimer: 'ZiAbot membantu kamu belajar step by step. Jawaban bukan untuk langsung disalin, tapi untuk dipahami.',
};

// Mock Notes Generator
export const generateMockNotes = (topic: string, context: ZiAbotContext): StudyNote => ({
    id: `note-${Date.now()}`,
    title: `Catatan: ${topic}`,
    content: [
        `📌 **Pengertian ${topic}**`,
        `${topic} adalah konsep fundamental yang perlu dipahami secara mendalam.`,
        '',
        `📌 **Poin-poin Penting**`,
        `• Poin pertama tentang ${topic} - konsep dasar yang harus dikuasai`,
        `• Poin kedua - aplikasi dalam kehidupan sehari-hari`,
        `• Poin ketiga - hubungan dengan konsep lain yang relevan`,
        `• Poin keempat - contoh soal dan penyelesaian`,
        '',
        `📌 **Rumus/Formula (jika ada)**`,
        `Formula dasar: [Rumus akan ditampilkan di sini]`,
        '',
        `📌 **Tips Mengingat**`,
        `• Gunakan akronim atau mnemonik untuk membantu mengingat`,
        `• Latih soal secara rutin untuk memperkuat pemahaman`,
        `• Hubungkan dengan pengalaman nyata`,
    ],
    createdAt: new Date(),
    context,
});

// Mock Practice Questions Generator
export const generateMockPracticeQuestions = (topic: string, context: ZiAbotContext): PracticeSet => ({
    id: `practice-${Date.now()}`,
    title: `Latihan Soal: ${topic}`,
    questions: [
        {
            id: 'q1',
            type: 'mcq',
            question: `Apa definisi yang paling tepat untuk ${topic}?`,
            options: [
                'Konsep A yang berhubungan dengan fenomena alam',
                'Konsep B yang digunakan dalam perhitungan',
                'Konsep C yang menjelaskan hubungan antar variabel',
                'Konsep D yang merupakan teori dasar'
            ],
            correctAnswer: 'C',
            explanation: `Jawaban yang tepat adalah C karena ${topic} memang menjelaskan hubungan antar variabel dalam konteks pembelajaran.`,
            difficulty: 'easy',
        },
        {
            id: 'q2',
            type: 'mcq',
            question: `Dalam konteks ${topic}, manakah pernyataan yang BENAR?`,
            options: [
                'Pernyataan pertama tentang karakteristik',
                'Pernyataan kedua tentang aplikasi',
                'Pernyataan ketiga tentang pengecualian',
                'Pernyataan keempat tentang hubungan'
            ],
            correctAnswer: 'B',
            explanation: 'Pernyataan kedua benar karena menjelaskan aplikasi konsep dengan tepat.',
            difficulty: 'medium',
        },
        {
            id: 'q3',
            type: 'short-answer',
            question: `Jelaskan dengan singkat bagaimana ${topic} dapat diterapkan dalam kehidupan sehari-hari!`,
            correctAnswer: 'Contoh penerapan dalam kehidupan...',
            explanation: 'Jawaban harus mencakup contoh konkret dan penjelasan mengapa relevan.',
            difficulty: 'medium',
        },
        {
            id: 'q4',
            type: 'mcq',
            question: `Jika diberikan kondisi X, bagaimana pengaruhnya terhadap ${topic}?`,
            options: [
                'Tidak ada pengaruh',
                'Pengaruh positif signifikan',
                'Pengaruh negatif kecil',
                'Tergantung faktor lain'
            ],
            correctAnswer: 'D',
            explanation: 'Dalam kasus ini, hasilnya memang tergantung pada faktor-faktor pendukung lainnya.',
            difficulty: 'hard',
        },
        {
            id: 'q5',
            type: 'mcq',
            question: `Manakah yang BUKAN merupakan ciri-ciri ${topic}?`,
            options: [
                'Ciri A yang umum ditemukan',
                'Ciri B yang merupakan karakteristik utama',
                'Ciri C yang tidak relevan sama sekali',
                'Ciri D yang mendukung konsep'
            ],
            correctAnswer: 'C',
            explanation: 'Ciri C tidak relevan dengan konsep yang dibahas.',
            difficulty: 'easy',
        },
    ],
    createdAt: new Date(),
    context,
});

// Mock Flashcards Generator
export const generateMockFlashcards = (topic: string, context: ZiAbotContext): FlashcardDeck => ({
    id: `deck-${Date.now()}`,
    title: `Flashcards: ${topic}`,
    cards: [
        {
            id: 'fc1',
            front: `Apa itu ${topic}?`,
            back: `${topic} adalah konsep yang menjelaskan hubungan fundamental dalam pembelajaran. Ini merupakan dasar untuk memahami materi lebih lanjut.`,
        },
        {
            id: 'fc2',
            front: `Sebutkan 3 karakteristik utama ${topic}!`,
            back: '1. Karakteristik pertama: memiliki pola yang terukur\n2. Karakteristik kedua: dapat diaplikasikan secara luas\n3. Karakteristik ketiga: berhubungan dengan konsep lain',
        },
        {
            id: 'fc3',
            front: `Bagaimana rumus/formula ${topic}?`,
            back: 'Formula: [Rumus ditampilkan di sini]\n\nKeterangan:\n- Variabel A = nilai pertama\n- Variabel B = nilai kedua\n- Hasil = output perhitungan',
        },
        {
            id: 'fc4',
            front: `Contoh penerapan ${topic} dalam kehidupan sehari-hari?`,
            back: 'Contoh 1: Dalam aktivitas sehari-hari seperti...\nContoh 2: Dalam bidang teknologi...\nContoh 3: Dalam ilmu pengetahuan...',
        },
        {
            id: 'fc5',
            front: `Apa perbedaan ${topic} dengan konsep serupa?`,
            back: 'Perbedaan utama:\n• Aspek A berbeda dalam hal...\n• Aspek B memiliki karakteristik yang...\n• Aspek C digunakan untuk tujuan yang berbeda',
        },
        {
            id: 'fc6',
            front: `Siapa penemu/pencetus ${topic}?`,
            back: 'Dikembangkan oleh [Nama Ilmuwan] pada [Tahun]. Teori ini kemudian disempurnakan oleh peneliti lain hingga menjadi seperti yang kita pelajari sekarang.',
        },
        {
            id: 'fc7',
            front: `Kesalahan umum dalam memahami ${topic}?`,
            back: '❌ Kesalahan 1: Menganggap konsep ini sederhana\n❌ Kesalahan 2: Tidak memperhatikan syarat penerapan\n❌ Kesalahan 3: Salah menggunakan rumus',
        },
        {
            id: 'fc8',
            front: `Tips mengingat ${topic}?`,
            back: '💡 Gunakan akronim: [Contoh akronim]\n💡 Visualisasikan dengan diagram\n💡 Hubungkan dengan pengalaman pribadi\n💡 Latihan soal secara rutin',
        },
    ],
    createdAt: new Date(),
    context,
});

// Helper to get random ZiAbot response
export const getRandomZiAbotResponse = (type: 'greeting' | 'socratic' | 'encouragement' = 'socratic'): string => {
    const responses = ziabotResponses[type];
    return responses[Math.floor(Math.random() * responses.length)];
};

// Video context responses
export const getVideoContextResponse = (videoTitle: string): string => {
    return `Berdasarkan video "${videoTitle}", saya akan membantu kamu memahami materinya. Apa yang ingin kamu tanyakan atau pelajari lebih lanjut?`;
};

// ========================================
// Explore Page - Topics Data
// ========================================

export interface Topic {
    id: string;
    name: string;
    subjectId: string;
    gradeId: string;
    videoCount: number;
    isPopular: boolean;
    progress?: number;
    isCompleted?: boolean;
}

export const mockTopics: Topic[] = [
    // Matematika - Kelas 8
    { id: 'math-8-1', name: 'Teorema Pythagoras', subjectId: 'math', gradeId: '8', videoCount: 12, isPopular: true, progress: 100, isCompleted: true },
    { id: 'math-8-2', name: 'Lingkaran', subjectId: 'math', gradeId: '8', videoCount: 8, isPopular: false, progress: 75, isCompleted: false },
    { id: 'math-8-3', name: 'Persamaan Linear', subjectId: 'math', gradeId: '8', videoCount: 15, isPopular: true, progress: 50, isCompleted: false },
    { id: 'math-8-4', name: 'Statistika Dasar', subjectId: 'math', gradeId: '8', videoCount: 6, isPopular: false, progress: 0, isCompleted: false },
    // IPA - Kelas 8
    { id: 'science-8-1', name: 'Sistem Pencernaan', subjectId: 'science', gradeId: '8', videoCount: 10, isPopular: true, progress: 100, isCompleted: true },
    { id: 'science-8-2', name: 'Tekanan Zat', subjectId: 'science', gradeId: '8', videoCount: 7, isPopular: false, progress: 30, isCompleted: false },
    { id: 'science-8-3', name: 'Cahaya dan Optik', subjectId: 'science', gradeId: '8', videoCount: 9, isPopular: false, progress: 0, isCompleted: false },
    // IPS - Kelas 8
    { id: 'social-8-1', name: 'Pergerakan Nasional', subjectId: 'social', gradeId: '8', videoCount: 5, isPopular: true, progress: 60, isCompleted: false },
    { id: 'social-8-2', name: 'Kegiatan Ekonomi', subjectId: 'social', gradeId: '8', videoCount: 8, isPopular: false, progress: 0, isCompleted: false },
    // English - Kelas 8
    { id: 'english-8-1', name: 'Present Tense', subjectId: 'english', gradeId: '8', videoCount: 6, isPopular: false, progress: 100, isCompleted: true },
    { id: 'english-8-2', name: 'Passive Voice', subjectId: 'english', gradeId: '8', videoCount: 4, isPopular: false, progress: 0, isCompleted: false },
    // Matematika - Kelas 7
    { id: 'math-7-1', name: 'Bilangan Bulat', subjectId: 'math', gradeId: '7', videoCount: 10, isPopular: true, progress: 100, isCompleted: true },
    { id: 'math-7-2', name: 'Himpunan', subjectId: 'math', gradeId: '7', videoCount: 8, isPopular: false, progress: 20, isCompleted: false },
    // IPA - Kelas 7
    { id: 'science-7-1', name: 'Klasifikasi Makhluk Hidup', subjectId: 'science', gradeId: '7', videoCount: 12, isPopular: true, progress: 100, isCompleted: true },
    { id: 'science-7-2', name: 'Zat dan Karakteristiknya', subjectId: 'science', gradeId: '7', videoCount: 7, isPopular: false, progress: 0, isCompleted: false },
    // Matematika - Kelas 9
    { id: 'math-9-1', name: 'Pangkat dan Akar', subjectId: 'math', gradeId: '9', videoCount: 11, isPopular: true, progress: 40, isCompleted: false },
    { id: 'math-9-2', name: 'Fungsi Kuadrat', subjectId: 'math', gradeId: '9', videoCount: 9, isPopular: false, progress: 0, isCompleted: false },
    // IPA - Kelas 9
    { id: 'science-9-1', name: 'Listrik Statis', subjectId: 'science', gradeId: '9', videoCount: 8, isPopular: true, progress: 25, isCompleted: false },
    { id: 'science-9-2', name: 'Sistem Reproduksi', subjectId: 'science', gradeId: '9', videoCount: 6, isPopular: false, progress: 0, isCompleted: false },
];

// ========================================
// Progress Page - Data
// ========================================

export interface SubjectProgress {
    subjectId: string;
    percentage: number;
    topicsCompleted: number;
    totalTopics: number;
    progress?: number;
    completedTopics?: number;
    lastWatchedVideo?: string;
}

export const mockSubjectProgress: SubjectProgress[] = [
    { subjectId: 'math', percentage: 72, topicsCompleted: 18, totalTopics: 25, progress: 72, completedTopics: 3, lastWatchedVideo: 'Menghitung Hipotenusa dengan Teorema Pythagoras' },
    { subjectId: 'science', percentage: 58, topicsCompleted: 14, totalTopics: 24, progress: 58, completedTopics: 2, lastWatchedVideo: 'Organ-organ Sistem Pencernaan' },
    { subjectId: 'social', percentage: 45, topicsCompleted: 9, totalTopics: 20, progress: 45, completedTopics: 0, lastWatchedVideo: 'Tokoh Pergerakan Nasional' },
    { subjectId: 'english', percentage: 33, topicsCompleted: 6, totalTopics: 18, progress: 33, completedTopics: 1, lastWatchedVideo: 'Simple Present Tense' },
    { subjectId: 'indonesian', percentage: 25, topicsCompleted: 5, totalTopics: 20, progress: 25, completedTopics: 0 },
];

export interface WeeklySummary {
    videosWatched: number;
    quizzesTaken: number;
    xpEarned: number;
    studyMinutes: number;
}

export const mockWeeklySummary: WeeklySummary = {
    videosWatched: 23,
    quizzesTaken: 8,
    xpEarned: 450,
    studyMinutes: 185,
};

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    unlocked: boolean;
    unlockedAt?: Date;
}

export const mockAchievements: Achievement[] = [
    { id: 'ach-1', name: 'First Steps', description: 'Tonton video pertama', icon: '🚀', unlocked: true, unlockedAt: new Date('2024-01-15') },
    { id: 'ach-2', name: 'Quiz Master', description: 'Selesaikan 10 quiz', icon: '🏆', unlocked: true, unlockedAt: new Date('2024-01-20') },
    { id: 'ach-3', name: 'Streak 7', description: '7 hari berturut-turut', icon: '🔥', unlocked: true, unlockedAt: new Date('2024-01-22') },
    { id: 'ach-4', name: 'Note Taker', description: 'Buat 5 catatan', icon: '📝', unlocked: true, unlockedAt: new Date('2024-02-01') },
    { id: 'ach-5', name: 'Math Wiz', description: 'Kuasai Matematika', icon: '🔢', unlocked: false },
    { id: 'ach-6', name: 'Science Pro', description: 'Kuasai IPA', icon: '🔬', unlocked: false },
    { id: 'ach-7', name: 'Streak 30', description: '30 hari berturut-turut', icon: '💎', unlocked: false },
    { id: 'ach-8', name: 'Perfect Score', description: 'Quiz 100%', icon: '💯', unlocked: false },
];

// ========================================
// Creator Mode - Data
// ========================================

export type CreatorContentStatus = 'draft' | 'review' | 'approved' | 'rejected';

export interface CreatorContent {
    id: string;
    title: string;
    subject: string;
    status: CreatorContentStatus;
    createdAt: Date;
    thumbnailUrl: string;
    duration: number;
}

export const mockCreatorContent: CreatorContent[] = [
    { id: 'cc-1', title: 'Pengenalan Aljabar', subject: 'Matematika', status: 'approved', createdAt: new Date('2024-02-10'), thumbnailUrl: '', duration: 180 },
    { id: 'cc-2', title: 'Hukum Newton', subject: 'Fisika', status: 'review', createdAt: new Date('2024-02-15'), thumbnailUrl: '', duration: 240 },
    { id: 'cc-3', title: 'Fotosintesis Lengkap', subject: 'Biologi', status: 'draft', createdAt: new Date('2024-02-17'), thumbnailUrl: '', duration: 0 },
];

export interface UserRole {
    isCreatorMode: boolean;
}

export const mockUserRole: UserRole = {
    isCreatorMode: false,
};

// ========================================
// Boss Battle System - Mock Data
// ========================================

export interface Boss {
    id: string;
    name: string;
    topic: string;
    subject: string;
    maxHP: number;
    baseDamage: number;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    isPractice?: boolean;
    avatarColor: string;
    avatarIcon: string;
}

export interface BattleQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number; // index of correct option
    difficulty: 'easy' | 'medium' | 'hard';
    hint?: string;
}

export interface BattleState {
    bossId: string;
    bossShieldHP: number;
    bossShieldMaxHP: number;
    bossCoreHP: number;
    bossCoreMaxHP: number;
    bossPhase: 1 | 2;
    isRageMode: boolean;
    playerHP: number;
    playerMaxHP: number;
    partnerHP: number;
    partnerMaxHP: number;
    comboCount: number;
    currentQuestionIndex: number;
    questionsAnswered: number;
    correctAnswers: number;
    isPracticeBoss: boolean;
    status: 'active' | 'victory' | 'defeat';
    battleLogs: string[];
}

export interface BattleResult {
    victory: boolean;
    xpEarned: number;
    questionsAnswered: number;
    correctAnswers: number;
    maxCombo: number;
    bossDefeated?: string;
}

// XP → Battle HP Mapping
// Battle HP is derived from Total XP, capped at 300
export const calculateBattleHP = (totalXP: number): number => {
    const baseHP = Math.floor(totalXP / 10);
    return Math.min(300, Math.max(50, baseHP)); // Min 50, Max 300
};

// Calculate damage dealt to boss
export const calculatePlayerDamage = (comboCount: number): number => {
    const baseDamage = 15;
    const comboBonus = comboCount * 5;
    return baseDamage + comboBonus;
};

// Calculate damage taken from boss (reduced by combo)
export const calculateBossDamage = (baseDamage: number, comboCount: number, isPractice: boolean): number => {
    const comboReduction = Math.min(comboCount * 3, 15); // Max 15 reduction
    const damage = Math.max(5, baseDamage - comboReduction); // Min 5 damage
    return isPractice ? Math.floor(damage * 0.5) : damage;
};

// Mock Bosses
export const mockBosses: Boss[] = [
    {
        id: 'boss-practice',
        name: 'Slime Belajar',
        topic: 'Latihan Dasar',
        subject: 'Matematika',
        maxHP: 600,
        baseDamage: 15,
        description: 'Boss latihan untuk pemula. Damage rendah, cocok untuk belajar mekanik battle.',
        difficulty: 'easy',
        isPractice: true,
        avatarColor: 'from-emerald-400 to-teal-500',
        avatarIcon: 'slime',
    },
    {
        id: 'boss-math-1',
        name: 'Titan Pythagoras',
        topic: 'Teorema Pythagoras',
        subject: 'Matematika',
        maxHP: 1700,
        baseDamage: 30,
        description: 'Kuasai teorema pythagoras untuk mengalahkan titan segitiga ini!',
        difficulty: 'medium',
        avatarColor: 'from-indigo-400 to-purple-600',
        avatarIcon: 'triangle',
    },
    {
        id: 'boss-science-1',
        name: 'Ratu Klorofil',
        topic: 'Fotosintesis',
        subject: 'IPA',
        maxHP: 1800,
        baseDamage: 28,
        description: 'Pahami proses fotosintesis untuk menaklukkan sang ratu hijau.',
        difficulty: 'medium',
        avatarColor: 'from-green-400 to-emerald-600',
        avatarIcon: 'leaf',
    },
    {
        id: 'boss-math-2',
        name: 'Golem Variabel',
        topic: 'Persamaan Linear',
        subject: 'Matematika',
        maxHP: 2000,
        baseDamage: 30,
        description: 'Selesaikan persamaan untuk menghancurkan golem batu ini!',
        difficulty: 'hard',
        avatarColor: 'from-slate-400 to-gray-600',
        avatarIcon: 'cube',
    },
    {
        id: 'boss-english-1',
        name: 'Wizard of Tenses',
        topic: 'Present Continuous',
        subject: 'Bahasa Inggris',
        maxHP: 1600,
        baseDamage: 30,
        description: 'Master the tenses to defeat the grammar wizard!',
        difficulty: 'medium',
        avatarColor: 'from-amber-400 to-orange-600',
        avatarIcon: 'book',
    },
];

// Mock Battle Questions by Boss
export const mockBattleQuestions: Record<string, BattleQuestion[]> = {
    'boss-practice': [
        {
            id: 'pq1',
            question: 'Berapa hasil dari 5 + 3?',
            options: ['6', '7', '8', '9'],
            correctAnswer: 2,
            difficulty: 'easy',
            hint: 'Hitung satu per satu dari 5.',
        },
        {
            id: 'pq2',
            question: 'Berapa hasil dari 10 - 4?',
            options: ['4', '5', '6', '7'],
            correctAnswer: 2,
            difficulty: 'easy',
            hint: 'Kurangi 4 dari 10.',
        },
        {
            id: 'pq3',
            question: 'Berapa hasil dari 3 × 4?',
            options: ['10', '11', '12', '13'],
            correctAnswer: 2,
            difficulty: 'easy',
            hint: '3 ditambah 3 ditambah 3 ditambah 3.',
        },
    ],
    'boss-math-1': [
        {
            id: 'pyth1',
            question: 'Pada segitiga siku-siku, sisi terpanjang disebut?',
            options: ['Alas', 'Tinggi', 'Hipotenusa', 'Diagonal'],
            correctAnswer: 2,
            difficulty: 'easy',
            hint: 'Sisi ini selalu berhadapan dengan sudut siku-siku.',
        },
        {
            id: 'pyth2',
            question: 'Jika a=3 dan b=4, berapa c pada teorema pythagoras (a² + b² = c²)?',
            options: ['4', '5', '6', '7'],
            correctAnswer: 1,
            difficulty: 'medium',
            hint: '9 + 16 = ?',
        },
        {
            id: 'pyth3',
            question: 'Teorema Pythagoras hanya berlaku untuk segitiga apa?',
            options: ['Sama sisi', 'Sama kaki', 'Siku-siku', 'Sembarang'],
            correctAnswer: 2,
            difficulty: 'easy',
            hint: 'Lihat nama teoremanya.',
        },
        {
            id: 'pyth4',
            question: 'Jika hipotenusa = 13 dan satu sisi = 5, berapa sisi lainnya?',
            options: ['8', '10', '12', '14'],
            correctAnswer: 2,
            difficulty: 'hard',
            hint: '169 - 25 = ?',
        },
        {
            id: 'pyth5',
            question: 'Triple Pythagoras manakah yang BENAR?',
            options: ['3, 4, 6', '5, 12, 13', '6, 8, 11', '7, 9, 12'],
            correctAnswer: 1,
            difficulty: 'medium',
            hint: 'Cek dengan rumus a² + b² = c².',
        },
    ],
    'boss-science-1': [
        {
            id: 'pyth1',
            question: 'Pada segitiga siku-siku, sisi terpanjang disebut?',
            options: ['Alas', 'Tinggi', 'Hipotenusa', 'Diagonal'],
            correctAnswer: 2,
            difficulty: 'easy',
            hint: 'Sisi ini selalu berhadapan dengan sudut siku-siku.',
        },
        {
            id: 'pyth2',
            question: 'Jika a=3 dan b=4, berapa c pada teorema pythagoras (a² + b² = c²)?',
            options: ['4', '5', '6', '7'],
            correctAnswer: 1,
            difficulty: 'medium',
            hint: '9 + 16 = ?',
        },
        {
            id: 'pyth3',
            question: 'Teorema Pythagoras hanya berlaku untuk segitiga apa?',
            options: ['Sama sisi', 'Sama kaki', 'Siku-siku', 'Sembarang'],
            correctAnswer: 2,
            difficulty: 'easy',
            hint: 'Lihat nama teoremanya.',
        },
        {
            id: 'pyth4',
            question: 'Jika hipotenusa = 13 dan satu sisi = 5, berapa sisi lainnya?',
            options: ['8', '10', '12', '14'],
            correctAnswer: 2,
            difficulty: 'hard',
            hint: '169 - 25 = ?',
        },
        {
            id: 'pyth5',
            question: 'Triple Pythagoras manakah yang BENAR?',
            options: ['3, 4, 6', '5, 12, 13', '6, 8, 11', '7, 9, 12'],
            correctAnswer: 1,
            difficulty: 'medium',
            hint: 'Cek dengan rumus a² + b² = c².',
        },
    ],
    'boss-fotosintesis': [
        {
            id: 'foto1',
            question: 'Apa yang dihasilkan dari proses fotosintesis?',
            options: ['Oksigen & Karbondioksida', 'Glukosa & Oksigen', 'Air & Glukosa', 'Karbondioksida & Air'],
            correctAnswer: 1,
            difficulty: 'easy',
            hint: 'Tumbuhan menghasilkan makanan dan gas yang kita hirup.',
        },
        {
            id: 'foto2',
            question: 'Di organel sel manakah fotosintesis terjadi?',
            options: ['Mitokondria', 'Kloroplas', 'Ribosom', 'Nukleus'],
            correctAnswer: 1,
            difficulty: 'easy',
            hint: 'Organel ini mengandung klorofil.',
        },
        {
            id: 'foto3',
            question: 'Apa fungsi klorofil dalam fotosintesis?',
            options: ['Menyerap air', 'Menyerap CO2', 'Menyerap cahaya', 'Menyimpan glukosa'],
            correctAnswer: 2,
            difficulty: 'medium',
            hint: 'Klorofil membuat daun berwarna hijau karena...',
        },
        {
            id: 'foto4',
            question: 'Bahan yang dibutuhkan untuk fotosintesis adalah?',
            options: ['O2 dan Glukosa', 'CO2 dan H2O', 'O2 dan H2O', 'CO2 dan Glukosa'],
            correctAnswer: 1,
            difficulty: 'medium',
            hint: 'Gas dan cairan yang diserap tumbuhan.',
        },
    ],
    'boss-math-2': [
        {
            id: 'pers1',
            question: 'Jika 2x + 4 = 10, berapa nilai x?',
            options: ['2', '3', '4', '5'],
            correctAnswer: 1,
            difficulty: 'easy',
            hint: 'Pindahkan 4 ke kanan, lalu bagi dengan 2.',
        },
        {
            id: 'pers2',
            question: 'Jika 3x - 6 = 9, berapa nilai x?',
            options: ['3', '4', '5', '6'],
            correctAnswer: 2,
            difficulty: 'medium',
            hint: 'Tambah 6 di kedua sisi.',
        },
        {
            id: 'pers3',
            question: 'Penyelesaian dari 4x + 2 = 2x + 8 adalah?',
            options: ['x = 2', 'x = 3', 'x = 4', 'x = 5'],
            correctAnswer: 1,
            difficulty: 'hard',
            hint: 'Pindahkan variabel ke satu sisi.',
        },
        {
            id: 'pers4',
            question: 'Jika x/2 + 3 = 7, berapa x?',
            options: ['6', '8', '10', '12'],
            correctAnswer: 1,
            difficulty: 'medium',
            hint: 'Kurangi 3, lalu kalikan 2.',
        },
    ],
    'boss-english-1': [
        {
            id: 'tens1',
            question: 'Which sentence uses Simple Present correctly?',
            options: ['She go to school', 'She goes to school', 'She going to school', 'She gone to school'],
            correctAnswer: 1,
            difficulty: 'easy',
            hint: 'Third person singular needs -s/-es.',
        },
        {
            id: 'tens2',
            question: 'Which is Past Tense of "eat"?',
            options: ['eated', 'ate', 'eaten', 'eating'],
            correctAnswer: 1,
            difficulty: 'easy',
            hint: 'This is an irregular verb.',
        },
        {
            id: 'tens3',
            question: '"I have been studying for 2 hours" is what tense?',
            options: ['Present Perfect', 'Past Perfect', 'Present Perfect Continuous', 'Past Continuous'],
            correctAnswer: 2,
            difficulty: 'hard',
            hint: 'Have been + V-ing shows duration.',
        },
        {
            id: 'tens4',
            question: 'Choose the correct Future Tense:',
            options: ['I will went', 'I will go', 'I will going', 'I will goes'],
            correctAnswer: 1,
            difficulty: 'medium',
            hint: 'Will + base form of verb.',
        },
    ],
};

// ZiAbot Battle Hints (mock responses)
export const ziabotBattleHints = [
    'Hmm, coba pikirkan kembali. Apa yang kamu ingat tentang konsep ini?',
    'Petunjuk: fokus pada kata kunci dalam pertanyaan.',
    'Ingat rumus dasarnya! Itu akan membantu.',
    'Coba eliminasi jawaban yang jelas salah dulu.',
    'Jangan terburu-buru, baca pertanyaan dengan teliti.',
    'Kamu bisa! Ingat apa yang sudah dipelajari sebelumnya.',
];

export const getRandomBattleHint = (): string => {
    return ziabotBattleHints[Math.floor(Math.random() * ziabotBattleHints.length)];
};

// XP Rewards for battle
export const BATTLE_XP_REWARDS = {
    VICTORY: 100,
    DEFEAT: 25, // Still get XP for trying
    PER_CORRECT_ANSWER: 10,
    COMBO_BONUS_PER_3: 15,
    PRACTICE_MULTIPLIER: 0.5,
} as const;

// Calculate battle XP reward
export const calculateBattleXP = (result: BattleResult, isPractice: boolean): number => {
    let xp = result.victory ? BATTLE_XP_REWARDS.VICTORY : BATTLE_XP_REWARDS.DEFEAT;
    xp += result.correctAnswers * BATTLE_XP_REWARDS.PER_CORRECT_ANSWER;
    xp += Math.floor(result.maxCombo / 3) * BATTLE_XP_REWARDS.COMBO_BONUS_PER_3;
    return isPractice ? Math.floor(xp * BATTLE_XP_REWARDS.PRACTICE_MULTIPLIER) : xp;
};

// Initial battle state factory
export const createInitialBattleState = (boss: Boss, playerXP: number, partnerXP: number): BattleState => {
    const playerBattleHP = calculateBattleHP(playerXP);
    const partnerBattleHP = calculateBattleHP(partnerXP);
    const shieldHP = Math.floor(boss.maxHP * 0.3);
    const coreHP = boss.maxHP - shieldHP;

    return {
        bossId: boss.id,
        bossShieldHP: shieldHP,
        bossShieldMaxHP: shieldHP,
        bossCoreHP: coreHP,
        bossCoreMaxHP: coreHP,
        bossPhase: 1,
        isRageMode: false,
        playerHP: playerBattleHP,
        playerMaxHP: playerBattleHP,
        partnerHP: partnerBattleHP,
        partnerMaxHP: partnerBattleHP,
        comboCount: 0,
        currentQuestionIndex: 0,
        questionsAnswered: 0,
        correctAnswers: 0,
        isPracticeBoss: boss.isPractice || false,
        status: 'active',
        battleLogs: ['Pertarungan dimulai!'],
    };
};
