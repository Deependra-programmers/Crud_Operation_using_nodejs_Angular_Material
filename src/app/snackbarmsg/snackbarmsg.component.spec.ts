import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarmsgComponent } from './snackbarmsg.component';

describe('SnackbarmsgComponent', () => {
  let component: SnackbarmsgComponent;
  let fixture: ComponentFixture<SnackbarmsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackbarmsgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnackbarmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
