import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsidizedComponent } from './subsidized.component';

describe('SubsidizedComponent', () => {
  let component: SubsidizedComponent;
  let fixture: ComponentFixture<SubsidizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubsidizedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubsidizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
