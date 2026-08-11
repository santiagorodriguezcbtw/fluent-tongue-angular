import { Component, signal, inject, computed, OnInit } from '@angular/core'
import { CoreService } from '../../core/core.service'
import type { Topic } from '../../core/models'
import { RouterLink } from '@angular/router'
import { TAG_FILTERS } from '../../core/data/data'
import { Footer } from '../../components/footer/footer'
import { ChevronRightIcon, SearchIcon } from '../../components/icons'
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'app-home.page',
  imports: [RouterLink, Footer, ChevronRightIcon, SearchIcon],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
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

  private title = inject(Title)

  constructor() {}

  ngOnInit(): void {
    this.title.setTitle('Study Flash - Home')
    this.loadTopics()
  }

  loadTopics() {
    this.coreService.getTopics().subscribe((topics) => {
      this.topics.set(topics)
      console.log('Topics loaded:', topics)
    })
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
