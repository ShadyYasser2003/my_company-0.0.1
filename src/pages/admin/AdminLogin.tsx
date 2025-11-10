import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, Mail, LogIn, UserPlus, Home } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { GLOBAL_CONFIG } from '../../config/global';

export function AdminLogin() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await signIn(formData.email, formData.password);
        navigate('/admin/dashboard');
      } else {
        await signUp(formData.email, formData.password, formData.name);
        alert(GLOBAL_CONFIG.admin.login.signupSuccessMessage);
        setMode('login');
        setFormData({ ...formData, password: '' });
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-cyan-50 dark:from-slate-950 dark:to-slate-900 px-4">
      {/* Back to Home Link */}
      <Link
        to="/"
        className="fixed top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all"
      >
        <Home className="w-4 h-4" />
        <span>{GLOBAL_CONFIG.admin.login.backToHome}</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl text-slate-900 dark:text-white mb-2">
            {GLOBAL_CONFIG.admin.login.title} {mode === 'login' ? 'Login' : 'Sign Up'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {mode === 'login'
              ? GLOBAL_CONFIG.admin.login.loginSubtitle
              : GLOBAL_CONFIG.admin.login.signupSubtitle}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'signup' && (
              <div>
                <label className="block text-slate-900 dark:text-white mb-2">
                  {GLOBAL_CONFIG.admin.login.nameLabel}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder={GLOBAL_CONFIG.admin.login.namePlaceholder}
                />
              </div>
            )}

            <div>
              <label className="block text-slate-900 dark:text-white mb-2">
                {GLOBAL_CONFIG.admin.login.emailLabel}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder={GLOBAL_CONFIG.admin.login.emailPlaceholder}
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-900 dark:text-white mb-2">
                {GLOBAL_CONFIG.admin.login.passwordLabel}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder={GLOBAL_CONFIG.admin.login.passwordPlaceholder}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50"
            >
              {loading ? (
                GLOBAL_CONFIG.admin.login.processing
              ) : mode === 'login' ? (
                <>
                  <LogIn className="w-5 h-5" />
                  {GLOBAL_CONFIG.admin.login.loginButton}
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  {GLOBAL_CONFIG.admin.login.signupButton}
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setError('');
              }}
              className="text-cyan-500 hover:text-cyan-600 transition-colors"
            >
              {mode === 'login'
                ? GLOBAL_CONFIG.admin.login.switchToSignup
                : GLOBAL_CONFIG.admin.login.switchToLogin}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
