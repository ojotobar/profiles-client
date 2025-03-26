import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationsApiComponent } from './certifications-api.component';

describe('CertificationsApiComponent', () => {
  let component: CertificationsApiComponent;
  let fixture: ComponentFixture<CertificationsApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificationsApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificationsApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
