import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

// PUBLIC_INTERFACE
@Injectable({ providedIn: 'root' })
export class ModelService {
  /** This service mocks model invocations and defines clear integration points for future API connections. */

  // PUBLIC_INTERFACE
  /**
   * Summarize text using a placeholder model.
   * @param text The input text to summarize.
   * @returns Observable emitting a mock summary string.
   */
  summarizeText(text: string): Observable<string> {
    const wordCount = text.trim().split(/\s+/).length;
    const preview = text.slice(0, 140).replace(/\s+/g, ' ').trim();
    const mock = `Summary (${Math.max(1, Math.min(3, Math.round(wordCount / 75)))} sentences): ${preview}${text.length > 140 ? '…' : ''}`;
    // Simulate network latency
    return of(mock).pipe(delay(600));
  }

  // PUBLIC_INTERFACE
  /**
   * Caption an image using a placeholder model.
   * @param file The image file to caption.
   * @returns Observable emitting a mock caption string.
   */
  captionImage(file: File): Observable<string> {
    const sizeKB = Math.round(file.size / 1024);
    const mock = `A high-quality image likely showing a subject with clear focus and natural lighting (mock). File ~${sizeKB}KB.`;
    return of(mock).pipe(delay(800));
  }

  // PUBLIC_INTERFACE
  /**
   * Integration hook example for future HTTP API.
   * Replace with real HttpClient call:
   *   return this.http.post<{summary:string}>(`${env.API_BASE}/summarize`, { text }).pipe(map(r => r.summary));
   */
  placeholderIntegrationNote(): string {
    return 'Replace ModelService methods with real HttpClient calls when the backend is ready.';
  }
}
