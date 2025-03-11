import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsApiComponent } from './projects-api.component';

describe('ProjectsApiComponent', () => {
  let component: ProjectsApiComponent;
  let fixture: ComponentFixture<ProjectsApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
