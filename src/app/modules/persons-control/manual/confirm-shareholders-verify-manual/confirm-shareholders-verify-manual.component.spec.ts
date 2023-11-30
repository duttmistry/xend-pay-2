import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmShareholdersVerifyManualComponent } from './confirm-shareholders-verify-manual.component';

describe('ConfirmShareholdersVerifyManualComponent', () => {
  let component: ConfirmShareholdersVerifyManualComponent;
  let fixture: ComponentFixture<ConfirmShareholdersVerifyManualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmShareholdersVerifyManualComponent]
    });
    fixture = TestBed.createComponent(ConfirmShareholdersVerifyManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
