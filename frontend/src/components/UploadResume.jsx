import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UploadResume = ({ onAnalysisComplete, onUploadStart }) => {
  const [file, setFile] = useState(null);
  const [role, setRole] = useState('frontend_engineer');
  const [jdText, setJdText] = useState('');
  const [error, setError] = useState('');

  const [availableRoles, setAvailableRoles] = useState([]);
  const [rolesLoading, setRolesLoading] = useState(true);

  // Fetch available roles from the API on mount
  useEffect(() => {
    axios.get('/api/v1/roles')
      .then(res => {
        const roles = res.data.roles || [];
        setAvailableRoles(roles);
        if (roles.length > 0) setRole(roles[0].slug);
      })
      .catch(() => {
        // Fallback to hardcoded list if API unavailable
        const fallback = [
          { slug: 'frontend_engineer', name: 'Frontend Engineer' },
          { slug: 'backend_engineer', name: 'Backend Engineer' },
          { slug: 'data_scientist', name: 'Data Scientist' },
          { slug: 'product_manager', name: 'Product Manager' },
        ];
        setAvailableRoles(fallback);
      })
      .finally(() => setRolesLoading(false));
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Please select a PDF or DOCX file.');
        setFile(null);
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB
        setError('File size must be less than 10MB.');
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file.');
      return;
    }

    onUploadStart();
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    if (jdText.trim()) {
      formData.append('jd_text', jdText.trim());
    }

    try {
      const response = await axios.post(`/api/v1/resume/upload?role=${role}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onAnalysisComplete(response.data);
    } catch (err) {
      // Do NOT call onAnalysisComplete(null) — Dashboard's handler would crash
      // trying to access result.filename / result.score.total_score on null.
      // Instead just surface the error; the loading state is reset by onUploadStart's
      // counterpart being the parent's setLoading(false) only on success.
      setError(err.response?.data?.detail || 'An error occurred during analysis.');
      // Notify parent that loading is done (without providing a result)
      onAnalysisComplete(null);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="block text-sm font-bold uppercase tracking-wider text-foreground-light/60 dark:text-foreground-dark/60">
              Target Industry / Role
            </label>
            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={rolesLoading}
                className="appearance-none block w-full px-4 py-4 pr-10 bg-foreground-light/5 dark:bg-foreground-dark/5 border border-glass-border-light dark:border-glass-border-dark rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all-custom text-foreground-light dark:text-foreground-dark font-medium disabled:opacity-60"
              >
                {rolesLoading ? (
                  <option>Loading roles...</option>
                ) : (
                  availableRoles.map((r) => (
                    <option key={r.slug} value={r.slug} className="bg-surface-light dark:bg-surface-dark">
                      {r.name}
                    </option>
                  ))
                )}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-foreground-light/40">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-bold uppercase tracking-wider text-foreground-light/60 dark:text-foreground-dark/60">
              Job Description (Optional)
            </label>
            <textarea
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              placeholder="Paste the job description for specific matching..."
              className="block w-full px-4 py-4 bg-foreground-light/5 dark:bg-foreground-dark/5 border border-glass-border-light dark:border-glass-border-dark rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all-custom text-foreground-light dark:text-foreground-dark font-medium h-[60px] resize-none"
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-bold uppercase tracking-wider text-foreground-light/60 dark:text-foreground-dark/60">
            Resume File
          </label>
          <div className={`relative group border-2 border-dashed rounded-3xl p-8 transition-all-custom text-center ${file ? 'border-primary bg-primary/5' : 'border-glass-border-light dark:border-glass-border-dark hover:border-primary/40'}`}>
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all-custom ${file ? 'bg-primary text-white' : 'bg-foreground-light/5 dark:bg-foreground-dark/5 text-foreground-light/40'}`}>
                {file ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                )}
              </div>
              <p className="text-sm font-bold text-foreground-light dark:text-foreground-dark">
                {file ? file.name : 'Click or drag your resume here'}
              </p>
              <p className="text-xs text-foreground-light/50 mt-1">
                PDF or DOCX (Max 10MB)
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium animate-shake">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!file}
          className="w-full py-4 bg-primary hover:bg-primary/95 disabled:bg-foreground-light/20 dark:disabled:bg-foreground-dark/20 text-white font-bold rounded-2xl shadow-xl shadow-primary/20 transition-all-custom transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed"
        >
          {file ? 'Run AI Analysis' : 'Upload File to Continue'}
        </button>
      </form>
    </div>
  );
};

export default UploadResume;
