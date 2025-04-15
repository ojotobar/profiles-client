import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqsManagementComponent } from './faqs-management.component';

describe('FaqsManagementComponent', () => {
  let component: FaqsManagementComponent;
  let fixture: ComponentFixture<FaqsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqsManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
