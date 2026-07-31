import { Component, computed, inject, input, output } from '@angular/core';
import type { VocabularyItem } from '../../core/models';
import { capitalizeFirstLetter } from '../../utils';
import { FlipCardService } from '../../services/flip-card.service';

@Component({
  selector: 'app-flip-card',
  imports: [],
  templateUrl: './flip-card.html',
  styleUrl: './flip-card.css'
})
export class FlipCard {
  protected readonly flipCardService = inject(FlipCardService);
  isFlipped = this.flipCardService.isFlipped;

  vocabularyItem = input<VocabularyItem>();
  categoryItem = input<string>();
  goNext = output<void>();
  goPrev = output<void>();

  readonly termCapitalized = computed(() =>
    capitalizeFirstLetter(this.vocabularyItem()?.term ?? '')
  );

  readonly definitionCapitalized = computed(() =>
    capitalizeFirstLetter(this.vocabularyItem()?.definition ?? '')
  );

  toggleFlip(): void {
    this.flipCardService.toggleFlip();
  }

  onCardKeydown(event: KeyboardEvent): void {
    event.preventDefault();
    if (event.key === 'Enter' || event.key === ' ') {
      this.toggleFlip();
    }
    if (event.key === 'ArrowRight') {
      this.flipCardService.setFlipped(false);
      this.goNext.emit();
    }
    if (event.key === 'ArrowLeft') {
      this.flipCardService.setFlipped(false);
      this.goPrev.emit();
    }
  }
}
