import React, { useState } from 'react';
import { Lock, KeyRound, Eye, EyeOff, X, ShieldAlert, Sparkles } from 'lucide-react';
import { useChurch } from '../../context/ChurchContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { loginAdmin } = useChurch();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = loginAdmin(password);
    if (success) {
      setPassword('');
      onSuccess();
    } else {
      setErrorMsg('密码错误，请重新输入（初始默认密码：grace2026）');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-stone-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-stone-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-white p-2 rounded-full hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Title */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-amber-600 to-stone-800 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-900/30 text-amber-100 border border-amber-500/30">
            <Lock className="w-7 h-7" />
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-cinzel uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            Church Administration Portal
          </div>
          <h3 className="text-2xl font-serif-sc font-bold text-white">
            教务可视化后台登录
          </h3>
          <p className="text-xs text-stone-400 mt-1">
            仅限本堂教牧、执事及受托管理员访问维护
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-rose-950/60 border border-rose-800/80 rounded-xl flex items-start gap-2 text-rose-300 text-xs animate-shake">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              请输入管理访问密码
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoFocus
                placeholder="请输入后台密码"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg('');
                }}
                className="w-full px-4 py-3 bg-stone-800/90 border border-stone-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 pr-11 font-mono tracking-wider"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-stone-400 hover:text-stone-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[11px] text-amber-300/90 flex items-center justify-between">
            <span>初始演示密码：<code className="font-mono font-bold text-amber-200 bg-stone-800 px-1.5 py-0.5 rounded">grace2026</code></span>
            <button
              type="button"
              onClick={() => setPassword('grace2026')}
              className="text-xs text-amber-400 underline hover:text-amber-200"
            >
              一键填入
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-sm font-medium transition-all shadow-md flex items-center justify-center gap-2 mt-2"
          >
            <KeyRound className="w-4 h-4" />
            <span>验证身份进入后台</span>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-stone-800 text-center text-[11px] text-stone-500">
          登录后可在线修改聚会时间、讲道影音、每日金句及查看新朋友预约
        </div>
      </div>
    </div>
  );
};
