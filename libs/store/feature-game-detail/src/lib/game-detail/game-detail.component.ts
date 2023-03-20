import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'bg-hoard-game-detail',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.less'],
})
export class GameDetailComponent {
  gameId$ = inject(ActivatedRoute).paramMap.pipe(
    map((params: ParamMap) => params.get('id'))
  );
}
