"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginNestUser } from "@/lib/authAndStreak";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const res = loginNestUser(username, password);
    if (res.success && res.user) {
      router.push("/leaderboard");
    } else {
      setError(res.message || "Нэвтрэхэд алдаа гарлаа.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 p-6">
      <div className="relative z-10 w-full max-w-md bg-purple-900/40 backdrop-blur-2xl border border-purple-500/30 p-8 rounded-[2.5rem] shadow-2xl text-white">
        <div className="text-center mb-8">
          <span className="bg-purple-800/60 border border-purple-400/30 text-purple-200 text-xs px-3.5 py-1.5 rounded-full font-semibold tracking-wider">
            🏛️ Жишиг · Nest Portal
          </span>
          <h1 className="text-3xl font-black mt-4 tracking-wide text-purple-100">Тавтай морил</h1>
          <p className="text-purple-300 text-xs mt-1.5">Монгол бичгийн ухаалаг туслахад нэвтрэх</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 text-red-200 text-xs font-semibold rounded-2xl">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider mb-2">Нэвтрэх нэр</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="nest_..."
              required
              className="w-full px-5 py-3.5 bg-purple-950/60 border border-purple-500/30 rounded-2xl text-white placeholder-purple-400/50 focus:ring-2 focus:ring-purple-400 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider mb-2">Нууц үг</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-5 py-3.5 bg-purple-950/60 border border-purple-500/30 rounded-2xl text-white placeholder-purple-400/50 focus:ring-2 focus:ring-purple-400 outline-none transition"
            />
            <span className="text-[11px] text-purple-300/70 mt-2 block">💡 Нууц үг: <b className="text-yellow-300">nest123</b></span>
          </div>
          <button type="submit" className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold rounded-2xl shadow-lg shadow-purple-600/30 transition-all transform active:scale-[0.98]">
            Нэвтрэх 🚀
          </button>
        </form>
      </div>
    </div>
  );
}
