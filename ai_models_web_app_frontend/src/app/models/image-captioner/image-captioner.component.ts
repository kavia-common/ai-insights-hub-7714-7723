import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelService } from '../../services/model.service';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-image-captioner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-captioner.component.html',
  styleUrl: './image-captioner.component.css'
})
export class ImageCaptionerComponent {
  private model = inject(ModelService);

  file = signal<File | null>(null);
  previewUrl = signal<string>('');
  caption = signal<string>('');
  loading = signal<boolean>(false);
  error = signal<string>('');

  // PUBLIC_INTERFACE
  /** Handle file input and create a preview URL. */
  onFileChange(ev: Event) {
    this.error.set('');
    const input = ev.target as HTMLInputElement;
    if (!input || !input.files || input.files.length === 0) {
      this.file.set(null);
      this.previewUrl.set('');
      return;
    }
    const f = input.files[0] as File;
    if (!f.type || !f.type.startsWith('image/')) {
      this.error.set('Please select a valid image file.');
      return;
    }
    this.file.set(f);
    this.caption.set('');
    const reader = new FileReader();
    reader.onload = () => this.previewUrl.set(reader.result as string);
    reader.readAsDataURL(f);
  }

  // PUBLIC_INTERFACE
  /** Run mock captioning. */
  runCaption() {
    this.error.set('');
    const f = this.file();
    if (!f) {
      this.error.set('Please choose an image first.');
      return;
    }
    this.loading.set(true);
    this.caption.set('');
    this.model.captionImage(f).subscribe({
      next: (res) => this.caption.set(res),
      error: () => this.error.set('An error occurred while generating a caption.'),
      complete: () => this.loading.set(false),
    });
  }

  // PUBLIC_INTERFACE
  /** Reset all state. */
  reset() {
    this.file.set(null);
    this.previewUrl.set('');
    this.caption.set('');
    this.error.set('');
  }
}
