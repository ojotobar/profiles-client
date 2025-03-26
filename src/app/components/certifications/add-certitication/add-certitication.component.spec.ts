import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCertiticationComponent } from './add-certitication.component';

describe('AddCertiticationComponent', () => {
  let component: AddCertiticationComponent;
  let fixture: ComponentFixture<AddCertiticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCertiticationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCertiticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
