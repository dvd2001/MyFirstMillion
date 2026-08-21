import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme-service/theme-service';

@Component({
  selector: 'app-victory-page',
  imports: [],
  templateUrl: './victory-page.html',
  styleUrl: './victory-page.css',
})
export class VictoryPage {
  constructor(private themeService: ThemeService) {

  }
}
