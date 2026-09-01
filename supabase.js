import { createClient } from '@supabase/supabase-js';

// 🔑 GANTI DENGAN CREDENTIAL SUPABASE ANDA
const SUPABASE_URL = 'https://puscykjiuwdbkytoigoe.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_TbKYM5XREVbBpp8EE1GXCg_gDr4uvZd';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Upload bukti ke Storage
export async function uploadProof(file, orderId) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${orderId}.${fileExt}`;
  const filePath = `proofs/${fileName}`;

  const { data, error } = await supabase.storage
    .from('proofs')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) throw error;

  // Dapatkan public URL
  const { data: urlData } = supabase.storage
    .from('proofs')
    .getPublicUrl(filePath);

  return urlData.publicUrl;
}

// Real-time subscription
export function subscribeOrders(callback) {
  return supabase
    .channel('orders-changes')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'orders' },
      (payload) => callback(payload)
    )
    .subscribe();
}
