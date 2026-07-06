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
    let localTheme;

    if (this.isBrowser && typeof window !== 'undefined') {
      if (!window.sessionStorage.getItem('theme')) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        window.sessionStorage.setItem('theme', prefersDark ? 'dark' : 'light');
      }
      localTheme = window.sessionStorage.getItem('theme');
    }

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
      window.sessionStorage.setItem('theme', theme);
    }
  }

  toggleTheme() {
    this.setTheme(this.currentTheme() === 'dark' ? 'light' : 'dark');
  }
}
