import { Component, inject } from '@angular/core';
import { CoreService } from '../../core/core.service';
import { Topic } from '../../core/models';

@Component({
  selector: 'app-topics.page',
  imports: [],
  templateUrl: './topics.page.html',
  styleUrl: './topics.page.css',
})
export class TopicsPage {
  private readonly coreService = inject(CoreService);

  protected readonly defaultTopicEmoji = '📘';
  protected readonly topics: Topic[] = this.coreService.loadTopics();
}
