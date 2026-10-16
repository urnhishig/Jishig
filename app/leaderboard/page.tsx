"use client";

import { useEffect, useState } from "react";
import { getUsersLeaderboard, UserProfile } from "@/lib/authAndStreak";
import NestLogin from "@/components/NestLogin";

export default function LeaderboardPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [leaderboard, setLeaderboard] = useState<UserProfile[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("jishig_current_user");
    if (saved) setCurrentUser(JSON.parse(saved));
    const users = getUsersLeaderboard();
    setLeaderboard(users.sort((a, b) => b.score - a.score));
  }, []);

  if (!isMounted) return null;

  if (!currentUser) {
    return <NestLogin onLogin={(user) => setCurrentUser(user)} />;
  }

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Royal Banner */}
      <div className="relative overflow-hidden bg-gradient-to-tr from-purple-950 via-purple-900 to-indigo-950 text-white p-7 rounded-[2.5rem] shadow-2xl border border-purple-500/30 flex justify-between items-center">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10">
          <span className="bg-purple-800/60 border border-purple-400/30 text-purple-200 text-xs px-3.5 py-1 rounded-full font-semibold tracking-wider">
            🏛️ Nest · Монгол Бичиг
          </span>
          <h2 className="text-2xl font-black mt-3 tracking-wide text-purple-100">@{currentUser.username}</h2>
          <p className="text-purple-300 text-xs mt-1">
            Эрдэм оюуны оноо: <span className="font-bold text-yellow-400">{currentUser.score} pts</span>
          </p>
        </div>

        <div className="relative z-10 bg-purple-900/60 backdrop-blur-md px-5 py-3 rounded-2xl text-center border border-purple-400/30 shadow-inner">
          <div className="text-2xl animate-pulse">🔥</div>
          <div className="text-xl font-black text-yellow-300">{currentUser.streak}</div>
          <div className="text-[9px] uppercase tracking-widest text-purple-300 font-bold">Streak</div>
        </div>
      </div>

      {/* Leaderboard Card */}
      <div className="card-royal p-6 space-y-5 bg-purple-950/5 backdrop-blur-xl border border-purple-500/20 rounded-[2rem] shadow-xl">
        <div className="flex items-center justify-between border-b border-purple-100 pb-4">
          <h3 className="text-lg font-black text-purple-950 flex items-center gap-2">
            📜 Урианхай / Шилдэг Сурагчид
          </h3>
          <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-extrabold">
            Тэргүүлэгчид
          </span>
        </div>

        <div className="space-y-3">
          {leaderboard.map((user, index) => {
            const isMe = user.username === currentUser.username;
            return (
              <div
                key={user.username}
                className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 border ${
                  isMe 
                    ? "border-purple-500 bg-purple-100/70 shadow-md scale-[1.02]" 
                    : "border-purple-100/60 bg-white/80 hover:bg-white"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className={`w-9 h-9 flex items-center justify-center font-black rounded-xl text-sm shadow-sm ${
                      index === 0
                        ? "bg-gradient-to-tr from-yellow-500 to-amber-300 text-white shadow-yellow-200"
                        : index === 1
                        ? "bg-gradient-to-tr from-purple-300 to-purple-200 text-purple-900"
                        : index === 2
                        ? "bg-gradient-to-tr from-amber-700 to-amber-600 text-white"
                        : "bg-purple-50 text-purple-600 font-bold"
                    }`}
                  >
                    {index === 0 ? "👑" : index + 1}
                  </span>
                  <div>
                    <span className={`font-bold ${isMe ? "text-purple-900 font-black" : "text-gray-800"}`}>
                      @{user.username}
                    </span>
                    {isMe && (
                      <span className="ml-2 text-[10px] bg-purple-700 text-white px-2 py-0.5 rounded-md font-bold">
                        Та
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                    🔥 {user.streak}
                  </span>
                  <span className="font-black text-purple-900 text-base">
                    {user.score} <span className="text-xs font-normal text-purple-400">pts</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Logout button */}
      <div className="text-center pt-2">
        <button
          onClick={() => {
            localStorage.removeItem("jishig_current_user");
            setCurrentUser(null);
          }}
          className="text-xs font-semibold text-purple-400 hover:text-red-500 transition px-4 py-2 rounded-xl hover:bg-purple-50"
        >
          Системээс гарах (Log out)
        </button>
      </div>
    </div>
  );
}
