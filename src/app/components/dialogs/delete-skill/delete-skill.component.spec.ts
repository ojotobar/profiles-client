import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSkillComponent } from './delete-skill.component';

describe('DeleteSkillComponent', () => {
  let component: DeleteSkillComponent;
  let fixture: ComponentFixture<DeleteSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteSkillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
