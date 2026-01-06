// better-auth client placeholder
// This is a mock implementation for UI development
// Replace with actual better-auth integration for production

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    image?: string;
}

export interface AuthSession {
    user: AuthUser | null;
    isAuthenticated: boolean;
}

// Mock session for development
const mockSession: AuthSession = {
    user: {
        id: 'user-1',
        name: 'Andi Pratama',
        email: 'andi@example.com',
        image: undefined,
    },
    isAuthenticated: true,
};

// Mock auth client
export const authClient = {
    // Get current session
    getSession: async (): Promise<AuthSession> => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 100));
        return mockSession;
    },

    // Sign in (mock)
    signIn: async (email: string, password: string): Promise<AuthSession> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log('Mock sign in:', { email, password });
        return mockSession;
    },

    // Sign up (mock)
    signUp: async (data: { name: string; email: string; password: string }): Promise<AuthSession> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log('Mock sign up:', data);
        return mockSession;
    },

    // Sign out (mock)
    signOut: async (): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 200));
        console.log('Mock sign out');
    },

    // Social sign in (mock)
    signInWithGoogle: async (): Promise<AuthSession> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log('Mock Google sign in');
        return mockSession;
    },
};

export default authClient;
