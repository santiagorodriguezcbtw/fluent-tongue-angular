import { DestroyRef, Service, computed, inject, signal } from '@angular/core'
import { Subject, throttleTime } from 'rxjs'
import type { VocabularyItem } from '../core/models'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

export type CardNavigationDirection = 'next' | 'prev'
export interface CardNavigationRequest {
  direction: CardNavigationDirection
  token: number
}

@Service()
export class FlipCardService {
  private readonly destroyRef = inject(DestroyRef)
  private _isFlipped = signal(false)
  public isFlipped = this._isFlipped.asReadonly()
  private _vocabularyItems = signal<VocabularyItem[]>([])
  private _currentIndex = signal(0)
  private readonly navigateRequests$ = new Subject<CardNavigationDirection>()

  public vocabularyItems = this._vocabularyItems.asReadonly()
  public currentIndex = this._currentIndex.asReadonly()

  public total = computed(() => this._vocabularyItems().length)
  public currentTerm = computed(() => this._vocabularyItems()[this._currentIndex()] ?? null)
  public progress = computed(() => {
    const total = this.total()
    if (total === 0) return 0
    return ((this._currentIndex() + 1) / total) * 100
  })

  constructor() {
    this.navigateRequests$
      .pipe(throttleTime(250, undefined, { leading: true, trailing: true }), takeUntilDestroyed(this.destroyRef))
      .subscribe((direction) => this.applyNavigation(direction))
  }

  setVocabularyItems(items: VocabularyItem[]): void {
    this._vocabularyItems.set(items)
    this._currentIndex.set(0)
    this._isFlipped.set(false)
  }

  navigate(direction: CardNavigationDirection): void {
    this.navigateRequests$.next(direction)
  }

  private applyNavigation(direction: CardNavigationDirection): void {
    this._isFlipped.set(false)

    if (direction === 'next') {
      this._currentIndex.update((i) => Math.min(i + 1, this.total() - 1))
    }

    if (direction === 'prev') {
      this._currentIndex.update((i) => Math.max(i - 1, 0))
    }
  }

  toggleFlip(): void {
    this._isFlipped.update((value) => !value)
  }

  setFlipped(value: boolean): void {
    this._isFlipped.set(value)
  }
}
