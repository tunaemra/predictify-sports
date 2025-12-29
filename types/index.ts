export type SubscriptionTier = 'free' | 'pro' | 'vip'

export interface Profile {
  id: string
  username: string | null
  avatar_url: string | null
  bio: string | null
  subscription_tier: SubscriptionTier
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  created_at: string
}

export type PredictionType = 'result' | 'over_under' | 'btts' | 'handicap'
export type PredictionStatus = 'pending' | 'won' | 'lost'

export interface Prediction {
  id: string
  user_id: string
  match_id: string
  prediction_type: PredictionType
  prediction_value: string
  odds: number
  notes: string | null
  status: PredictionStatus
  match_result: string | null
  created_at: string
}

export interface UserStats {
  user_id: string
  total_predictions: number
  correct_predictions: number
  accuracy_rate: number
  current_streak: number
  best_streak: number
  updated_at: string
}

export interface Match {
  id: string
  homeTeam: {
    id: number
    name: string
    crest: string
  }
  awayTeam: {
    id: number
    name: string
    crest: string
  }
  utcDate: string
  status: string
  score: {
    fullTime: {
      home: number | null
      away: number | null
    }
  }
  competition: {
    id: number
    name: string
    emblem: string
  }
}
