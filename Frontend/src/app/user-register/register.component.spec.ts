import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IregisterComponent } from './register.component';

describe('IregisterComponent', () => {
  let component: IregisterComponent;
  let fixture: ComponentFixture<IregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IregisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
