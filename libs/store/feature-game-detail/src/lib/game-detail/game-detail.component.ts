import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { formatRating } from '@bg-hoard/store/util-formatters';
import { Game } from '@bg-hoard/util-interface';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'bg-hoard-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.less'],
})
export class GameDetailComponent {
  httpClient = inject(HttpClient);

  game$ = inject(ActivatedRoute).paramMap.pipe(
    map((params: ParamMap) => params.get('id')),
    switchMap((id) => this.httpClient.get<Game>(`/api/games/${id}`))
  );

  formatRating = formatRating;
}
