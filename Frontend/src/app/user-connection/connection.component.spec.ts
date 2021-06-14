import { ComponentFixture, TestBed } from '@angular/core/testing';

import { connectionComponent } from './connection.component';

describe('connectionComponent', () => {
  let component: connectionComponent;
  let fixture: ComponentFixture<connectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ connectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(connectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
