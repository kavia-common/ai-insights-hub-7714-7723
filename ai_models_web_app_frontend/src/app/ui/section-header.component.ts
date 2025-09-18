import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  standalone: true,
  template: `
    <div class="section-header">
      <div class="badge">{{icon}}</div>
      <div class="meta">
        <h2>{{title}}</h2>
        <p>{{subtitle}}</p>
      </div>
    </div>
  `,
  styles: [`
    .section-header{
      display:flex;align-items:center;gap:12px;margin-bottom:14px;
      border-bottom:1px solid rgba(17,24,39,0.06);padding-bottom:12px;
    }
    .badge{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;
      background:linear-gradient(135deg,rgba(37,99,235,.12),rgba(245,158,11,.10));border:1px solid rgba(17,24,39,0.08);}
    .meta h2{margin:0;font-size:18px;}
    .meta p{margin:2px 0 0;color:#6B7280;font-size:13px;}
  `]
})
export class SectionHeaderComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() icon = '✨';
}
