import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationApiComponent } from './education-api.component';

describe('EducationApiComponent', () => {
  let component: EducationApiComponent;
  let fixture: ComponentFixture<EducationApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
