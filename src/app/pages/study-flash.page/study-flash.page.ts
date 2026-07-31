import { Component, computed, inject, signal } from '@angular/core';
import { FlipCard } from '../../components/flip-card/flip-card';
import { Topic, VocabularyItem } from '../../core/models';
import { CoreService } from '../../core/core.service';
import { ActivatedRoute } from '@angular/router';
import {
  BookOpenIcon,
  BookPlaceholderIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ZapIcon
} from '../../components/icons';
import { FlipCardService } from '../../services/flip-card.service';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-study-flash-page',
  templateUrl: './study-flash.page.html',
  styleUrls: ['./study-flash.page.css'],
  imports: [
    FlipCard,
    ChevronLeftIcon,
    ChevronRightIcon,
    BookOpenIcon,
    ZapIcon,
    BookPlaceholderIcon,
    Footer,
    Header
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
  readonly vocabTopic = signal<Topic | null>(null);

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

      const vocabTopic = this.coreService.getTopicBySlug(slugUrlParam);
      this.vocabTopic.set(vocabTopic ?? null);

      const vocabularyItems = this.coreService.getVocabularyItemsBySlug(slugUrlParam);

      if (!vocabularyItems || vocabularyItems.length === 0) {
        const errorMessage = 'No vocabulary items found for the given slug.';
        console.error(errorMessage);
        this.isError.set(errorMessage);
        return;
      }

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
