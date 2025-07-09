import { supabase } from "../libs/supabase";

export const fetchCarts = async (userId, page = 1, limit = 20) => {
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      "Supabase 환경 변수를 설정해주세요. (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)"
    );
  }

  const offset = (page - 1) * limit;

  // let response = await supabase.from("carts").select("*");

  const { data, count, error } = await supabase
    .from("carts")
    .select(`id, product_id, quantity`, { count: "exact" })
    .order("id", { ascending: false })
    .range(offset, offset + limit - 1)
    .eq("user_id", userId);

  console.log(data, count);

  if (error) {
    throw new Error(error.message);
  }

  return {
    carts: data ?? [],
    totalCount: count ?? 0,
  };
};

export const insertCarts = async (userId, productId) => {
  // 원래 있었는지

  const { error } = await supabase
    .from("carts")
    .insert({ user_id: userId, product_id: productId });

  if (error) {
    throw new Error(error.message);
  }

  return true;
};
