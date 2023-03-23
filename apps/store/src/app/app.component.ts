import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject } from '@angular/core';
import { formatRating } from '@bg-hoard/store/util-formatters';
import { Game } from '@bg-hoard/util-interface';

@Component({
  selector: 'bg-hoard-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Board Game Hoard';
  games = inject(HttpClient).get<Game[]>(`${this.baseUrl}/api/games`);
  formatRating = formatRating;
  constructor(@Inject('baseUrl') private baseUrl: string) {
    console.log('component constructed');
  }
}
