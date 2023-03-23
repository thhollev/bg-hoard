import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { formatRating } from '@bg-hoard/store/util-formatters';
import { Game } from '@bg-hoard/util-interface';

@Component({
  selector: 'bg-hoard-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Board Game Hoard';
  games = inject(HttpClient).get<Game[]>('/api/games');
  formatRating = formatRating;
  constructor() {
    console.log('component constructed');
  }
}
