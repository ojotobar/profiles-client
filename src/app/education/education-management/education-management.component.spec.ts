import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationManagementComponent } from './education-management.component';

describe('EducationManagementComponent', () => {
  let component: EducationManagementComponent;
  let fixture: ComponentFixture<EducationManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
