import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  year = new Date().getFullYear();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // PUBLIC_INTERFACE
  toggleTheme(): void {
    /** This is a public function. Toggles a subtle theme between light and dark safely in browser only. */
    if (!isPlatformBrowser(this.platformId)) return;
    const d = (globalThis as any).document as any;
    if (!d) return;
    const root = d.documentElement as any;
    const getStyle = (globalThis as any).getComputedStyle as any;
    const current = getStyle ? getStyle(root).getPropertyValue('--bg').trim() : '#f9fafb';
    if (current === '#f9fafb') {
      root.style.setProperty('--bg', '#0b1220');
      root.style.setProperty('--surface', '#101826');
      root.style.setProperty('--text', '#e5e7eb');
      root.style.setProperty('--muted', '#9CA3AF');
      root.style.setProperty('--shadow', '0 10px 30px rgba(0,0,0,0.35)');
    } else {
      root.style.setProperty('--bg', '#f9fafb');
      root.style.setProperty('--surface', '#ffffff');
      root.style.setProperty('--text', '#111827');
      root.style.setProperty('--muted', '#6B7280');
      root.style.setProperty('--shadow', '0 10px 30px rgba(17, 24, 39, 0.06)');
    }
  }
}
