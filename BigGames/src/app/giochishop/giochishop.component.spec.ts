import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiochishopComponent } from './giochishop.component';

describe('GiochishopComponent', () => {
  let component: GiochishopComponent;
  let fixture: ComponentFixture<GiochishopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiochishopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiochishopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
