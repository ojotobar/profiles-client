import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceApiComponent } from './experience-api.component';

describe('ExperienceApiComponent', () => {
  let component: ExperienceApiComponent;
  let fixture: ComponentFixture<ExperienceApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
