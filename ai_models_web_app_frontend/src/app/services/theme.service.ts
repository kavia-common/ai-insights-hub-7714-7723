/**
 * ThemeService centralizes style guide values and exposes helpers.
 */
export class ThemeService {
  // PUBLIC_INTERFACE
  getPalette() {
    /** This is a public function. Returns the Ocean Professional palette. */
    return {
      name: 'Ocean Professional',
      primary: '#2563EB',
      secondary: '#F59E0B',
      success: '#F59E0B',
      error: '#EF4444',
      background: '#f9fafb',
      surface: '#ffffff',
      text: '#111827',
    };
  }

  // PUBLIC_INTERFACE
  applySurfaceGlow(el: HTMLElement | null) {
    /** This is a public function. Adds a subtle glow for user feedback. */
    if (!el) return;
    el.style.boxShadow = '0 8px 22px rgba(37,99,235,.18)';
    const st = (globalThis as any).setTimeout as ((h: any, t?: number)=>any) | undefined;
    if (st) {
      st(() => { el.style.boxShadow = ''; }, 250);
    }
  }
}
