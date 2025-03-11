import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsApiComponent } from './skills-api.component';

describe('SkillsApiComponent', () => {
  let component: SkillsApiComponent;
  let fixture: ComponentFixture<SkillsApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
