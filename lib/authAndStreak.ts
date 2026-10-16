export interface UserProfile {
  username: string;
  score: number;
  streak: number;
  lastActiveDate: string;
}

export function loginNestUser(username: string, pass: string): { success: boolean; message?: string; user?: UserProfile } {
  if (!username.toLowerCase().includes("nest")) {
    return { success: false, message: "Зөвхөн NEST сурагчдын эрхээр нэвтрэх боломжтой!" };
  }
  if (pass !== "nest123") {
    return { success: false, message: "Нууц үг буруу байна! (Үндсэн нууц үг: nest123)" };
  }

  const today = new Date().toISOString().split("T")[0];
  let users = getUsersLeaderboard();
  
  let existing = users.find(u => u.username === username);
  let user: UserProfile;

  if (existing) {
    user = existing;
    const lastDate = new Date(user.lastActiveDate);
    const currentDate = new Date(today);
    const diffDays = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

    if (diffDays === 1) {
      user.streak += 1;
      user.lastActiveDate = today;
    } else if (diffDays > 1) {
      user.streak = 1;
      user.lastActiveDate = today;
    }
  } else {
    user = { username, score: 50, streak: 1, lastActiveDate: today };
    users.push(user);
  }

  localStorage.setItem("jishig_current_user", JSON.stringify(user));
  saveLeaderboard(users);
  return { success: true, user };
}

export function getUsersLeaderboard(): UserProfile[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("jishig_leaderboard");
  if (!data) {
    const initial: UserProfile[] = [
      { username: "nest_bilguun", score: 420, streak: 7, lastActiveDate: "2026-10-16" },
      { username: "nest_saruul", score: 390, streak: 5, lastActiveDate: "2026-10-16" },
      { username: "nest_temuulen", score: 310, streak: 3, lastActiveDate: "2026-10-15" },
    ];
    localStorage.setItem("jishig_leaderboard", JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(data);
}

function saveLeaderboard(users: UserProfile[]) {
  localStorage.setItem("jishig_leaderboard", JSON.stringify(users));
}
