import { Component, computed, effect, inject, OnDestroy, signal, untracked } from '@angular/core'
import { FlipCardService } from '../../services/flip-card.service'

@Component({
  selector: 'app-flip-card',
  imports: [],
  templateUrl: './flip-card.html',
  styleUrls: ['./flip-card.css'],
})
export class FlipCard implements OnDestroy {
  protected readonly flipCardService = inject(FlipCardService)
  readonly termCapitalized = signal(this.flipCardService.currentTerm()?.term ?? '')
  readonly definitionCapitalized = signal(this.flipCardService.currentTerm()?.definition ?? '')
  phase = signal<'idle' | 'card-entrance-desktop' | 'card-exit-desktop'>('idle')
  isFlipped = computed(() => this.flipCardService.isFlipped())

  constructor() {
    let isFirstRun = true
    effect(() => {
      this.flipCardService.currentIndex()
      if (isFirstRun) {
        isFirstRun = false
        return
      }
      const phase = untracked(() => this.phase())

      if (phase !== 'idle') return // prevent overlap
      this.phase.set('card-exit-desktop')
    })
  }

  toggleFlip(): void {
    this.flipCardService.toggleFlip()
  }

  onAnimEnd(): void {
    if (this.phase() === 'card-exit-desktop') {
      this.phase.set('card-entrance-desktop')
      this.termCapitalized.set(this.flipCardService.currentTerm()?.term ?? '')
      this.definitionCapitalized.set(this.flipCardService.currentTerm()?.definition ?? '')
    } else if (this.phase() === 'card-entrance-desktop') {
      this.phase.set('idle')
    }
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

  ngOnDestroy(): void {
    this.flipCardService.setFlipped(false)
  }
}
