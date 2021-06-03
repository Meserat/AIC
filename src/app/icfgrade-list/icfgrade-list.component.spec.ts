import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcfgradeListComponent } from './icfgrade-list.component';

describe('IcfgradeListComponent', () => {
  let component: IcfgradeListComponent;
  let fixture: ComponentFixture<IcfgradeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcfgradeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcfgradeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
