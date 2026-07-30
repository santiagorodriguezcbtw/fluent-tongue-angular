import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-topic-not-found',
  standalone: true,
  template: `
    <section class="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-100">
      <h2 class="text-lg font-semibold">We couldn’t load this topic</h2>
      <p class="text-sm opacity-90">
        Something went wrong while retrieving data. Please refresh the page or try with a different
        topic.
      </p>

      @if (slug) {
        <p class="mt-2 text-xs opacity-75">Requested topic: "{{ slug }}"</p>
      }
    </section>
  `
})
export class TopicNotFoundComponent {
  @Input() slug: string | null = null;
}
