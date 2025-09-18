export type ModelKind = 'chat' | 'summarizer';

export interface AiModelInfo {
  id: string;
  name: string;
  kind: ModelKind;
  description: string;
  icon: string;
}

export interface ChatRequest {
  prompt: string;
  temperature: number;
  system?: string;
}

export interface ChatResponse {
  output: string;
  tokensEstimated: number;
  model: string;
  latencyMs: number;
  timestamp: string;
}

export interface SummarizeRequest {
  text: string;
  ratio: number; // 0-1
}

export interface SummarizeResponse {
  summary: string;
  reducedBy: number; // %
  model: string;
  latencyMs: number;
  timestamp: string;
}
