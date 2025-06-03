import { Component, inject } from '@angular/core';
import { VersionService } from '../../../services/version.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  version: string = '';
  versionService = inject(VersionService);
  
  ngOnInit(): void {
    this.versionService.version$.subscribe({
      next: (v) => this.version = v,
      error: () => this.version = '',
    });
  }
}
