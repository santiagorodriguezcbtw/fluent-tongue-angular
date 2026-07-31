import { Component, input } from '@angular/core';

@Component({
  selector: 'app-book-placeholder-icon',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <path d="M12 7v14" />
      <path d="M3 18a72 72 0 0 1 9-2 72 72 0 0 1 9 2V4a72 72 0 0 0-9 2 72 72 0 0 0-9-2z" />
    </svg>
  `
})
export class BookPlaceholderIcon {
  size = input<number | string>(16);
}
