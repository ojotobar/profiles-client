import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFaqsComponent } from './update-faqs.component';

describe('UpdateFaqsComponent', () => {
  let component: UpdateFaqsComponent;
  let fixture: ComponentFixture<UpdateFaqsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateFaqsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFaqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
