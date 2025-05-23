import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRoleComponent } from './update-role.component';

describe('UpdateRoleComponent', () => {
  let component: UpdateRoleComponent;
  let fixture: ComponentFixture<UpdateRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateRoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
