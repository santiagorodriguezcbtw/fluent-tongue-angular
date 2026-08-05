import { Component, inject, OnInit, signal } from '@angular/core'
import { FlipCard } from '../../components/flip-card/flip-card'
import { Topic } from '../../core/models'
import { CoreService } from '../../core/core.service'
import { ActivatedRoute, Router } from '@angular/router'
import { BookOpenIcon, BookPlaceholderIcon, ChevronLeftIcon, ChevronRightIcon, ZapIcon } from '../../components/icons'
import { FlipCardService } from '../../services/flip-card.service'
import { Header } from '../../components/header/header'
import { ViewportScroller } from '@angular/common'

@Component({
  selector: 'app-study-flash-page',
  templateUrl: './study-flash.page.html',
  styleUrls: ['./study-flash.page.css'],
  imports: [FlipCard, ChevronLeftIcon, ChevronRightIcon, BookOpenIcon, ZapIcon, BookPlaceholderIcon, Header],
})
export class StudyFlashPage implements OnInit {
  coreService = inject(CoreService)
  readonly route = inject(ActivatedRoute)
  readonly router = inject(Router)
  protected readonly flipCardService = inject(FlipCardService)

  readonly currentIndex = this.flipCardService.currentIndex
  readonly total = this.flipCardService.total
  readonly currentTerm = this.flipCardService.currentTerm
  readonly progress = this.flipCardService.progress
  isFlipped = this.flipCardService.isFlipped

  readonly isError = signal('')
  readonly vocabTopic = signal<Topic | null>(null)
  private viewportScroller = inject(ViewportScroller)

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const slugUrlParam = params.get('slug')
      if (!slugUrlParam) {
        const errorMessage = 'No slug parameter found in the route.'
        console.error(errorMessage)
        this.isError.set(errorMessage)
        return
      }

      const vocabTopic = this.coreService.getTopicBySlug(slugUrlParam)
      this.vocabTopic.set(vocabTopic ?? null)

      const vocabularyItems = this.coreService.getVocabularyItemsBySlug(slugUrlParam)

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
    this.viewportScroller.scrollToPosition([0, 0])
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
