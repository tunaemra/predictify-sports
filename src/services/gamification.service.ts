import { supabase } from '@/lib/supabase';
import { UserLevel, calculateXPForLevel, getTitleForLevel, XP_AWARDS } from '@/types/gamification';

export class GamificationService {
  /**
   * Get user level information
   */
  async getUserLevel(userId: string): Promise<UserLevel | null> {
    const { data, error } = await supabase
      .from('user_levels')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error || !data) {
      return null;
    }

    const xpToNextLevel = calculateXPForLevel(data.level + 1) - data.xp;

    return {
      userId: data.user_id,
      level: data.level,
      xp: data.xp,
      xpToNextLevel,
      title: data.title,
    };
  }

  /**
   * Award XP to a user and handle level ups
   */
  async awardXP(userId: string, xpAmount: number, reason: string): Promise<UserLevel | null> {
    // Get current level
    const currentLevel = await this.getUserLevel(userId);
    
    if (!currentLevel) {
      // Initialize user level if doesn't exist
      const { data: newLevel } = await supabase
        .from('user_levels')
        .insert([{ user_id: userId, xp: xpAmount, level: 1, title: getTitleForLevel(1) }])
        .select()
        .single();
      
      if (newLevel) {
        return {
          userId: newLevel.user_id,
          level: newLevel.level,
          xp: newLevel.xp,
          xpToNextLevel: calculateXPForLevel(2) - newLevel.xp,
          title: newLevel.title,
        };
      }
      return null;
    }

    const newXP = currentLevel.xp + xpAmount;
    let newLevel = currentLevel.level;
    let remainingXP = newXP;

    // Check for level ups
    while (remainingXP >= calculateXPForLevel(newLevel + 1) && newLevel < 100) {
      remainingXP -= calculateXPForLevel(newLevel + 1);
      newLevel++;
    }

    const newTitle = getTitleForLevel(newLevel);

    // Update database
    const { data, error } = await supabase
      .from('user_levels')
      .update({ xp: newXP, level: newLevel, title: newTitle })
      .eq('user_id', userId)
      .select()
      .single();

    if (error || !data) {
      return null;
    }

    return {
      userId: data.user_id,
      level: data.level,
      xp: data.xp,
      xpToNextLevel: calculateXPForLevel(data.level + 1) - data.xp,
      title: data.title,
    };
  }

  /**
   * Get user's unlocked achievements
   */
  async getUserAchievements(userId: string) {
    const { data, error } = await supabase
      .from('user_achievements')
      .select(`
        *,
        achievement:achievements(*)
      `)
      .eq('user_id', userId);

    if (error) {
      return [];
    }

    return data;
  }

  /**
   * Unlock an achievement for a user
   */
  async unlockAchievement(userId: string, achievementId: string) {
    // Check if already unlocked
    const { data: existing } = await supabase
      .from('user_achievements')
      .select('*')
      .eq('user_id', userId)
      .eq('achievement_id', achievementId)
      .single();

    if (existing) {
      return { alreadyUnlocked: true };
    }

    // Get achievement details
    const { data: achievement } = await supabase
      .from('achievements')
      .select('*')
      .eq('id', achievementId)
      .single();

    if (!achievement) {
      return { error: 'Achievement not found' };
    }

    // Unlock achievement
    const { error } = await supabase
      .from('user_achievements')
      .insert([{ user_id: userId, achievement_id: achievementId }]);

    if (error) {
      return { error: error.message };
    }

    // Award XP
    await this.awardXP(userId, achievement.xp_reward, `Achievement unlocked: ${achievement.name}`);

    return { success: true, achievement };
  }

  /**
   * Update user's streak
   */
  async updateStreak(userId: string, isCorrect: boolean) {
    const { data: streak } = await supabase
      .from('streaks')
      .select('*')
      .eq('user_id', userId)
      .single();

    const today = new Date().toISOString().split('T')[0];

    if (!streak) {
      // Initialize streak
      const { data } = await supabase
        .from('streaks')
        .insert([{
          user_id: userId,
          current: isCorrect ? 1 : 0,
          best: isCorrect ? 1 : 0,
          last_prediction_date: today
        }])
        .select()
        .single();
      
      return data;
    }

    const lastDate = streak.last_prediction_date;
    const isConsecutive = this.isConsecutiveDay(lastDate, today);

    let newCurrent = isCorrect ? (isConsecutive ? streak.current + 1 : 1) : 0;
    const newBest = Math.max(newCurrent, streak.best);

    // Update streak
    const { data } = await supabase
      .from('streaks')
      .update({
        current: newCurrent,
        best: newBest,
        last_prediction_date: today
      })
      .eq('user_id', userId)
      .select()
      .single();

    // Award streak bonuses
    if (newCurrent === 3) {
      await this.awardXP(userId, XP_AWARDS.STREAK_3, '3 streak bonus');
    } else if (newCurrent === 5) {
      await this.unlockAchievement(userId, 'achievement-fire-ball-id'); // Would need actual ID
    } else if (newCurrent === 10) {
      await this.unlockAchievement(userId, 'achievement-lightning-id'); // Would need actual ID
    }

    return data;
  }

  /**
   * Check if two dates are consecutive days
   */
  private isConsecutiveDay(lastDate: string, currentDate: string): boolean {
    const last = new Date(lastDate);
    const current = new Date(currentDate);
    const diffTime = Math.abs(current.getTime() - last.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1;
  }

  /**
   * Get leaderboard for a period
   */
  async getLeaderboard(period: 'daily' | 'weekly' | 'monthly' | 'all-time', limit = 100) {
    const { data, error } = await supabase
      .from('leaderboards')
      .select(`
        *,
        profile:profiles(username, avatar)
      `)
      .eq('period', period)
      .order('rank', { ascending: true })
      .limit(limit);

    if (error) {
      return [];
    }

    return data;
  }

  /**
   * Update leaderboard for a user
   */
  async updateLeaderboard(userId: string, score: number, accuracyRate: number, totalPredictions: number) {
    const periods: Array<'daily' | 'weekly' | 'monthly' | 'all-time'> = ['daily', 'weekly', 'monthly', 'all-time'];

    for (const period of periods) {
      await supabase
        .from('leaderboards')
        .upsert({
          user_id: userId,
          period,
          score,
          accuracy_rate: accuracyRate,
          total_predictions: totalPredictions,
          rank: 0 // Will be calculated by a periodic job
        }, {
          onConflict: 'period,user_id'
        });
    }
  }
}

export const gamificationService = new GamificationService();
