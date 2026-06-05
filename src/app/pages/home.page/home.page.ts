import { Component } from '@angular/core';

@Component({
  selector: 'app-home.page',
  imports: [],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage {
  topics = [
    { id: '1', name: 'Travel', emoji: '✈️', count: 48 },
    { id: '2', name: 'Food', emoji: '🍜', count: 36 },
    { id: '3', name: 'Work', emoji: '💼', count: 29 },
    { id: '4', name: 'Daily Life', emoji: '🏡', count: 54 },
  ];
}
