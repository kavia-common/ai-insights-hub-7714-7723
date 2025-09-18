import { Routes } from '@angular/router';
import { SummarizerComponent } from './models/summarizer/summarizer.component';
import { ImageCaptionerComponent } from './models/image-captioner/image-captioner.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'summarizer' },
  { path: 'summarizer', component: SummarizerComponent, title: 'Text Summarizer' },
  { path: 'image-captioner', component: ImageCaptionerComponent, title: 'Image Captioner' },
  { path: 'about', component: AboutComponent, title: 'About' },
  { path: '**', redirectTo: 'summarizer' }
];
