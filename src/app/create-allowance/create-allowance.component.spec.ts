import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAllowanceComponent } from './create-allowance.component';

describe('CreateAllowanceComponent', () => {
  let component: CreateAllowanceComponent;
  let fixture: ComponentFixture<CreateAllowanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAllowanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
