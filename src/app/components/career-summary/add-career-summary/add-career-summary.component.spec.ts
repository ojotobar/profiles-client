import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCareerSummaryComponent } from './add-career-summary.component';

describe('AddCareerSummaryComponent', () => {
  let component: AddCareerSummaryComponent;
  let fixture: ComponentFixture<AddCareerSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCareerSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCareerSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
