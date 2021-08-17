import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAnnoucementComponent } from './new-annoucement.component';

describe('NewAnnoucementComponent', () => {
  let component: NewAnnoucementComponent;
  let fixture: ComponentFixture<NewAnnoucementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAnnoucementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAnnoucementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
