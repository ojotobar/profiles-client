import { Component, inject, OnInit } from '@angular/core';
import { VersionService } from '../../../services/version.service';
import { AppNameComponent } from '../app-name/app-name.component';
import { SocialsComponent } from '../socials/socials.component';

@Component({
  selector: 'app-footer',
  imports: [AppNameComponent, SocialsComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();
  version: string = '';
  versionService = inject(VersionService);
  
  ngOnInit(): void {
    this.versionService.version$.subscribe({
      next: (v) => this.version = v,
      error: () => this.version = 'Dev Version',
    });
  }
}
