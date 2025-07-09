import { supabase } from "../libs/supabase";

export const fetchWrite = async (data) => {
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      "Supabase 환경 변수를 설정해주세요. (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)"
    );
  }

  const { error } = await supabase
    .from("posts")
    .insert({
      title: data.title,
      content: data.content,
      user_id: data.user_id,
      created_at: new Date().toISOString(), // 현재 시간 추가
    })
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return {
    error,
  };
};
