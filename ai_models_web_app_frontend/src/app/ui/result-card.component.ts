import { Component, Input, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-result-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card result" #card>
      <div class="header">
        <strong>Result</strong>
        <button class="copy" (click)="copy()">
          Copy
        </button>
      </div>
      <pre>{{text || 'No output yet.'}}</pre>
      <div class="meta" *ngIf="meta as m">
        <span>Model: {{m.model}}</span>
        <span>Latency: {{m.latencyMs}}ms</span>
        <span>At: {{m.timestamp | date:'short'}}</span>
      </div>
    </div>
  `,
  styles: [`
    .result{padding:14px;border-radius:14px;background:#fff;border:1px solid rgba(17,24,39,0.06)}
    .header{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
    .copy{background:#2563EB;color:#fff;border:0;border-radius:999px;padding:6px 10px;cursor:pointer;font-weight:600}
    .copy:hover{box-shadow:0 8px 16px rgba(37,99,235,.25)}
    pre{white-space:pre-wrap;word-wrap:break-word;margin:0;color:#111827;font-size:14px;line-height:1.5}
    .meta{display:flex;gap:10px;color:#6B7280;font-size:12px;margin-top:10px;flex-wrap:wrap}
  `],
  providers: [ThemeService, DatePipe]
})
export class ResultCardComponent {
  @Input() text = '';
  @Input() meta?: { model: string; latencyMs: number; timestamp: string };

  @ViewChild('card') card?: ElementRef;

  constructor(private theme: ThemeService, @Inject(PLATFORM_ID) private platformId: Object) {}

  // PUBLIC_INTERFACE
  copy(): void {
    /** This is a public function. Copies the result text to clipboard and shows a glow (browser only). */
    if (!this.text) return;
    const nav = (globalThis as any).navigator as any;
    if (isPlatformBrowser(this.platformId) && nav?.clipboard) {
      nav.clipboard.writeText(this.text);
    }
    this.theme.applySurfaceGlow((this.card?.nativeElement as HTMLElement) || null);
  }
}
