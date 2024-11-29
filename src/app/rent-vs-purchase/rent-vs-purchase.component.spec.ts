import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentVsPurchaseComponent } from './rent-vs-purchase.component';

describe('RentVsPurchaseComponent', () => {
  let component: RentVsPurchaseComponent;
  let fixture: ComponentFixture<RentVsPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentVsPurchaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentVsPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
