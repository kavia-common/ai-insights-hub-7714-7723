import { Component } from '@angular/core';
import { SectionHeaderComponent } from '../../ui/section-header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  template: `
    <app-section-header icon="ℹ️" title="About" subtitle="Project details and theme"></app-section-header>
    <div class="card" style="padding:14px">
      <p>This frontend demonstrates a modern Angular app following the "Ocean Professional" style:</p>
      <ul>
        <li>Primary: #2563EB (ocean blue)</li>
        <li>Secondary/Success: #F59E0B (amber accent)</li>
        <li>Error: #EF4444</li>
        <li>Background: #f9fafb, Surface: #ffffff, Text: #111827</li>
      </ul>
      <p>Includes top navigation, model sidebar, interactive forms, and results.</p>
    </div>
  `
})
export class AboutComponent {}
