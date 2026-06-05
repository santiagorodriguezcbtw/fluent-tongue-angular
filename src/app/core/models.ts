// Shared domain models used across feature pages and route navigation.
// Topic fields are used directly by the topics management view.
export interface Topic {
  id: string;
  name: string;
  emoji: string;
  count: number;
  description: string;
  slug: string;
  level: string;
  createdAt: string;
}

export interface VocabularyItem {
  id: string;
  topicId: string;
  term: string;
  translation: string;
  example: string;
  notes: string;
  lastReviewedAt: string;
}

export interface ReviewSession {
  id: string;
  topicId: string;
  startedAt: string;
  finishedAt: string;
  correctAnswers: number;
  wrongAnswers: number;
}

export interface UserProgress {
  totalTopics: number;
  totalVocabularyItems: number;
  reviewsCompleted: number;
  streak: number;
  accuracy: number;
}
