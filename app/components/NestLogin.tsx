"use client";
import { useState } from "react";
import { loginNestUser, UserProfile } from "@/lib/authAndStreak";

export default function NestLogin({ onLogin }: { onLogin: (user: UserProfile) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = loginNestUser(username, password);
    if (res.success && res.user) {
      onLogin(res.user);
    } else {
      setError(res.message || "Нэвтрэхэд алдаа гарлаа.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">🏫 Nest Сурагчдын Нэвтрэх</h2>
        <p className="text-sm text-gray-500 mt-1">Зөвхөн Nest ахлах сургуулийн сурагчдад зориулсан систем</p>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>}

      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Нэвтрэх нэр (Жишээ: nest_username)</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="nest_..."
            required
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Нууц үг</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <span className="text-xs text-gray-400 mt-1 block">Анхаарах: Нууц үг нь <b>nest123</b> байна.</span>
        </div>
        <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition">
          Нэвтрэх
        </button>
      </form>
    </div>
  );
}
