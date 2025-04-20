import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFaqsComponent } from './delete-faqs.component';

describe('DeleteFaqsComponent', () => {
  let component: DeleteFaqsComponent;
  let fixture: ComponentFixture<DeleteFaqsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteFaqsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteFaqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
