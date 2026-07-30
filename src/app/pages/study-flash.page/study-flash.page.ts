import { Component, computed, signal } from '@angular/core';

interface DeckCard {
  id: number;
  front: string;
  category: string;
  back: string;
  phonetic: string;
  examples: string[];
  notes: string;
}

@Component({
  selector: 'app-study-flash-page',
  templateUrl: './study-flash.page.html',
  styleUrls: ['./study-flash.page.css']
})
export class StudyFlashPage {
  readonly deck: DeckCard[] = [
    {
      id: 1,
      front: 'Ephemeral',
      category: 'Vocabulary',
      back: 'Lasting for a very short time; transitory.',
      phonetic: '/ɪˈfem.ər.əl/',
      examples: [
        'The beauty of cherry blossoms is ephemeral — they bloom for only two weeks each year.',
        'Social media trends are often ephemeral, disappearing as quickly as they appear.'
      ],
      notes:
        'From Greek ephemeros (lasting only a day). Often used in philosophy and literature to describe the fleeting nature of life and experience.'
    },
    {
      id: 2,
      front: 'Sonder',
      category: 'Neologism',
      back: 'The realization that each passerby has a life as vivid and complex as your own.',
      phonetic: '/ˈsɒn.dər/',
      examples: [
        'Watching the city from the café window, she felt a deep sonder wash over her.',
        'Sonder is that strange feeling you get on a crowded subway platform.'
      ],
      notes:
        'Coined by John Koenig in The Dictionary of Obscure Sorrows (2012). Not yet in mainstream dictionaries but widely adopted online.'
    },
    {
      id: 3,
      front: 'Liminal',
      category: 'Vocabulary',
      back: 'Occupying a position at, or on both sides of, a boundary or threshold.',
      phonetic: '/ˈlɪm.ɪ.nəl/',
      examples: [
        'Dawn and dusk are liminal moments — neither fully night nor fully day.',
        'The airport lounge exists as a liminal space between departure and arrival.'
      ],
      notes:
        'From Latin limen (threshold). Popularized in anthropology by Arnold van Gennep to describe transitional phases in rites of passage.'
    },
    {
      id: 4,
      front: 'Petrichor',
      category: 'Science',
      back: 'The pleasant earthy smell produced when rain falls on dry soil.',
      phonetic: '/ˈpet.rɪ.kɔːr/',
      examples: [
        'After months of drought, the petrichor that rose from the earth after the first rain was overwhelming.',
        'She opened the window to let in the petrichor carried by the summer storm.'
      ],
      notes:
        'Coined in 1964 by Australian scientists Bear and Thomas. From Greek petra (stone) + ichor (the fluid that flows in the veins of gods in Greek mythology).'
    },
    {
      id: 5,
      front: 'Apocryphal',
      category: 'Vocabulary',
      back: 'Of doubtful authenticity, although widely circulated as being true.',
      phonetic: '/əˈpɒk.rɪ.fəl/',
      examples: [
        'The story of Newton discovering gravity when an apple hit his head is likely apocryphal.',
        'Many apocryphal tales surround the founding of Rome.'
      ],
      notes:
        'Originally referred to texts excluded from the biblical canon. Now used broadly for any story of questionable origin but popular currency.'
    }
  ];

  readonly total = this.deck.length;

  readonly currentIndex = signal(0);
  readonly isFlipped = signal(false);
  readonly direction = signal(1);
  readonly currentCard = computed(() => this.deck[this.currentIndex()]);
  readonly progress = computed(() => ((this.currentIndex() + 1) / this.total) * 100);

  toggleFlip(): void {
    this.isFlipped.update((v) => !v);
  }

  goNext(): void {
    if (this.currentIndex() < this.total - 1) {
      this.direction.set(1);
      this.isFlipped.set(false);
      setTimeout(() => this.currentIndex.update((i) => i + 1), 150);
    }
  }

  goPrev(): void {
    if (this.currentIndex() > 0) {
      this.direction.set(-1);
      this.isFlipped.set(false);
      setTimeout(() => this.currentIndex.update((i) => i - 1), 150);
    }
  }

  onCardKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleFlip();
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.goNext();
    }
  }

  formatIndex(i: number): string {
    return String(i).padStart(2, '0');
  }
}
