import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceInputsFormComponent } from './device-inputs-form.component';

describe('DeviceInputsFormComponent', () => {
  let component: DeviceInputsFormComponent;
  let fixture: ComponentFixture<DeviceInputsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceInputsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceInputsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
