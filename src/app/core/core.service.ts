import { Injectable } from '@angular/core'
import { Topic, VocabularyItem } from './models'
import { INITIAL_TOPICS } from './data/data'
import { map, Observable, of } from 'rxjs'
import { slugify } from '../utils'

// const TOPICS_STORAGE_KEY = 'fluent-tongue.topics';

const PAGE_SIZE = 10; // Number of topics per page

@Injectable({ providedIn: 'root' })
export class CoreService {
  private readonly topics = INITIAL_TOPICS

  getTopics(page: number = 1) {
    // page = Math.max(1, page); // Ensure the page number is at least 1
    // const topicsPage = this.topics.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE); // Get 10 topics per page
    const data$ = of(this.topics)
    return data$
  }

  getVocabularyItemsBySlug(slug: string): Observable<VocabularyItem[]> {
    return this.getTopicBySlug(slug).pipe(map((topic) => topic?.items ?? []))
  }

  getTopicBySlug(slug: string) {
    const normalizedSlug = slugify(slug)

    return this.getTopics().pipe(
      map((topics) => topics.find((item) => slugify(item.slug ?? item.name) === normalizedSlug)),
    )
  }
}
