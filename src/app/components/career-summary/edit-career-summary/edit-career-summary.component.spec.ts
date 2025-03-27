import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCareerSummaryComponent } from './edit-career-summary.component';

describe('EditCareerSummaryComponent', () => {
  let component: EditCareerSummaryComponent;
  let fixture: ComponentFixture<EditCareerSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCareerSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCareerSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
