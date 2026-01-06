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
