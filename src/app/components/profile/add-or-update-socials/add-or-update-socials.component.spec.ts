import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateSocialsComponent } from './add-or-update-socials.component';

describe('AddOrUpdateSocialsComponent', () => {
  let component: AddOrUpdateSocialsComponent;
  let fixture: ComponentFixture<AddOrUpdateSocialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrUpdateSocialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrUpdateSocialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
