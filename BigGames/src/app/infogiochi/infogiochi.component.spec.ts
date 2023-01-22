import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfogiochiComponent } from './infogiochi.component';

describe('InfogiochiComponent', () => {
  let component: InfogiochiComponent;
  let fixture: ComponentFixture<InfogiochiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfogiochiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfogiochiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
