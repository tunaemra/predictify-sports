import { createClient } from '@supabase/supabase-js';
import { AIPrediction } from '@/types/ai';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn('⚠️ Supabase credentials not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Get user profile with subscription tier
 */
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, subscription_tier, created_at')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  return data;
}

/**
 * Check daily AI usage limit
 */
export async function checkDailyLimit(userId: string, type: 'predictions' | 'chat'): Promise<number> {
  const today = new Date().toISOString().split('T')[0];
  
  const { data, error } = await supabase
    .from('user_ai_usage')
    .select('daily_predictions_count, daily_chat_count, last_reset_date')
    .eq('user_id', userId)
    .single();

  if (error || !data) {
    // Create new usage record if doesn't exist
    await supabase.from('user_ai_usage').insert({
      user_id: userId,
      daily_predictions_count: 0,
      daily_chat_count: 0,
      last_reset_date: today,
    });
    return 0;
  }

  // Reset counters if it's a new day
  if (data.last_reset_date !== today) {
    await supabase
      .from('user_ai_usage')
      .update({
        daily_predictions_count: 0,
        daily_chat_count: 0,
        last_reset_date: today,
      })
      .eq('user_id', userId);
    return 0;
  }

  return type === 'predictions' ? data.daily_predictions_count : data.daily_chat_count;
}

/**
 * Increment AI usage counter
 */
export async function incrementUsage(userId: string, type: 'predictions' | 'chat') {
  const column = type === 'predictions' ? 'daily_predictions_count' : 'daily_chat_count';
  
  const { error } = await supabase.rpc('increment_ai_usage', {
    p_user_id: userId,
    p_column: column,
  });

  if (error) {
    console.error('Error incrementing usage:', error);
  }
}

/**
 * Save AI prediction to database
 */
export async function saveAIPrediction(matchId: string, prediction: AIPrediction) {
  const { data, error } = await supabase
    .from('ai_predictions')
    .insert({
      match_id: matchId,
      prediction_data: prediction as unknown as Record<string, unknown>,
      confidence: prediction.confidence,
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving AI prediction:', error);
    return null;
  }

  return data;
}

/**
 * Get AI prediction for a match
 */
export async function getAIPrediction(matchId: string) {
  const { data, error } = await supabase
    .from('ai_predictions')
    .select('*')
    .eq('match_id', matchId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching AI prediction:', error);
    return null;
  }

  return data;
}

/**
 * Save AI chat message
 */
export async function saveAIChatMessage(userId: string, message: string, response: string) {
  const { data, error } = await supabase
    .from('ai_chat_messages')
    .insert({
      user_id: userId,
      message,
      response,
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving chat message:', error);
    return null;
  }

  return data;
}

/**
 * Get user's chat history
 */
export async function getChatHistory(userId: string, limit: number = 10) {
  const { data, error } = await supabase
    .from('ai_chat_messages')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }

  return data;
}
