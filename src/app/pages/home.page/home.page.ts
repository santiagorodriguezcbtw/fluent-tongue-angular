import { Component, signal, inject, computed } from '@angular/core'
import { CoreService } from '../../core/core.service'
import type { Topic } from '../../core/models'
import { RouterLink } from '@angular/router'
import { Header } from '../../components/header/header'
import { TAG_FILTERS } from '../../core/data/data'

@Component({
  selector: 'app-home.page',
  imports: [RouterLink, Header],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage {
  topics = signal<Topic[]>([])
  search = signal('')
  readonly tagFilters = ['All', ...TAG_FILTERS]
  selectedTag = signal('All')

  filteredTopics = computed(() => {
    const term = this.search().trim().toLowerCase()
    const activeTag = this.selectedTag().toLowerCase()
    const normalizedTag = activeTag.replace(/\s+/g, '-')

    return this.topics().filter((topic) => {
      const matchesSearch = !term || topic.name.toLowerCase().includes(term) || topic.slug.toLowerCase().includes(term)
      const matchesTag =
        activeTag === 'all' ||
        topic.level === activeTag ||
        topic.tags.includes(activeTag) ||
        topic.tags.includes(normalizedTag)

      return matchesSearch && matchesTag
    })
  })
  readonly coreService = inject(CoreService)

  constructor() {
    this.topics.set(this.coreService.getTopics())
  }

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value
    this.search.set(value)
  }

  clearSearch() {
    this.search.set('')
  }

  clearFilters() {
    this.search.set('')
    this.selectedTag.set('All')
  }

  setTagFilter(tag: string) {
    this.selectedTag.set(tag)
  }
}
