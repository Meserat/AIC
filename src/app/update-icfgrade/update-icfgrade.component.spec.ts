import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIcfgradeComponent } from './update-icfgrade.component';

describe('UpdateIcfgradeComponent', () => {
  let component: UpdateIcfgradeComponent;
  let fixture: ComponentFixture<UpdateIcfgradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateIcfgradeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateIcfgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
