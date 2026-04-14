'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../../lib/api';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(true);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      api.verify()
        .then(() => router.replace('/admin/dashboard'))
        .catch(() => localStorage.removeItem('admin_token'))
        .finally(() => setChecking(false));
    } else {
      setChecking(false);
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.login(form.username, form.password);
      localStorage.setItem('admin_token', res.access_token);
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login gagal.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full bg-slate-50/50 border border-pink-200 rounded-xs px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 hover:border-pink-300 transition-all duration-300 shadow-sm';

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
        {/* Decorative blob for loading screen */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-30 animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, #f9c6d3, transparent)', filter: 'blur(50px)' }} />
        <div className="w-10 h-10 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin relative z-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-slate-50">
      
      {/* Background Decorative Elements (Matching Theme) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-xs opacity-30 animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, #f9c6d3, transparent)', filter: 'blur(70px)' }} />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-xs opacity-30 animate-pulse-slower"
          style={{ background: 'radial-gradient(circle, #e0bbff, transparent)', filter: 'blur(60px)' }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-xs opacity-20 animate-pulse"
          style={{ background: 'radial-gradient(circle, #fce7f3, transparent)', filter: 'blur(50px)', animationDelay: '1s' }} />
        
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(190,24,93,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(190,24,93,0.03)_1px,transparent_1px)] bg-[size:48px_48px]"></div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-xs bg-pink-100 flex items-center justify-center mx-auto mb-4 border border-pink-200 shadow-sm relative group">
            {/* Hover sparkle */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <svg className="w-8 h-8 text-pink-600 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3a3 3 0 110 6 3 3 0 010-6zm0 14.2a7.2 7.2 0 01-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 01-6 3.22z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-1">Admin Panel</h1>
          <p className="text-pink-500 font-medium text-sm">Portfolio Management Dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-xs shadow-xl border-2 border-pink-100 p-8 relative overflow-hidden group/card">
          
          {/* Left accent bar */}
          <div className="absolute -left-0.5 top-8 bottom-8 w-1 bg-gradient-to-b from-pink-500 to-purple-400 rounded-r-full opacity-70 group-hover/card:opacity-100 transition-opacity"></div>
          
          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-pink-50 opacity-50 transform rotate-45 translate-x-1/2 -translate-y-1/2 group-hover/card:bg-purple-50 transition-colors"></div>
          </div>

          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 relative z-10">
            Masuk ke Dashboard
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xs px-4 py-3 mb-5 text-sm shadow-sm flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5 relative z-10">
            <div>
              <label className="text-[11px] font-bold text-pink-600 uppercase tracking-widest block mb-2">
                Username
              </label>
              <input
                type="text"
                required
                autoComplete="username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className={inputClass}
                placeholder="admin"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-pink-600 uppercase tracking-widest block mb-2">
                Password
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className={inputClass}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xs text-white font-bold transition-all duration-300 shadow-md flex justify-center items-center gap-2
                ${loading 
                  ? 'bg-slate-400 cursor-not-allowed opacity-70' 
                  : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 hover:shadow-lg hover:-translate-y-0.5'
                }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memuat...
                </>
              ) : 'Masuk'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}