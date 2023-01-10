import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiuntagiochiComponent } from './aggiuntagiochi.component';

describe('AggiuntagiochiComponent', () => {
  let component: AggiuntagiochiComponent;
  let fixture: ComponentFixture<AggiuntagiochiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiuntagiochiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggiuntagiochiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
