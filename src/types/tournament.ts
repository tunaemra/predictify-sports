// Referral and Tournament Types

export type ReferralStatus = 'pending' | 'completed';

export interface Referral {
  id: string;
  referrerId: string; // Davet eden
  referredId: string; // Davet edilen
  status: ReferralStatus;
  reward: {
    type: 'free_pro' | 'free_vip' | 'xp';
    duration: number; // günler
    value: number;
  };
  createdAt: string;
}

export type CouponStatus = 'pending' | 'won' | 'lost' | 'partial';

export interface Coupon {
  id: string;
  userId: string;
  predictions: string[]; // Prediction IDs
  totalOdds: number;
  status: CouponStatus;
  potentialWin: number;
  createdAt: string;
}

export interface Tournament {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  entryFee: number; // XP veya para
  prizePool: {
    first: string;
    second: string;
    third: string;
  };
  participants: string[];
  rules: string;
}

export interface TournamentParticipant {
  tournamentId: string;
  userId: string;
  score: number;
  joinedAt: string;
}
