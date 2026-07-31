import { Component, computed, inject, signal } from '@angular/core';
import { FlipCard } from '../../components/flip-card/flip-card';
import { VocabularyItem } from '../../core/models';
import { CoreService } from '../../core/core.service';
import { ActivatedRoute } from '@angular/router';
import {
  IconBookOpenIcon,
  IconBookPlaceholderIcon,
  IconChevronLeftIcon,
  IconChevronRightIcon,
  IconZapIcon
} from '../../components/icons';
import { FlipCardService } from '../../services/flip-card.service';

@Component({
  selector: 'app-study-flash-page',
  templateUrl: './study-flash.page.html',
  styleUrls: ['./study-flash.page.css'],
  imports: [
    FlipCard,
    IconChevronLeftIcon,
    IconChevronRightIcon,
    IconBookOpenIcon,
    IconZapIcon,
    IconBookPlaceholderIcon
  ]
})
export class StudyFlashPage {
  coreService = inject(CoreService);
  readonly route = inject(ActivatedRoute);
  readonly total = computed(() => this.vocabularyItems().length);
  readonly currentIndex = signal(0);
  protected readonly flipCardService = inject(FlipCardService);
  readonly currentTerm = computed(() => this.vocabularyItems()[this.currentIndex()] ?? null);
  readonly progress = computed(() => ((this.currentIndex() + 1) / this.total()) * 100);

  readonly isError = signal('');
  readonly vocabularyItems = signal<VocabularyItem[]>([]);

  isFlipped = this.flipCardService.isFlipped;

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const slugUrlParam = params.get('slug');

      if (!slugUrlParam) {
        const errorMessage = 'No slug parameter found in the route.';
        console.error(errorMessage);
        this.isError.set(errorMessage);
        return;
      }

      const vocabularyItems = this.coreService.getVocabularyItemsBySlug(slugUrlParam);
      this.vocabularyItems.set(vocabularyItems);
    });
  }

  goNext(): void {
    if (this.currentIndex() < this.total() - 1) {
      this.flipCardService.setFlipped(false);
      this.currentIndex.update((i) => i + 1);
    }
  }

  goPrev(): void {
    if (this.currentIndex() > 0) {
      this.flipCardService.setFlipped(false);
      this.currentIndex.update((i) => i - 1);
    }
  }

  toggleFlip(): void {
    this.flipCardService.toggleFlip();
  }

  formatIndex(i: number): string {
    return String(i).padStart(2, '0');
  }
}
