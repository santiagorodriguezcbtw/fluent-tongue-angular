import { Component } from '@angular/core';

@Component({
  selector: 'app-home.page',
  imports: [],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage {
  topics = [
    { name: 'Travel', emoji: '✈️', count: 48 },
    { name: 'Food', emoji: '🍜', count: 36 },
    { name: 'Work', emoji: '💼', count: 29 },
    { name: 'Daily Life', emoji: '🏡', count: 54 },
  ];
}
