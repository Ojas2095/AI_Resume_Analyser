import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const TIER_CONFIG = {
    tier1: { label: '🟢 Top Candidates', color: 'green', bg: 'bg-green-500/10', border: 'border-green-500/30', badge: 'bg-green-500/20 text-green-400' },
    tier2: { label: '🟡 Good Candidates', color: 'yellow', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', badge: 'bg-yellow-500/20 text-yellow-400' },
    tier3: { label: '🟠 Borderline', color: 'orange', bg: 'bg-orange-500/10', border: 'border-orange-500/30', badge: 'bg-orange-500/20 text-orange-400' },
    rejected: { label: '🔴 Not Qualified', color: 'red', bg: 'bg-red-500/10', border: 'border-red-500/30', badge: 'bg-red-500/20 text-red-400' },
};

function CandidateCard({ candidate, tierKey }) {
    const cfg = TIER_CONFIG[tierKey];
    return (
        <div className={`p-4 rounded-2xl border ${cfg.bg} ${cfg.border} space-y-2`}>
            <div className="flex items-start justify-between gap-2">
                <div>
                    <div className="font-bold text-sm">{candidate.name}</div>
                    <div className="text-xs text-foreground-light/40 dark:text-foreground-dark/40 truncate max-w-[180px]">{candidate.filename}</div>
                </div>
                <span className={`shrink-0 text-xs font-bold px-2 py-1 rounded-full ${cfg.badge}`}>
                    {candidate.score}%
                </span>
            </div>
            {candidate.matched_skills?.length > 0 && (
                <div className="flex flex-wrap gap-1">
                    {candidate.matched_skills.slice(0, 5).map(s => (
                        <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">{s}</span>
                    ))}
                    {candidate.matched_skills.length > 5 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-foreground-light/5 dark:bg-foreground-dark/5 text-foreground-light/40 dark:text-foreground-dark/40">
                            +{candidate.matched_skills.length - 5} more
                        </span>
                    )}
                </div>
            )}
            {candidate.missing_skills?.length > 0 && (
                <div className="text-[10px] text-foreground-light/40 dark:text-foreground-dark/40">
                    Missing: {candidate.missing_skills.slice(0, 3).join(', ')}{candidate.missing_skills.length > 3 ? '...' : ''}
                </div>
            )}
            {candidate.error && (
                <div className="text-[10px] text-red-400">⚠ {candidate.error}</div>
            )}
        </div>
    );
}

function TierPanel({ tierKey, candidates }) {
    const cfg = TIER_CONFIG[tierKey];
    if (!candidates?.length) return null;
    return (
        <div className="space-y-3">
            <div className={`flex items-center justify-between px-4 py-2 rounded-xl border ${cfg.border} ${cfg.bg}`}>
                <span className="font-bold text-sm">{cfg.label}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cfg.badge}`}>{candidates.length}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {candidates.map((c, i) => (
                    <CandidateCard key={`${tierKey}-${i}`} candidate={c} tierKey={tierKey} />
                ))}
            </div>
        </div>
    );
}

export default function HRDashboard() {
    const { logout, currentUser } = useAuth();
    const [files, setFiles] = useState([]);
    const [role, setRole] = useState('backend_engineer');
    const [jdText, setJdText] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('tier1');
    const [availableRoles, setAvailableRoles] = useState([]);
    const [dragOver, setDragOver] = useState(false);

    // Load roles on mount
    React.useEffect(() => {
        axios.get('/api/v1/roles').then(res => {
            setAvailableRoles(res.data.roles || []);
            if (res.data.roles?.length) setRole(res.data.roles[0].slug);
        }).catch(() => { });
    }, []);

    const onDrop = useCallback((e) => {
        e.preventDefault();
        setDragOver(false);
        const dropped = Array.from(e.dataTransfer.files).filter(f =>
            f.type === 'application/pdf' ||
            f.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        );
        setFiles(prev => [...prev, ...dropped]);
    }, []);

    const onFileInput = (e) => {
        setFiles(prev => [...prev, ...Array.from(e.target.files)]);
    };

    const removeFile = (idx) => setFiles(prev => prev.filter((_, i) => i !== idx));

    async function handleScreen() {
        if (!files.length) return setError('Please upload at least one resume.');
        setError('');
        setLoading(true);
        setResults(null);
        try {
            const formData = new FormData();
            files.forEach(f => formData.append('files', f));
            formData.append('role', role);
            if (jdText.trim()) formData.append('jd_text', jdText.trim());

            const res = await axios.post('/api/v1/hr/bulk-screen', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setResults(res.data);
            // Auto-select first non-empty tier
            const first = ['tier1', 'tier2', 'tier3', 'rejected'].find(t => res.data[t]?.length > 0);
            if (first) setActiveTab(first);
        } catch (err) {
            setError(err.response?.data?.detail || 'Screening failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    function exportCSV() {
        if (!results) return;
        const all = [...(results.tier1 || []), ...(results.tier2 || []), ...(results.tier3 || []), ...(results.rejected || [])];
        const headers = ['Name', 'File', 'Score', 'Tier', 'Matched Skills', 'Missing Skills'];
        const rows = all.map(c => [
            c.name, c.filename, c.score, c.label,
            (c.matched_skills || []).join('; '),
            (c.missing_skills || []).join('; '),
        ]);
        const csv = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = `screening_${role}.csv`; a.click();
        URL.revokeObjectURL(url);
    }

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark pt-28 pb-16 px-4">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">HR Screening <span className="text-primary">Dashboard</span></h1>
                        <p className="text-foreground-light/50 dark:text-foreground-dark/50 mt-1">
                            Bulk upload resumes — we rank and group candidates for you
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-foreground-light/40 dark:text-foreground-dark/40 hidden sm:block">{currentUser?.email}</span>
                        <button onClick={logout} className="text-xs px-3 py-2 rounded-xl border border-glass-border-light dark:border-glass-border-dark hover:bg-foreground-light/5 dark:hover:bg-foreground-dark/5 transition-all">
                            Logout
                        </button>
                    </div>
                </div>

                {/* Upload & Config Panel */}
                <div className="bg-surface-light dark:bg-surface-dark border border-glass-border-light dark:border-glass-border-dark rounded-3xl p-6 space-y-6">
                    {/* Drag & Drop Zone */}
                    <div
                        onDrop={onDrop}
                        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer ${dragOver
                            ? 'border-primary bg-primary/5 scale-[1.01]'
                            : 'border-glass-border-light dark:border-glass-border-dark hover:border-primary/50 hover:bg-foreground-light/2'
                            }`}
                        onClick={() => document.getElementById('hr-file-input').click()}
                    >
                        <input id="hr-file-input" type="file" multiple accept=".pdf,.docx" className="hidden" onChange={onFileInput} />
                        <div className="text-4xl mb-3">📄</div>
                        <div className="font-bold text-lg">{files.length > 0 ? `${files.length} file(s) selected` : 'Drop resumes here'}</div>
                        <div className="text-sm text-foreground-light/40 dark:text-foreground-dark/40 mt-1">PDF or DOCX · Click or drag & drop · Up to 200 files</div>
                    </div>

                    {/* File list */}
                    {files.length > 0 && (
                        <div className="max-h-40 overflow-y-auto space-y-1.5">
                            {files.map((f, i) => (
                                <div key={i} className="flex items-center justify-between px-3 py-2 bg-foreground-light/5 dark:bg-foreground-dark/5 rounded-xl text-sm">
                                    <span className="truncate max-w-[80%]">{f.name}</span>
                                    <button onClick={() => removeFile(i)} className="text-red-400 hover:text-red-300 ml-2 text-xs shrink-0">✕</button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Role + JD */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-foreground-light/50 dark:text-foreground-dark/50 mb-2">Target Role</label>
                            <select value={role} onChange={e => setRole(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-foreground-light/5 dark:bg-foreground-dark/5 border border-glass-border-light dark:border-glass-border-dark focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium">
                                {availableRoles.map(r => <option key={r.slug} value={r.slug}>{r.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-foreground-light/50 dark:text-foreground-dark/50 mb-2">Job Description (optional)</label>
                            <textarea value={jdText} onChange={e => setJdText(e.target.value)} rows={2} placeholder="Paste JD for better matching..."
                                className="w-full px-4 py-3 rounded-xl bg-foreground-light/5 dark:bg-foreground-dark/5 border border-glass-border-light dark:border-glass-border-dark focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none" />
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{error}</div>
                    )}

                    <button
                        onClick={handleScreen}
                        disabled={loading || !files.length}
                        className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20 text-lg"
                    >
                        {loading ? '⏳ Screening resumes...' : `🚀 Screen ${files.length || ''} Resume${files.length !== 1 ? 's' : ''}`}
                    </button>
                </div>

                {/* Results */}
                {results && (
                    <div className="space-y-6">
                        {/* Summary bar */}
                        <div className="grid grid-cols-4 gap-3">
                            {[
                                { key: 'tier1', label: 'Top', count: results.summary.tier1 },
                                { key: 'tier2', label: 'Good', count: results.summary.tier2 },
                                { key: 'tier3', label: 'Borderline', count: results.summary.tier3 },
                                { key: 'rejected', label: 'Rejected', count: results.summary.rejected },
                            ].map(({ key, label, count }) => (
                                <button key={key} onClick={() => setActiveTab(key)}
                                    className={`p-4 rounded-2xl border text-center transition-all ${activeTab === key
                                        ? `${TIER_CONFIG[key].bg} ${TIER_CONFIG[key].border} scale-[1.03]`
                                        : 'bg-surface-light dark:bg-surface-dark border-glass-border-light dark:border-glass-border-dark hover:scale-[1.01]'
                                        }`}>
                                    <div className="text-2xl font-bold">{count}</div>
                                    <div className="text-xs text-foreground-light/50 dark:text-foreground-dark/50 mt-0.5">{label}</div>
                                </button>
                            ))}
                        </div>

                        {/* Export */}
                        <div className="flex justify-end">
                            <button onClick={exportCSV}
                                className="flex items-center gap-2 px-4 py-2 border border-glass-border-light dark:border-glass-border-dark rounded-xl text-sm font-medium hover:bg-foreground-light/5 dark:hover:bg-foreground-dark/5 transition-all">
                                ⬇ Export CSV
                            </button>
                        </div>

                        {/* Active tier */}
                        <TierPanel tierKey={activeTab} candidates={results[activeTab]} />
                    </div>
                )}
            </div>
        </div>
    );
}
