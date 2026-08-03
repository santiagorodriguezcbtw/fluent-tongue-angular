import { Service, computed, signal } from '@angular/core'
import type { VocabularyItem } from '../core/models'

export type CardNavigationDirection = 'next' | 'prev'
export interface CardNavigationRequest {
  direction: CardNavigationDirection
  token: number
}

@Service()
export class FlipCardService {
  private _isFlipped = signal(false)
  public isFlipped = this._isFlipped.asReadonly()

  private navigationToken = 0
  private _navigationRequest = signal<CardNavigationRequest | null>(null)
  public navigationRequest = this._navigationRequest.asReadonly()

  private _navigationCompleted = signal<CardNavigationRequest | null>(null)
  public navigationCompleted = this._navigationCompleted.asReadonly()

  private _vocabularyItems = signal<VocabularyItem[]>([])
  private _currentIndex = signal(0)

  public vocabularyItems = this._vocabularyItems.asReadonly()
  public currentIndex = this._currentIndex.asReadonly()
  public total = computed(() => this._vocabularyItems().length)
  public currentTerm = computed(() => this._vocabularyItems()[this._currentIndex()] ?? null)
  public progress = computed(() => {
    const total = this.total()
    if (total === 0) return 0
    return ((this._currentIndex() + 1) / total) * 100
  })

  private canNavigate(direction: CardNavigationDirection): boolean {
    if (direction === 'next') return this._currentIndex() < this.total() - 1
    return this._currentIndex() > 0
  }

  setVocabularyItems(items: VocabularyItem[]): void {
    this._vocabularyItems.set(items)
    this._currentIndex.set(0)
    this._isFlipped.set(false)
    this._navigationRequest.set(null)
    this._navigationCompleted.set(null)
  }

  requestNavigation(direction: CardNavigationDirection): void {
    if (!this.canNavigate(direction)) return

    this.navigationToken += 1
    this._navigationRequest.set({ direction, token: this.navigationToken })
  }

  completeNavigation(request: CardNavigationRequest): void {
    if (request.direction === 'next' && this.canNavigate('next')) {
      this._currentIndex.update((i) => i + 1)
    }

    if (request.direction === 'prev' && this.canNavigate('prev')) {
      this._currentIndex.update((i) => i - 1)
    }

    this._navigationCompleted.set(request)
  }

  toggleFlip(): void {
    this._isFlipped.update((value) => !value)
  }

  setFlipped(value: boolean): void {
    this._isFlipped.set(value)
  }
}
