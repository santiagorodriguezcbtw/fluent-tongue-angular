import { Component, computed, effect, ElementRef, inject, OnDestroy, viewChild } from '@angular/core'
import { Subject, debounceTime, takeUntil } from 'rxjs'
import { capitalizeFirstLetter } from '../../utils'
import { FlipCardService, type CardNavigationRequest } from '../../services/flip-card.service'

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
  private pendingDirection: CardNavigationRequest | null = null
  private activeNavigationRequest: CardNavigationRequest | null = null
  private lastHandledNavigationToken = 0
  isFlipped = this.flipCardService.isFlipped
  cardRef = viewChild<ElementRef<HTMLDivElement>>('cardContainer')

  private readonly cardAnimationEnd$ = new Subject<AnimationEvent>()
  private readonly destroy$ = new Subject<void>()

  constructor() {
    effect(() => {
      const request = this.flipCardService.navigationRequest()
      if (!request) return
      if (request.token <= this.lastHandledNavigationToken) return

      this.lastHandledNavigationToken = request.token
      this.handleNavigationRequest(request)
    })

    this.cardAnimationEnd$
      .pipe(debounceTime(80), takeUntil(this.destroy$))
      .subscribe((event) => this.handleCardAnimationEnd(event))
  }

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
      this.flipCardService.requestNavigation('next')
      return
    }

    if (event.key === 'ArrowLeft') {
      this.flipCardService.requestNavigation('prev')
    }
  }

  private handleNavigationRequest(request: CardNavigationRequest): void {
    if (this.isFlipped()) {
      this.pendingDirection = request
      this.flipCardService.setFlipped(false)
      return
    }

    this.triggerCardAnimation(request)
  }

  onFlipTransitionEnd(event: TransitionEvent): void {
    if (event.propertyName !== 'transform') return
    if (event.target !== event.currentTarget) return
    if (!this.pendingDirection) return

    const request = this.pendingDirection
    this.pendingDirection = null
    this.triggerCardAnimation(request)
  }

  triggerCardAnimation(request: CardNavigationRequest): void {
    this.activeNavigationRequest = request
    this.cardRef()?.nativeElement.classList.remove('card-entrance-desktop')
    this.cardRef()?.nativeElement.classList.add('card-exit-desktop')
    this.cardRef()?.nativeElement.setAttribute('data-direction', request.direction)
  }

  cardAnimationEnd(event: AnimationEvent): void {
    this.cardAnimationEnd$.next(event)
  }

  private handleCardAnimationEnd(event: AnimationEvent): void {
    const pattern = /card-exit-desktop/
    if (!pattern.test(event.animationName)) return

    const request = this.activeNavigationRequest
    if (!request) return

    this.flipCardService.setFlipped(false)
    this.flipCardService.completeNavigation(request)
    this.activeNavigationRequest = null

    this.cardRef()?.nativeElement.classList.remove('card-exit-desktop')
    this.cardRef()?.nativeElement.classList.add('card-entrance-desktop')
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
    this.cardAnimationEnd$.complete()
    this.flipCardService.setFlipped(false)
  }
}
