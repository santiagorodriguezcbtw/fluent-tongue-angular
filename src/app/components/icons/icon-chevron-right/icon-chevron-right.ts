import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon-chevron-right',
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
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-chevron-right"
    >
      <path d="m9 18 6-6-6-6"></path>
    </svg>
  `
})
export class IconChevronRightIcon {
  size = input<number | string>(16);
}
