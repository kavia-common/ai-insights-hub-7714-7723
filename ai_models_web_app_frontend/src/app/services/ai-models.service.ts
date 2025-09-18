import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { AiModelInfo, ChatRequest, ChatResponse, SummarizeRequest, SummarizeResponse } from '../models/ai-model';

@Injectable({ providedIn: 'root' })
export class AiModelsService {
  private models: AiModelInfo[] = [
    {
      id: 'chat-assistant',
      name: 'Chat Assistant',
      kind: 'chat',
      description: 'Conversational AI for Q&A, brainstorming, and guidance.',
      icon: '💬',
    },
    {
      id: 'text-summarizer',
      name: 'Text Summarizer',
      kind: 'summarizer',
      description: 'Summarizes long texts into concise highlights.',
      icon: '📝',
    },
  ];

  // PUBLIC_INTERFACE
  listModels(): Observable<AiModelInfo[]> {
    /** This is a public function. Returns available AI models (simulated). */
    return of(this.models).pipe(delay(150));
  }

  // PUBLIC_INTERFACE
  chat(req: ChatRequest): Observable<ChatResponse> {
    /** This is a public function. Simulates a chat model response. */
    const latency = 400 + Math.floor(Math.random() * 800);
    const tokens = Math.floor((req.prompt?.length || 40) / 3) + 30;
    const output = `Simulated response (temp=${req.temperature}): ${req.prompt ? 'You said: ' + req.prompt : 'Hello! Ask me anything.'}`;
    const res: ChatResponse = {
      output,
      tokensEstimated: tokens,
      model: 'Chat-Assistant v0',
      latencyMs: latency,
      timestamp: new Date().toISOString(),
    };
    return of(res).pipe(delay(latency));
  }

  // PUBLIC_INTERFACE
  summarize(req: SummarizeRequest): Observable<SummarizeResponse> {
    /** This is a public function. Simulates a text summarization response. */
    const latency = 500 + Math.floor(Math.random() * 900);
    const words = (req.text || '').split(/\s+/).filter(Boolean);
    const keep = Math.max(10, Math.floor(words.length * Math.max(0.1, Math.min(1, req.ratio))));
    const summary = words.slice(0, keep).join(' ') + (words.length > keep ? '…' : '');
    const reducedBy = words.length ? Math.round((1 - keep / words.length) * 100) : 0;
    const res: SummarizeResponse = {
      summary: summary || 'No text provided.',
      reducedBy,
      model: 'Summarizer v0',
      latencyMs: latency,
      timestamp: new Date().toISOString(),
    };
    return of(res).pipe(delay(latency));
  }
}
