import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AiModelsService } from '../../services/ai-models.service';
import { ResultCardComponent } from '../../ui/result-card.component';
import { SectionHeaderComponent } from '../../ui/section-header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summarizer',
  standalone: true,
  imports: [CommonModule, FormsModule, ResultCardComponent, SectionHeaderComponent],
  template: `
    <app-section-header icon="📝" title="Text Summarizer" subtitle="Condense content into key points (simulated)"></app-section-header>

    <div class="grid">
      <form class="card form" (ngSubmit)="submit()">
        <div class="field">
          <label for="text">Text</label>
          <textarea id="text" [(ngModel)]="text" name="text" rows="10" placeholder="Paste or type your text here..." required></textarea>
        </div>

        <div class="row">
          <div class="field">
            <label for="ratio">Summary Ratio</label>
            <input id="ratio" type="range" min="0.1" max="0.9" step="0.1" [(ngModel)]="ratio" name="ratio">
            <div class="hint">{{ratio | number:'1.1-1'}} of original</div>
          </div>
        </div>

        <div class="actions">
          <button class="primary" type="submit" [disabled]="loading">Summarize</button>
          <button class="ghost" type="button" (click)="reset()" [disabled]="loading">Reset</button>
        </div>
      </form>

      <app-result-card [text]="resultText" [meta]="resultMeta"></app-result-card>
    </div>
  `,
  styles: [`
    .grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
    .form{padding:14px}
    .field{display:grid;gap:8px;margin-bottom:12px}
    textarea{
      border:1px solid rgba(17,24,39,0.12);border-radius:12px;padding:10px;background:#fff;transition:box-shadow .2s,border-color .2s
    }
    textarea:focus{outline:none;border-color:#2563EB;box-shadow:0 0 0 4px rgba(37,99,235,.12)}
    .row{display:grid;grid-template-columns:240px;gap:12px}
    .actions{display:flex;gap:10px}
    .primary{background:#2563EB;color:#fff;border:0;border-radius:12px;padding:10px 14px;font-weight:700;cursor:pointer}
    .primary:hover{box-shadow:0 8px 16px rgba(37,99,235,.25)}
    .ghost{background:transparent;border:1px solid rgba(17,24,39,0.12);border-radius:12px;padding:10px 14px;cursor:pointer}
    @media(max-width:980px){.grid{grid-template-columns:1fr}}
  `]
})
export class SummarizerComponent {
  text = '';
  ratio = 0.4;
  loading = false;

  resultText = '';
  resultMeta?: { model: string; latencyMs: number; timestamp: string };

  constructor(private ai: AiModelsService) {}

  // PUBLIC_INTERFACE
  submit(): void {
    /** This is a public function. Sends text to the simulated summarizer. */
    if (!this.text?.trim()) return;
    this.loading = true;
    this.resultText = '';
    this.resultMeta = undefined;

    this.ai.summarize({ text: this.text, ratio: this.ratio })
      .subscribe(res => {
        this.resultText = res.summary;
        this.resultMeta = { model: res.model, latencyMs: res.latencyMs, timestamp: res.timestamp };
        this.loading = false;
      });
  }

  // PUBLIC_INTERFACE
  reset(): void {
    /** This is a public function. Resets the form and results. */
    this.text = '';
    this.ratio = 0.4;
    this.resultText = '';
    this.resultMeta = undefined;
  }
}
