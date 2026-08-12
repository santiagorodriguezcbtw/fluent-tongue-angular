import { Component, inject, OnInit, signal, computed } from '@angular/core'
import { FlipCard } from '../../components/flip-card/flip-card'
import { Topic } from '../../core/models'
import { CoreService } from '../../core/core.service'
import { ActivatedRoute, Router } from '@angular/router'
import { BookOpenIcon, BookPlaceholderIcon, ChevronLeftIcon, ChevronRightIcon, ZapIcon } from '../../components/icons'
import { FlipCardService } from '../../services/flip-card.service'
import { Header } from '../../components/header/header'
import { Meta, Title } from '@angular/platform-browser'

@Component({
  selector: 'app-study-flash-page',
  templateUrl: './study-flash-page.html',
  styleUrls: ['./study-flash-page.css'],
  imports: [FlipCard, ChevronLeftIcon, ChevronRightIcon, BookOpenIcon, ZapIcon, BookPlaceholderIcon, Header],
})
export class StudyFlashPage implements OnInit {
  private readonly coreService = inject(CoreService)
  readonly route = inject(ActivatedRoute)
  readonly router = inject(Router)
  protected readonly flipCardService = inject(FlipCardService)

  readonly currentIndex = this.flipCardService.currentIndex
  readonly total = this.flipCardService.total
  readonly currentTerm = this.flipCardService.currentTerm
  readonly progress = this.flipCardService.progress
  readonly isFlipped = computed(() => this.flipCardService.isFlipped())

  readonly isError = signal('')
  readonly vocabTopic = signal<Topic | null>(null)
  private title = inject(Title)
  private meta = inject(Meta)

  constructor() {
    const slugUrlParam = this.route.snapshot.paramMap.get('slug')
    if (!slugUrlParam) {
      const errorMessage = 'No slug parameter found in the route.'
      console.error(errorMessage)
      this.isError.set(errorMessage)
      return
    }

    this.coreService.getTopicBySlug(slugUrlParam).subscribe((topic) => {
      this.vocabTopic.set(topic ?? null)
    })

    this.coreService.getVocabularyItemsBySlug(slugUrlParam).subscribe((vocabularyItems) => {
      if (!vocabularyItems || vocabularyItems.length === 0) {
        const errorMessage = 'No vocabulary items found for the given slug.'
        console.error(errorMessage)
        this.isError.set(errorMessage)
        return
      }

      this.flipCardService.setVocabularyItems(vocabularyItems)
    })
  }

  ngOnInit(): void {
    this.title.setTitle(`StudyFlash - ${this.vocabTopic()?.name ?? 'Unknown Topic'}`)
    this.meta.updateTag({
      name: 'description',
      content: this.vocabTopic()?.description ?? 'StudyFlash - Flashcard Study',
    })
    this.meta.updateTag({
      name: 'keywords',
      content: this.vocabTopic()?.tags.join(', ') ?? 'flashcards, study, learning',
    })
  }

  navigateClick(isNext: boolean): void {
    this.flipCardService.navigate(isNext ? 'next' : 'prev')
  }

  toggleFlip(): void {
    this.flipCardService.toggleFlip()
  }

  formatIndex(i: number): string {
    return String(i).padStart(2, '0')
  }
}
