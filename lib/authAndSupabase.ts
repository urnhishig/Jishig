import { supabase } from './supabaseClient';

export interface UserProfile {
  username: string;
  score: number;
  streak: number;
  lastActiveDate: string;
}

export async function loginNestUser(username: string, pass: string): Promise<{ success: boolean; message?: string; user?: UserProfile }> {
  if (!username.toLowerCase().includes("nest")) {
    return { success: false, message: "Зөвхөн NEST сурагчдын эрхээр нэвтрэх боломжтой!" };
  }
  if (pass !== "nest123") {
    return { success: false, message: "Нууц үг буруу байна! (Үндсэн нууц үг: nest123)" };
  }

  const today = new Date().toISOString().split("T")[0];

  const { data: existingUser } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();

  let user: UserProfile;

  if (existingUser) {
    const lastDate = new Date(existingUser.last_active_date);
    const currentDate = new Date(today);
    const diffDays = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

    let newStreak = existingUser.streak;
    if (diffDays === 1) {
      newStreak += 1;
    } else if (diffDays > 1) {
      newStreak = 1;
    }

    const { data: updated } = await supabase
      .from('users')
      .update({ streak: newStreak, last_active_date: today })
      .eq('username', username)
      .select()
      .single();

    user = { 
      username: updated?.username || username, 
      score: updated?.score || 50, 
      streak: updated?.streak || 1, 
      lastActiveDate: updated?.last_active_date || today 
    };
  } else {
    const newUser = { username, score: 50, streak: 1, last_active_date: today };
    const { data: inserted } = await supabase
      .from('users')
      .insert([newUser])
      .select()
      .single();

    user = { 
      username: inserted?.username || username, 
      score: inserted?.score || 50, 
      streak: inserted?.streak || 1, 
      lastActiveDate: inserted?.last_active_date || today 
    };
  }

  if (typeof window !== "undefined") {
    localStorage.setItem("jishig_current_user", JSON.stringify(user));
  }

  return { success: true, user };
}

export async function getUsersLeaderboard(): Promise<UserProfile[]> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('score', { ascending: false });

  if (error || !data) return [];
  
  return data.map((u: any) => ({
    username: u.username,
    score: u.score,
    streak: u.streak,
    lastActiveDate: u.last_active_date,
  }));
}
