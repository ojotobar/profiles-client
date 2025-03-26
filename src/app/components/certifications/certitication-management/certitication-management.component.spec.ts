import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertiticationManagementComponent } from './certitication-management.component';

describe('CertiticationManagementComponent', () => {
  let component: CertiticationManagementComponent;
  let fixture: ComponentFixture<CertiticationManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertiticationManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertiticationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
