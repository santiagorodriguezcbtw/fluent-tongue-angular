import { Component, computed, effect, ElementRef, inject, OnDestroy, viewChild } from '@angular/core'
import { capitalizeFirstLetter } from '../../utils'
import { FlipCardService } from '../../services/flip-card.service'

@Component({
  selector: 'app-flip-card',
  imports: [],
  templateUrl: './flip-card.html',
  styleUrls: ['./flip-card.css'],
})
export class FlipCard implements OnDestroy {
  protected readonly flipCardService = inject(FlipCardService)
  readonly termCapitalized = computed(() => capitalizeFirstLetter(this.flipCardService.currentTerm()?.term ?? ''))
  readonly definitionCapitalized = computed(() =>
    capitalizeFirstLetter(this.flipCardService.currentTerm()?.definition ?? ''),
  )
  private cardSwapAnimationFrameId: number | null = null

  constructor() {
    let isFirstRun = true
    effect(() => {
      this.flipCardService.currentIndex()
      if (isFirstRun) {
        isFirstRun = false
        return
      }
      this.triggerCardSwapAnimation()
    })
  }

  isFlipped = this.flipCardService.isFlipped
  cardRef = viewChild<ElementRef<HTMLDivElement>>('cardContainer')

  toggleFlip(): void {
    this.flipCardService.toggleFlip()
  }

  onCardKeydown(event: KeyboardEvent): void {
    event.preventDefault()
    if (event.key === 'Enter' || event.key === ' ') {
      this.toggleFlip()
      return
    }
    if (event.key === 'ArrowRight') {
      this.flipCardService.navigate('next')
      return
    }
    if (event.key === 'ArrowLeft') {
      this.flipCardService.navigate('prev')
    }
  }

  triggerCardSwapAnimation(): void {
    const cardElement = this.cardRef()?.nativeElement
    if (!cardElement) {
      return
    }

    cardElement.classList.remove('card-swap-desktop')

    if (this.cardSwapAnimationFrameId !== null) {
      cancelAnimationFrame(this.cardSwapAnimationFrameId)
    }

    this.cardSwapAnimationFrameId = requestAnimationFrame(() => {
      cardElement.classList.add('card-swap-desktop')
      this.cardSwapAnimationFrameId = null
    })
  }

  ngOnDestroy(): void {
    if (this.cardSwapAnimationFrameId !== null) {
      cancelAnimationFrame(this.cardSwapAnimationFrameId)
    }
    this.flipCardService.setFlipped(false)
  }
}
