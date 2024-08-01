import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricedComponent } from './priced.component';

describe('PricedComponent', () => {
  let component: PricedComponent;
  let fixture: ComponentFixture<PricedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PricedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
