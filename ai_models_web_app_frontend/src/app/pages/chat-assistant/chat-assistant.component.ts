import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AiModelsService } from '../../services/ai-models.service';
import { ResultCardComponent } from '../../ui/result-card.component';
import { SectionHeaderComponent } from '../../ui/section-header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule, ResultCardComponent, SectionHeaderComponent],
  template: `
    <app-section-header icon="💬" title="Chat Assistant" subtitle="Conversational AI (simulated)"></app-section-header>

    <div class="grid">
      <form class="card form" (ngSubmit)="submit()" #formRef="ngForm">
        <div class="field">
          <label for="prompt">Prompt</label>
          <textarea id="prompt" name="prompt" [(ngModel)]="prompt" rows="6" placeholder="Ask anything..." required></textarea>
        </div>

        <div class="row">
          <div class="field">
            <label for="temperature">Temperature</label>
            <input id="temperature" type="range" min="0" max="1" step="0.1" [(ngModel)]="temperature" name="temperature">
            <div class="hint">{{temperature}}</div>
          </div>
          <div class="field">
            <label for="system">System Prompt (optional)</label>
            <input id="system" type="text" [(ngModel)]="system" name="system" placeholder="e.g., You are concise.">
          </div>
        </div>

        <div class="actions">
          <button type="submit" class="primary" [disabled]="loading">Send</button>
          <button type="button" class="ghost" (click)="reset()" [disabled]="loading">Reset</button>
        </div>
      </form>

      <app-result-card [text]="resultText" [meta]="resultMeta"></app-result-card>
    </div>
  `,
  styles: [`
    .grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
    .form{padding:14px}
    .field{display:grid;gap:8px;margin-bottom:12px}
    label{font-weight:700}
    textarea,input[type="text"]{
      border:1px solid rgba(17,24,39,0.12);border-radius:12px;padding:10px;background:#fff;transition:box-shadow .2s,border-color .2s
    }
    textarea:focus,input[type="text"]:focus{outline:none;border-color:#2563EB;box-shadow:0 0 0 4px rgba(37,99,235,.12)}
    .row{display:grid;grid-template-columns:200px 1fr;gap:12px}
    .actions{display:flex;gap:10px}
    .primary{background:#2563EB;color:#fff;border:0;border-radius:12px;padding:10px 14px;font-weight:700;cursor:pointer}
    .primary:hover{box-shadow:0 8px 16px rgba(37,99,235,.25)}
    .ghost{background:transparent;border:1px solid rgba(17,24,39,0.12);border-radius:12px;padding:10px 14px;cursor:pointer}
    @media(max-width:980px){.grid{grid-template-columns:1fr}}
  `]
})
export class ChatAssistantComponent {
  prompt = '';
  system = '';
  temperature = 0.7;
  loading = false;

  resultText = '';
  resultMeta?: { model: string; latencyMs: number; timestamp: string };

  constructor(private ai: AiModelsService) {}

  // PUBLIC_INTERFACE
  submit(): void {
    /** This is a public function. Sends the prompt to the simulated chat model. */
    if (!this.prompt?.trim()) return;
    this.loading = true;
    this.resultText = '';
    this.resultMeta = undefined;

    this.ai.chat({ prompt: this.prompt, system: this.system, temperature: this.temperature })
      .subscribe(res => {
        this.resultText = res.output;
        this.resultMeta = { model: res.model, latencyMs: res.latencyMs, timestamp: res.timestamp };
        this.loading = false;
      });
  }

  // PUBLIC_INTERFACE
  reset(): void {
    /** This is a public function. Resets the form and results. */
    this.prompt = '';
    this.system = '';
    this.temperature = 0.7;
    this.resultText = '';
    this.resultMeta = undefined;
  }
}
