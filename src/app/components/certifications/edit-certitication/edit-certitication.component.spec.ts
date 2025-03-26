import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCertiticationComponent } from './edit-certitication.component';

describe('EditCertiticationComponent', () => {
  let component: EditCertiticationComponent;
  let fixture: ComponentFixture<EditCertiticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCertiticationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCertiticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
