import { Service, signal } from '@angular/core'

@Service()
export class FlipCardService {
  private _isFlipped = signal(false)
  public isFlipped = this._isFlipped.asReadonly()

  toggleFlip(): void {
    this._isFlipped.update((value) => !value)
  }

  setFlipped(value: boolean): void {
    this._isFlipped.set(value)
  }
}
