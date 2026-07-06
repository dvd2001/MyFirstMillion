import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme-service/theme-service';
import { DataReadingSercive } from '../../services/data-reading-service/data-reading-sercive';
import { Router } from '@angular/router';
import { Field } from '../../models/Field';

@Component({
  selector: 'app-game-page',
  imports: [],
  providers: [DataReadingSercive],
  templateUrl: './game-page.html',
  styleUrl: './game-page.css',
})
export class GamePage implements OnInit {
  private fields: Field[] = [];
  constructor(private themeService: ThemeService, private router: Router, private reader: DataReadingSercive) { }
  ngOnInit(): void {
    this.fields = this.reader.readingFields();
  }
  onBack(): void {
    window.sessionStorage.removeItem('startField');
    window.sessionStorage.removeItem('maxOnline');
    this.router.navigate(['']);
  }
}
