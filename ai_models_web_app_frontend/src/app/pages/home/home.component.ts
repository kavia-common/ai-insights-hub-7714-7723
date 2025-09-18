import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '../../ui/section-header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionHeaderComponent],
  template: `
    <app-section-header icon="🌊" title="Welcome" subtitle="Explore AI models with a modern, ocean-inspired interface"></app-section-header>

    <div class="grid">
      <a routerLink="/chat" class="card link">
        <div class="icon">💬</div>
        <div>
          <h3>Chat Assistant</h3>
          <p>Interactive chat for Q&A and ideation.</p>
        </div>
      </a>

      <a routerLink="/summarizer" class="card link">
        <div class="icon">📝</div>
        <div>
          <h3>Text Summarizer</h3>
          <p>Condense long texts into key points.</p>
        </div>
      </a>
    </div>
  `,
  styles: [`
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px}
    .link{padding:16px;border-radius:14px;border:1px solid rgba(17,24,39,0.06);text-decoration:none;color:#111827;background:linear-gradient(180deg,#fff,#fafbff);display:flex;gap:12px;align-items:flex-start;transition:all .2s ease}
    .link:hover{border-color:#2563EB;box-shadow:0 8px 22px rgba(37,99,235,.18);transform:translateY(-2px)}
    .icon{font-size:22px;line-height:1}
    h3{margin:0 0 6px}
    p{margin:0;color:#6B7280}
  `]
})
export class HomeComponent {}
