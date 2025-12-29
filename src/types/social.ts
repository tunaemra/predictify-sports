// Social Features Types

export type FriendshipStatus = 'pending' | 'accepted' | 'blocked';

export interface Friendship {
  id: string;
  userId: string;
  friendId: string;
  status: FriendshipStatus;
  createdAt: string;
}

export interface FriendActivity {
  friendId: string;
  username: string;
  avatar: string;
  recentPredictions: any[]; // Reference to Prediction type
  accuracyRate: number;
  rank: number;
}

export type SharedPredictionVisibility = 'public' | 'friends' | 'private';

export interface SharedPrediction {
  id: string;
  predictionId: string;
  sharedBy: string;
  sharedAt: string;
  visibility: SharedPredictionVisibility;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  predictionId: string;
  userId: string;
  text: string;
  createdAt: string;
  likes: number;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  avatar: string;
  ownerId: string;
  members: string[];
  isPrivate: boolean;
  groupLeaderboard: any; // Reference to Leaderboard
  createdAt: string;
}

export interface GroupMember {
  groupId: string;
  userId: string;
  joinedAt: string;
}
