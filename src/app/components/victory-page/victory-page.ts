import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme-service/theme-service';

@Component({
  selector: 'app-victory-page',
  imports: [],
  templateUrl: './victory-page.html',
  styleUrl: './victory-page.css',
})
export class VictoryPage {
  constructor(public themeService: ThemeService, private router: Router) {

  }

  onBackToMain(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
    }
    this.router.navigate(['']);
  }
}
