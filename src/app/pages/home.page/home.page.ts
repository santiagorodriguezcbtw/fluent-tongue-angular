import { Component, signal, inject } from '@angular/core';
import { CoreService } from '../../core/core.service';
import type { Topic } from '../../core/models';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home.page',
  imports: [RouterLink],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css'
})
export class HomePage {
  topics = signal<Topic[]>([]);
  readonly coreService = inject(CoreService);

  constructor() {
    this.topics.set(this.coreService.getTopics());
  }
}
