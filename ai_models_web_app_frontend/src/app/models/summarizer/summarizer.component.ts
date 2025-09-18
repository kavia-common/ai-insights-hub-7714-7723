import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModelService } from '../../services/model.service';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-summarizer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './summarizer.component.html',
  styleUrl: './summarizer.component.css'
})
export class SummarizerComponent {
  private model = inject(ModelService);

  // Internal signals to manage state
  private inputSig = signal<string>('');
  outputText = signal<string>('');
  loading = signal<boolean>(false);
  error = signal<string>('');

  // PUBLIC_INTERFACE
  /** Proxy bound to textarea via ngModel; updates the internal signal. */
  get inputText(): string {
    return this.inputSig();
  }
  set inputText(val: string) {
    this.inputSig.set(val ?? '');
  }

  /** Derived counters to avoid complex template expressions. */
  get charCount(): number {
    return (this.inputSig() ?? '').length;
  }
  get wordCount(): number {
    const t = (this.inputSig() ?? '').trim();
    return t ? t.split(/\s+/).length : 0;
  }

  // PUBLIC_INTERFACE
  /** Submit text to mocked summarizer. */
  summarize() {
    this.error.set('');
    const content = (this.inputSig() ?? '').trim();
    if (!content) {
      this.error.set('Please enter some text to summarize.');
      return;
    }
    this.loading.set(true);
    this.outputText.set('');
    this.model.summarizeText(content).subscribe({
      next: (res) => this.outputText.set(res),
      error: () => this.error.set('An error occurred while summarizing.'),
      complete: () => this.loading.set(false),
    });
  }

  // PUBLIC_INTERFACE
  /** Reset the form and outputs. */
  reset() {
    this.inputSig.set('');
    this.outputText.set('');
    this.error.set('');
  }
}
