import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // PUBLIC_INTERFACE
  /** Returns current active segment for menu highlighting. */
  activeSegment = '';

  private router = inject(Router);

  constructor() {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        const seg = (e.urlAfterRedirects || e.url).split('?')[0].split('/').filter(Boolean)[0];
        this.activeSegment = seg || 'summarizer';
      }
    });
  }

  // PUBLIC_INTERFACE
  /** Navigate to a route segment. */
  go(segment: string) {
    this.router.navigate(['/', segment]);
  }

  // PUBLIC_INTERFACE
  /** Open docs placeholder. */
  openDocs() {
    window.alert('Docs placeholder: Add links to model/API docs here.');
  }

  // PUBLIC_INTERFACE
  /** Start a new session by reloading current route (placeholder state reset). */
  newSession() {
    const current = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([current]);
    });
  }
}
