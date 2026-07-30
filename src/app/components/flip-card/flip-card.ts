import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-flip-card',
  imports: [],
  templateUrl: './flip-card.html',
  styleUrl: './flip-card.css',
})
export class FlipCard {
  isFlipped = signal(false);

  turnOver() {
    this.isFlipped.set(!this.isFlipped());
  }
}
