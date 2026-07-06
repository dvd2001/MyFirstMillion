import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme-service/theme-service';
import { DataReadingService } from '../../services/data-reading-service/data-reading-service';
import { Router } from '@angular/router';
import { Field } from '../../models/Field';

@Component({
  selector: 'app-game-page',
  imports: [],
  templateUrl: './game-page.html',
  styleUrl: './game-page.css',
})
export class GamePage implements OnInit {
  private fields: Field[] = [];
  private startField: number = 0;
  private maxOnline: number = 0;
  constructor(private themeService: ThemeService, private router: Router, private reader: DataReadingService) {
    if (typeof window !== 'undefined') {
      const start = window.sessionStorage.getItem('startField');
      const online = window.sessionStorage.getItem('maxOnline');
      if (start) {
        this.startField = parseInt(start);
      }
      if (online) {
        this.maxOnline = parseInt(online);
      }
    }
  }
  ngOnInit(): void {
    this.fields = this.reader.readingFields();
  }
  onBack(): void {
    this.router.navigate(['']);
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem('startField');
      window.sessionStorage.removeItem('maxOnline');
    }
  }
}
