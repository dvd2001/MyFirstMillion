import { Injectable, Inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme = signal<Theme>('light');
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    const localTheme = this.isBrowser && typeof window !== 'undefined'
      ? window.localStorage.getItem('theme') ?? 'light'
      : 'light';

    this.currentTheme.set(localTheme === 'dark' ? 'dark' : 'light');

    if (this.isBrowser && typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', this.currentTheme());
    }
  }

  getTheme() {
    return this.currentTheme;
  }

  setTheme(theme: Theme) {
    this.currentTheme.set(theme);

    if (this.isBrowser && typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }

    if (this.isBrowser && typeof window !== 'undefined') {
      window.localStorage.setItem('theme', theme);
    }
  }

  toggleTheme() {
    this.setTheme(this.currentTheme() === 'dark' ? 'light' : 'dark');
  }
}
