import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { Mail01Icon, LockPasswordIcon } from '@hugeicons/core-free-icons';
import { useState } from 'react';

export const Route = createFileRoute('/auth/login')({
    component: LoginPage,
});

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login - no actual auth
        console.log('Mock login:', { email, password });
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6">
            {/* Logo */}
            <motion.div
                className="mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold text-white">Zi</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-50">Welcome back</h1>
                <p className="text-sm text-slate-400 mt-1">Sign in to continue learning</p>
            </motion.div>

            {/* Login form */}
            <motion.form
                className="w-full max-w-sm space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onSubmit={handleSubmit}
            >
                {/* Email field */}
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <HugeiconsIcon icon={Mail01Icon} size={20} strokeWidth={1.5} />
                    </div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-slate-900 text-slate-50 rounded-xl border border-slate-800 
                       placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50
                       transition-all"
                    />
                </div>

                {/* Password field */}
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <HugeiconsIcon icon={LockPasswordIcon} size={20} strokeWidth={1.5} />
                    </div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-slate-900 text-slate-50 rounded-xl border border-slate-800 
                       placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50
                       transition-all"
                    />
                </div>

                {/* Forgot password */}
                <div className="text-right">
                    <button type="button" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                        Forgot password?
                    </button>
                </div>

                {/* Submit button */}
                <motion.button
                    type="submit"
                    className="w-full py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl 
                     transition-colors shadow-lg shadow-indigo-500/30"
                    whileTap={{ scale: 0.98 }}
                >
                    Sign In
                </motion.button>
            </motion.form>

            {/* Divider */}
            <div className="flex items-center gap-4 w-full max-w-sm my-6">
                <div className="flex-1 h-px bg-slate-800" />
                <span className="text-xs text-slate-500">or</span>
                <div className="flex-1 h-px bg-slate-800" />
            </div>

            {/* Social login (placeholder) */}
            <motion.button
                className="w-full max-w-sm py-4 bg-slate-900 hover:bg-slate-800/80 text-slate-50 font-medium rounded-xl 
                   border border-slate-800 transition-colors flex items-center justify-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                whileTap={{ scale: 0.98 }}
            >
                <span className="text-lg">🔗</span>
                Continue with Google
            </motion.button>

            {/* Sign up link */}
            <p className="mt-8 text-sm text-slate-400">
                Don't have an account?{' '}
                <Link to="/auth/signup" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                    Sign up
                </Link>
            </p>

            {/* Placeholder note */}
            <p className="mt-4 text-[10px] text-slate-600 text-center max-w-xs">
                This is a UI placeholder. Auth is not implemented. Use better-auth for production.
            </p>
        </div>
    );
}
