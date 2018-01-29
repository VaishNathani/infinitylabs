import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfacesDialogComponent } from './interfaces-dialog.component';

describe('InterfacesDialogComponent', () => {
  let component: InterfacesDialogComponent;
  let fixture: ComponentFixture<InterfacesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterfacesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfacesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
