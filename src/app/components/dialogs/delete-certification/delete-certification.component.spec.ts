import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCertificationComponent } from './delete-certification.component';

describe('DeleteCertificationComponent', () => {
  let component: DeleteCertificationComponent;
  let fixture: ComponentFixture<DeleteCertificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCertificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
