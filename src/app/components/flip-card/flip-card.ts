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

  constructor() {
    let isFirstRun = true
    effect(() => {
      this.flipCardService.currentIndex()
      if (isFirstRun) {
        isFirstRun = false
        return
      }
      console.log('Current index changed, triggering card swap animation')
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
    this.cardRef()?.nativeElement.classList.remove('card-swap-desktop')
    setTimeout(() => this.cardRef()?.nativeElement.classList.add('card-swap-desktop'), 0)
  }

  ngOnDestroy(): void {
    this.flipCardService.setFlipped(false)
  }
}
