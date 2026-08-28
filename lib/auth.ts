import { createClient } from '@/lib/supabase/server';

export async function getCurrentUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getCurrentProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Jika profile belum ada, buat otomatis
  if (!profile) {
    const { data: newProfile, error } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        username: user.user_metadata?.username || user.email?.split('@')[0] || 'user',
        display_name: user.user_metadata?.display_name || user.email?.split('@')[0] || 'User',
        email: user.email,
        role: 'user',
      })
      .select()
      .single();

    if (!error) return newProfile;
  }

  return profile;
}

export async function requireAdmin() {
  const profile = await getCurrentProfile();
  return profile?.role === 'admin' ? profile : null;
}
