import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme-service/theme-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-page',
  imports: [],
  templateUrl: './game-page.html',
  styleUrl: './game-page.css',
})
export class GamePage {
  constructor(private themeService: ThemeService, private router: Router) { }
  onBack(): void {
    window.sessionStorage.removeItem('startField');
    window.sessionStorage.removeItem('maxOnline');
    this.router.navigate(['']);
  }
}
