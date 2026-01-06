import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { Mail01Icon, LockPasswordIcon, User02Icon } from '@hugeicons/core-free-icons';
import { useState } from 'react';

export const Route = createFileRoute('/auth/signup')({
    component: SignupPage,
});

function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [grade, setGrade] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock signup - no actual auth
        console.log('Mock signup:', { name, email, password, grade });
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6 py-8">
            {/* Logo */}
            <motion.div
                className="mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold text-white">Zi</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-50">Create account</h1>
                <p className="text-sm text-slate-400 mt-1">Start your learning journey</p>
            </motion.div>

            {/* Signup form */}
            <motion.form
                className="w-full max-w-sm space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onSubmit={handleSubmit}
            >
                {/* Name field */}
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <HugeiconsIcon icon={User02Icon} size={20} strokeWidth={1.5} />
                    </div>
                    <input
                        type="text"
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-slate-900 text-slate-50 rounded-xl border border-slate-800 
                       placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50
                       transition-all"
                    />
                </div>

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

                {/* Grade selector */}
                <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-4 py-4 bg-slate-900 text-slate-50 rounded-xl border border-slate-800 
                     focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50
                     transition-all appearance-none cursor-pointer"
                >
                    <option value="" disabled className="text-slate-500">Select your grade</option>
                    <option value="7">Kelas 7 SMP</option>
                    <option value="8">Kelas 8 SMP</option>
                    <option value="9">Kelas 9 SMP</option>
                </select>

                {/* Submit button */}
                <motion.button
                    type="submit"
                    className="w-full py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl 
                     transition-colors shadow-lg shadow-indigo-500/30"
                    whileTap={{ scale: 0.98 }}
                >
                    Create Account
                </motion.button>
            </motion.form>

            {/* Terms */}
            <p className="mt-6 text-[10px] text-slate-500 text-center max-w-xs">
                By signing up, you agree to our Terms of Service and Privacy Policy
            </p>

            {/* Login link */}
            <p className="mt-6 text-sm text-slate-400">
                Already have an account?{' '}
                <Link to="/auth/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                    Sign in
                </Link>
            </p>

            {/* Placeholder note */}
            <p className="mt-4 text-[10px] text-slate-600 text-center max-w-xs">
                This is a UI placeholder. Auth is not implemented. Use better-auth for production.
            </p>
        </div>
    );
}
