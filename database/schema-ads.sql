-- Advertisement Integration Database Schema
-- Tables for tracking ad impressions, rewards, and analytics

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Ad impressions tracking table
-- Stores every ad impression for analytics and revenue tracking
CREATE TABLE IF NOT EXISTS ad_impressions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  ad_type TEXT NOT NULL CHECK (ad_type IN ('banner', 'interstitial', 'rewarded', 'native')),
  ad_provider TEXT NOT NULL CHECK (ad_provider IN ('monetag', 'admob')),
  placement TEXT NOT NULL, -- e.g., 'home_top', 'match_bottom', 'sidebar_right'
  revenue DECIMAL(10, 4) DEFAULT 0.00, -- Estimated revenue from this impression
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Indexes for common queries
  CONSTRAINT valid_revenue CHECK (revenue >= 0)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_ad_impressions_user_id ON ad_impressions(user_id);
CREATE INDEX IF NOT EXISTS idx_ad_impressions_created_at ON ad_impressions(created_at);
CREATE INDEX IF NOT EXISTS idx_ad_impressions_ad_type ON ad_impressions(ad_type);
CREATE INDEX IF NOT EXISTS idx_ad_impressions_ad_provider ON ad_impressions(ad_provider);

-- Ad rewards table
-- Tracks rewards given to users for watching rewarded video ads
CREATE TABLE IF NOT EXISTS ad_rewards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reward_type TEXT NOT NULL CHECK (reward_type IN ('xp', 'prediction', 'ai_credit')),
  reward_amount INTEGER NOT NULL CHECK (reward_amount > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_ad_rewards_user_id ON ad_rewards(user_id);
CREATE INDEX IF NOT EXISTS idx_ad_rewards_created_at ON ad_rewards(created_at);

-- Analytics view for daily ad performance
CREATE OR REPLACE VIEW ad_analytics_daily AS
SELECT 
  DATE(created_at) as date,
  ad_type,
  ad_provider,
  placement,
  COUNT(*) as impressions,
  SUM(revenue) as total_revenue,
  AVG(revenue) as avg_revenue
FROM ad_impressions
GROUP BY DATE(created_at), ad_type, ad_provider, placement
ORDER BY DATE(created_at) DESC, total_revenue DESC;

-- Analytics view for monthly ad performance
CREATE OR REPLACE VIEW ad_analytics_monthly AS
SELECT 
  DATE_TRUNC('month', created_at) as month,
  ad_type,
  ad_provider,
  COUNT(*) as impressions,
  SUM(revenue) as total_revenue,
  AVG(revenue) as avg_revenue
FROM ad_impressions
GROUP BY DATE_TRUNC('month', created_at), ad_type, ad_provider
ORDER BY month DESC, total_revenue DESC;

-- User ad rewards summary view
CREATE OR REPLACE VIEW user_ad_rewards_summary AS
SELECT 
  user_id,
  reward_type,
  COUNT(*) as total_rewards,
  SUM(reward_amount) as total_amount,
  MAX(created_at) as last_reward_date
FROM ad_rewards
GROUP BY user_id, reward_type;

-- Function to track ad impression
CREATE OR REPLACE FUNCTION track_ad_impression(
  p_user_id UUID,
  p_ad_type TEXT,
  p_ad_provider TEXT,
  p_placement TEXT,
  p_revenue DECIMAL DEFAULT 0.00
) RETURNS UUID AS $$
DECLARE
  v_impression_id UUID;
BEGIN
  INSERT INTO ad_impressions (user_id, ad_type, ad_provider, placement, revenue)
  VALUES (p_user_id, p_ad_type, p_ad_provider, p_placement, p_revenue)
  RETURNING id INTO v_impression_id;
  
  RETURN v_impression_id;
END;
$$ LANGUAGE plpgsql;

-- Function to add bonus XP from rewarded ad
CREATE OR REPLACE FUNCTION add_bonus_xp(
  p_user_id UUID,
  p_xp INTEGER
) RETURNS VOID AS $$
BEGIN
  -- Record the reward
  INSERT INTO ad_rewards (user_id, reward_type, reward_amount)
  VALUES (p_user_id, 'xp', p_xp);
  
  -- Update user XP (assumes profiles table has an xp column)
  -- UPDATE profiles SET xp = xp + p_xp WHERE id = p_user_id;
  
  -- Note: Uncomment the UPDATE statement above once the profiles table structure is confirmed
END;
$$ LANGUAGE plpgsql;

-- Function to add bonus prediction from rewarded ad
CREATE OR REPLACE FUNCTION add_bonus_prediction(
  p_user_id UUID,
  p_count INTEGER DEFAULT 1
) RETURNS VOID AS $$
BEGIN
  -- Record the reward
  INSERT INTO ad_rewards (user_id, reward_type, reward_amount)
  VALUES (p_user_id, 'prediction', p_count);
  
  -- Update user prediction count (assumes profiles table has a bonus_predictions column)
  -- UPDATE profiles SET bonus_predictions = bonus_predictions + p_count WHERE id = p_user_id;
  
  -- Note: Uncomment the UPDATE statement above once the profiles table structure is confirmed
END;
$$ LANGUAGE plpgsql;

-- Function to add bonus AI credit from rewarded ad
CREATE OR REPLACE FUNCTION add_bonus_ai_credit(
  p_user_id UUID,
  p_count INTEGER DEFAULT 1
) RETURNS VOID AS $$
BEGIN
  -- Record the reward
  INSERT INTO ad_rewards (user_id, reward_type, reward_amount)
  VALUES (p_user_id, 'ai_credit', p_count);
  
  -- Update user AI credits (assumes profiles table has a bonus_ai_credits column)
  -- UPDATE profiles SET bonus_ai_credits = bonus_ai_credits + p_count WHERE id = p_user_id;
  
  -- Note: Uncomment the UPDATE statement above once the profiles table structure is confirmed
END;
$$ LANGUAGE plpgsql;

-- Grant permissions (adjust role names as needed)
-- GRANT SELECT, INSERT ON ad_impressions TO authenticated;
-- GRANT SELECT ON ad_rewards TO authenticated;
-- GRANT SELECT ON ad_analytics_daily TO authenticated;
-- GRANT SELECT ON ad_analytics_monthly TO authenticated;
-- GRANT SELECT ON user_ad_rewards_summary TO authenticated;
