import { Injectable } from '@angular/core';
import { Topic } from './models';
import { INITIAL_TOPICS } from './data/data';

// const TOPICS_STORAGE_KEY = 'fluent-tongue.topics';

@Injectable({ providedIn: 'root' })
export class CoreService {
  private memoryTopics = this.cloneTopics(INITIAL_TOPICS);

  getTopics(): Topic[] {
    return this.memoryTopics.map(this.withTopicDefaults);
  }

  loadTopics(): Topic[] {
    return this.getTopics();
  }

  getTopicById(id: string): Topic | null {
    const topic = this.getTopics().find((item) => item.id === id) ?? null;
    return topic ? this.withTopicDefaults(topic) : null;
  }

  getTopicBySlug(slug: string): Topic | null {
    if (!slug?.trim()) return null;

    const normalizedSlug = this.slugify(slug);
    const topic =
      this.getTopics().find((item) => this.slugify(item.slug ?? item.name) === normalizedSlug) ??
      null;

    return topic ? this.withTopicDefaults(topic) : null;
  }

  hasTopicBySlug(slug: string): boolean {
    return this.getTopicBySlug(slug) !== null;
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
      items: topic.items ?? [],
    };
  }
}
