import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Maps Firebase error codes to friendly messages
function getAuthError(err) {
    const code = err?.code || '';
    const map = {
        'auth/email-already-in-use': 'This email is already registered. Please sign in instead.',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/user-not-found': 'No account found with this email. Please sign up.',
        'auth/wrong-password': 'Incorrect password. Please try again.',
        'auth/invalid-credential': 'Incorrect email or password. Please try again.',
        'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
        'auth/weak-password': 'Password must be at least 6 characters.',
        'auth/popup-closed-by-user': 'Google sign-in was cancelled.',
        'auth/network-request-failed': 'Network error. Please check your connection.',
    };
    return map[code] || err.message.replace('Firebase: ', '').replace(/\(auth\/[^)]+\)\.?/g, '').trim() || 'An error occurred. Please try again.';
}

export default function LoginPage() {
    const { login, loginWithGoogle, saveUserRole, checkUserRole } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Google sign-in might need role selection if it's a new Google account
    const [showRoleSelect, setShowRoleSelect] = useState(false);
    const [pendingUid, setPendingUid] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const result = await login(email, password);
            // Check if this user has a role set; if not, show role selection
            const { userRole: existingRole } = await checkUserRole(result.user.uid);
            if (!existingRole) {
                setPendingUid(result.user.uid);
                setShowRoleSelect(true);
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(getAuthError(err));
        } finally {
            setLoading(false);
        }
    }

    async function handleGoogle() {
        setError('');
        setLoading(true);
        try {
            const { user, needsRole } = await loginWithGoogle();
            if (needsRole) {
                setPendingUid(user.uid);
                setShowRoleSelect(true);
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(getAuthError(err));
        } finally {
            setLoading(false);
        }
    }

    async function handleRoleSelect(role) {
        await saveUserRole(pendingUid, role);
        navigate(role === 'hr' ? '/hr' : '/dashboard');
    }

    if (showRoleSelect) {
        return <RoleSelectScreen onSelect={handleRoleSelect} />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-lg shadow-primary/30 mb-4">
                        <span className="text-white font-bold text-2xl">AI</span>
                    </div>
                    <h1 className="text-3xl font-bold">Welcome back</h1>
                    <p className="text-foreground-light/50 dark:text-foreground-dark/50 mt-1">Sign in to Resume<span className="text-primary">Pro</span></p>
                </div>

                {/* Card */}
                <div className="bg-surface-light dark:bg-surface-dark border border-glass-border-light dark:border-glass-border-dark rounded-3xl p-8 shadow-xl">
                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-foreground-light/70 dark:text-foreground-dark/70">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 rounded-xl bg-foreground-light/5 dark:bg-foreground-dark/5 border border-glass-border-light dark:border-glass-border-dark focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-foreground-light/70 dark:text-foreground-dark/70">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-xl bg-foreground-light/5 dark:bg-foreground-dark/5 border border-glass-border-light dark:border-glass-border-dark focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px bg-foreground-light/10 dark:bg-foreground-dark/10" />
                        <span className="text-xs text-foreground-light/40 dark:text-foreground-dark/40">or</span>
                        <div className="flex-1 h-px bg-foreground-light/10 dark:bg-foreground-dark/10" />
                    </div>

                    <button
                        onClick={handleGoogle}
                        disabled={loading}
                        className="w-full py-3 flex items-center justify-center gap-3 border border-glass-border-light dark:border-glass-border-dark rounded-xl hover:bg-foreground-light/5 dark:hover:bg-foreground-dark/5 transition-all font-medium text-sm disabled:opacity-60"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>

                    <p className="text-center text-sm text-foreground-light/50 dark:text-foreground-dark/50 mt-6">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-primary font-semibold hover:underline">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

// Role selection card — reused in both Login (Google new user) and Signup
export function RoleSelectScreen({ onSelect }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark px-4">
            <div className="w-full max-w-md text-center">
                <h2 className="text-3xl font-bold mb-2">I am a...</h2>
                <p className="text-foreground-light/50 dark:text-foreground-dark/50 mb-8">Choose your role to personalise your experience</p>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => onSelect('student')}
                        className="group flex flex-col items-center gap-4 p-8 bg-surface-light dark:bg-surface-dark border-2 border-glass-border-light dark:border-glass-border-dark rounded-3xl hover:border-primary hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.03]"
                    >
                        <span className="text-5xl group-hover:scale-110 transition-transform duration-300">🎓</span>
                        <div>
                            <div className="font-bold text-lg">Student</div>
                            <div className="text-xs text-foreground-light/50 dark:text-foreground-dark/50 mt-1">Review my own resume</div>
                        </div>
                    </button>
                    <button
                        onClick={() => onSelect('hr')}
                        className="group flex flex-col items-center gap-4 p-8 bg-surface-light dark:bg-surface-dark border-2 border-glass-border-light dark:border-glass-border-dark rounded-3xl hover:border-secondary hover:shadow-xl hover:shadow-secondary/10 transition-all duration-300 hover:scale-[1.03]"
                    >
                        <span className="text-5xl group-hover:scale-110 transition-transform duration-300">💼</span>
                        <div>
                            <div className="font-bold text-lg">HR / Recruiter</div>
                            <div className="text-xs text-foreground-light/50 dark:text-foreground-dark/50 mt-1">Screen bulk applicants</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
