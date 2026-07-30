import { Component, signal } from '@angular/core';
import { CoreService } from '../../core/core.service';
import type { Topic } from '../../core/models';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home.page',
  imports: [RouterLink],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage {
  topics = signal<Topic[]>([]);

  constructor(private coreService: CoreService) {
    this.topics.set(this.coreService.getTopics());
  }
}
