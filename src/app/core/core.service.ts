import { Injectable } from '@angular/core';
import { Topic } from './models';

export type CreateTopicInput = Pick<Topic, 'name'> &
  Partial<Omit<Topic, 'id' | 'name' | 'createdAt'>>;

export type UpdateTopicInput = Partial<Omit<Topic, 'id' | 'createdAt'>>;

const TOPICS_STORAGE_KEY = 'fluent-tongue.topics';
const INITIAL_TOPICS: Topic[] = [
  {
    id: '1',
    name: 'Travel',
    emoji: '✈️',
    count: 48,
    description: 'Airport, transportation, and trip conversations.',
    slug: 'travel',
    level: 'beginner',
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    name: 'Food',
    emoji: '🍜',
    count: 36,
    description: 'Meals, ingredients, restaurants, and ordering food.',
    slug: 'food',
    level: 'beginner',
    createdAt: '2024-01-02T00:00:00.000Z',
  },
  {
    id: '3',
    name: 'Work',
    emoji: '💼',
    count: 29,
    description: 'Office vocabulary, meetings, and professional phrases.',
    slug: 'work',
    level: 'intermediate',
    createdAt: '2024-01-03T00:00:00.000Z',
  },
  {
    id: '4',
    name: 'Daily Life',
    emoji: '🏡',
    count: 54,
    description: 'Useful words and phrases for everyday routines.',
    slug: 'daily-life',
    level: 'beginner',
    createdAt: '2024-01-04T00:00:00.000Z',
  },
];

@Injectable({ providedIn: 'root' })
export class CoreService {
  private memoryTopics = this.cloneTopics(INITIAL_TOPICS);

  getTopics(): Topic[] {
    return this.readTopics().map((topic) => this.withTopicDefaults(topic));
  }

  loadTopics(): Topic[] {
    return this.getTopics();
  }

  getTopicById(id: string): Topic | null {
    const topic = this.readTopics().find((item) => item.id === id) ?? null;
    return topic ? this.withTopicDefaults(topic) : null;
  }

  createTopic(input: CreateTopicInput): Topic {
    const topics = this.readTopics();
    const topic: Topic = {
      id: this.generateNextId(topics),
      name: input.name,
      emoji: input.emoji ?? '📘',
      count: input.count ?? 0,
      description: input.description ?? '',
      slug: input.slug ?? this.slugify(input.name),
      level: input.level ?? 'beginner',
      createdAt: new Date().toISOString(),
    };

    topics.push(topic);
    this.writeTopics(topics);

    return topic;
  }

  updateTopic(id: string, changes: UpdateTopicInput): Topic | null {
    const topics = this.readTopics();
    const index = topics.findIndex((topic) => topic.id === id);

    if (index === -1) {
      return null;
    }

    const current = topics[index];
    const updated: Topic = {
      ...current,
      ...changes,
      id: current.id,
      createdAt: current.createdAt,
      slug: changes.slug ?? (changes.name ? this.slugify(changes.name) : current.slug),
    };

    topics[index] = updated;
    this.writeTopics(topics);

    return updated;
  }

  deleteTopic(id: string): boolean {
    const topics = this.readTopics();
    const nextTopics = topics.filter((topic) => topic.id !== id);

    if (nextTopics.length === topics.length) {
      return false;
    }

    this.writeTopics(nextTopics);
    return true;
  }

  resetTopics(): Topic[] {
    this.writeTopics(INITIAL_TOPICS);
    return this.getTopics();
  }

  private readTopics(): Topic[] {
    if (!this.hasStorage()) {
      return this.cloneTopics(this.memoryTopics);
    }

    const rawTopics = localStorage.getItem(TOPICS_STORAGE_KEY);

    if (rawTopics === null) {
      this.writeTopics(INITIAL_TOPICS);
      return this.cloneTopics(INITIAL_TOPICS);
    }

    try {
      const parsedTopics = JSON.parse(rawTopics) as Topic[];
      return Array.isArray(parsedTopics)
        ? this.cloneTopics(parsedTopics)
        : this.cloneTopics(INITIAL_TOPICS);
    } catch {
      this.writeTopics(INITIAL_TOPICS);
      return this.cloneTopics(INITIAL_TOPICS);
    }
  }

  private writeTopics(topics: Topic[]): void {
    const snapshot = this.cloneTopics(topics);
    this.memoryTopics = snapshot;

    if (!this.hasStorage()) {
      return;
    }

    localStorage.setItem(TOPICS_STORAGE_KEY, JSON.stringify(snapshot));
  }

  private generateNextId(topics: Topic[]): string {
    const nextId =
      topics.reduce((maxId, topic) => {
        const numericId = Number(topic.id);
        return Number.isNaN(numericId) ? maxId : Math.max(maxId, numericId);
      }, 0) + 1;

    return String(nextId);
  }

  private slugify(value: string): string {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private hasStorage(): boolean {
    return typeof localStorage !== 'undefined';
  }

  private cloneTopics(topics: Topic[]): Topic[] {
    return topics.map((topic) => ({ ...topic }));
  }

  private withTopicDefaults(topic: Topic): Topic {
    return {
      ...topic,
      emoji: topic.emoji ?? '📘',
    };
  }
}
