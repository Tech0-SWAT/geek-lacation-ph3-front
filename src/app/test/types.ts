export interface TweetAnalysis {
  id: string;
  content: string;
  hasImage: boolean;
  hasLink: boolean;
  hasReplies: boolean;
  followerCount: number;
  followerText: string;
  replyTypes: string[];
  insights: string;
  imageUrl?: string;
  category: string;
}

export interface TweetCardProps {
  tweet: TweetAnalysis;
}