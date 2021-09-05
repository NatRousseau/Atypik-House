import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveByAdvertComponent } from './reserve-by-advert.component';

describe('ReserveByAdvertComponent', () => {
  let component: ReserveByAdvertComponent;
  let fixture: ComponentFixture<ReserveByAdvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveByAdvertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveByAdvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
