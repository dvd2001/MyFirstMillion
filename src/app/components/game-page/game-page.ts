import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme-service/theme-service';

@Component({
  selector: 'app-game-page',
  imports: [],
  templateUrl: './game-page.html',
  styleUrl: './game-page.css',
})
export class GamePage {
  constructor(themeService: ThemeService) { }
}
