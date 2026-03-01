import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Requires login — redirects to /login if unauthenticated
export function ProtectedRoute({ children }) {
    const { currentUser, loading } = useAuth();
    if (loading) return null;
    if (!currentUser) return <Navigate to="/login" replace />;
    return children;
}

// Requires login AND role === 'hr'
// Students who try to access /hr are redirected to /dashboard
export function HRRoute({ children }) {
    const { currentUser, userRole, loading } = useAuth();
    if (loading) return null;
    if (!currentUser) return <Navigate to="/login" replace />;
    if (userRole !== 'hr') return <Navigate to="/dashboard" replace />;
    return children;
}
