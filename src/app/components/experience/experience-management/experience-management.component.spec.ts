import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceManagementComponent } from './experience-management.component';

describe('ExperienceManagementComponent', () => {
  let component: ExperienceManagementComponent;
  let fixture: ComponentFixture<ExperienceManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
