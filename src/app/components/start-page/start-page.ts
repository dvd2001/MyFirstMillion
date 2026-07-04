import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme-service/theme-service';

@Component({
  selector: 'app-start-page',
  imports: [],
  templateUrl: './start-page.html',
  styleUrl: './start-page.css'
})
export class StartPage implements OnInit {
  constructor(public themeService: ThemeService) { }
  ngOnInit(): void { }
  starFieldDown(): void {
    const startField = document.querySelector('#startField') as HTMLInputElement;
    if (startField) {
      switch (startField.value) {
        case '1': startField.value = '6';
          break;
        case '2': startField.value = '1';
          break;
        case '3': startField.value = '2';
          break;
        case '4': startField.value = '3';
          break;
        case '5': startField.value = '4';
          break;
        case '6': startField.value = '5';
          break;
        default: startField.value = '1';
          break;
      }
    }
  }
  startFieldUp(): void {
    const startField = document.querySelector('#startField') as HTMLInputElement;
    if (startField) {
      switch (startField.value) {
        case '1': startField.value = '2';
          break;
        case '2': startField.value = '3';
          break;
        case '3': startField.value = '4';
          break;
        case '4': startField.value = '5';
          break;
        case '5': startField.value = '6';
          break;
        case '6': startField.value = '1';
          break;
        default: startField.value = '1';
          break;
      }
    }
  }
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
  onSubmit(): void {
    console.log('submit');
  }
}
