import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCareerSummaryComponent } from './delete-career-summary.component';

describe('DeleteCareerSummaryComponent', () => {
  let component: DeleteCareerSummaryComponent;
  let fixture: ComponentFixture<DeleteCareerSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCareerSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCareerSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
