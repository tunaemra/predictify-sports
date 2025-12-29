-- Create profiles table with subscription tier
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_tier TEXT NOT NULL DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'vip')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create AI predictions table
CREATE TABLE IF NOT EXISTS ai_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id TEXT NOT NULL,
  prediction_data JSONB NOT NULL,
  confidence DECIMAL NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on match_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_ai_predictions_match_id ON ai_predictions(match_id);
CREATE INDEX IF NOT EXISTS idx_ai_predictions_created_at ON ai_predictions(created_at DESC);

-- Create AI chat messages table
CREATE TABLE IF NOT EXISTS ai_chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  response TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_ai_chat_messages_user_id ON ai_chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_chat_messages_created_at ON ai_chat_messages(created_at DESC);

-- Create user AI usage tracking table
CREATE TABLE IF NOT EXISTS user_ai_usage (
  user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  daily_predictions_count INTEGER DEFAULT 0,
  daily_chat_count INTEGER DEFAULT 0,
  last_reset_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create predictions table for user predictions
CREATE TABLE IF NOT EXISTS predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  match_id TEXT NOT NULL,
  prediction_data JSONB NOT NULL,
  result TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id and created_at for faster lookups
CREATE INDEX IF NOT EXISTS idx_predictions_user_id ON predictions(user_id);
CREATE INDEX IF NOT EXISTS idx_predictions_created_at ON predictions(created_at DESC);

-- Create personalized recommendations table
CREATE TABLE IF NOT EXISTS personalized_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  match_id TEXT NOT NULL,
  reason TEXT,
  expected_accuracy DECIMAL,
  shown BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_personalized_recommendations_user_id ON personalized_recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_personalized_recommendations_shown ON personalized_recommendations(shown);

-- Create function to increment AI usage
CREATE OR REPLACE FUNCTION increment_ai_usage(p_user_id UUID, p_column TEXT)
RETURNS void AS $$
BEGIN
  IF p_column = 'daily_predictions_count' THEN
    UPDATE user_ai_usage
    SET daily_predictions_count = daily_predictions_count + 1,
        updated_at = NOW()
    WHERE user_id = p_user_id;
  ELSIF p_column = 'daily_chat_count' THEN
    UPDATE user_ai_usage
    SET daily_chat_count = daily_chat_count + 1,
        updated_at = NOW()
    WHERE user_id = p_user_id;
  END IF;
  
  -- If no row exists, create one
  IF NOT FOUND THEN
    INSERT INTO user_ai_usage (user_id, daily_predictions_count, daily_chat_count, last_reset_date)
    VALUES (
      p_user_id,
      CASE WHEN p_column = 'daily_predictions_count' THEN 1 ELSE 0 END,
      CASE WHEN p_column = 'daily_chat_count' THEN 1 ELSE 0 END,
      CURRENT_DATE
    );
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_predictions_updated_at BEFORE UPDATE ON ai_predictions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_ai_usage_updated_at BEFORE UPDATE ON user_ai_usage
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
