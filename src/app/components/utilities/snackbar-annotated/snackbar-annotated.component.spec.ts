import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarAnnotatedComponent } from './snackbar-annotated.component';

describe('SnackbarAnnotatedComponent', () => {
  let component: SnackbarAnnotatedComponent;
  let fixture: ComponentFixture<SnackbarAnnotatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackbarAnnotatedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnackbarAnnotatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
