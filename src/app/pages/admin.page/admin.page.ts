import { Component, inject } from '@angular/core';
import { CoreService } from '../../core/core.service';
import { Topic } from '../../core/models';

@Component({
  selector: 'app-admin.page',
  imports: [],
  templateUrl: './admin.page.html',
  styleUrl: './admin.page.css',
})
export class AdminPage {
  private readonly coreService = inject(CoreService);

  protected readonly defaultTopicEmoji = '📘';
  protected readonly topics: Topic[] = this.coreService.loadTopics();
}
