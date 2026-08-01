// Shared domain models used across feature pages and route navigation.
// Topic fields are used directly by the topics management view.
export interface Topic {
  id: string
  name: string
  emoji?: string
  description: string
  slug: string
  level: string
  items: VocabularyItem[]
  tags: string[]
}

export interface VocabularyItem {
  id: string
  topicId: string
  term: string
  definition: string
  translation: string
  examples: string[]
  notes: string
}

export interface ReviewSession {
  id: string
  topicId: string
  startedAt: string
  finishedAt: string
  correctAnswers: number
  wrongAnswers: number
}

export interface UserProgress {
  totalTopics: number
  totalVocabularyItems: number
  reviewsCompleted: number
  streak: number
  accuracy: number
}
