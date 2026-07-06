import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme-service/theme-service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-start-page',
  imports: [],
  templateUrl: './start-page.html',
  styleUrl: './start-page.css'
})
export class StartPage {
  constructor(public themeService: ThemeService, private router: Router) { }
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
    const startField = document.querySelector('#startField') as HTMLInputElement | null;
    const maxOnline = document.querySelector('#online') as HTMLSelectElement | null;

    if (startField) {
      window.sessionStorage.setItem('startField', startField.value);
    }

    if (maxOnline) {
      const selectedValue = maxOnline.options[maxOnline.selectedIndex]?.value ?? Number.MAX_SAFE_INTEGER;
      window.sessionStorage.setItem('maxOnline', selectedValue);
    }

    this.router.navigate(['/game']);
  }
}
