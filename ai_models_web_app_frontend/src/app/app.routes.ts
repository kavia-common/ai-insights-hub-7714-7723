import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ChatAssistantComponent } from './pages/chat-assistant/chat-assistant.component';
import { SummarizerComponent } from './pages/summarizer/summarizer.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'AI Models Hub - Home' },
  { path: 'chat', component: ChatAssistantComponent, title: 'AI Models Hub - Chat Assistant' },
  { path: 'summarizer', component: SummarizerComponent, title: 'AI Models Hub - Text Summarizer' },
  { path: 'about', component: AboutComponent, title: 'About - AI Models Hub' },
  { path: '**', redirectTo: '' }
];
