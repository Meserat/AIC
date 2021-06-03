import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIcfgradeComponent } from './create-icfgrade.component';

describe('CreateIcfgradeComponent', () => {
  let component: CreateIcfgradeComponent;
  let fixture: ComponentFixture<CreateIcfgradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateIcfgradeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIcfgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
