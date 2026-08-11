import { Injectable } from '@angular/core'
import { Topic, VocabularyItem } from './models'
import { INITIAL_TOPICS } from './data/data'
import { delay, map, Observable, of } from 'rxjs'
import { slugify } from '../utils'

// const TOPICS_STORAGE_KEY = 'fluent-tongue.topics';

@Injectable({ providedIn: 'root' })
export class CoreService {
  private readonly topics = INITIAL_TOPICS

  getTopics() {
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
