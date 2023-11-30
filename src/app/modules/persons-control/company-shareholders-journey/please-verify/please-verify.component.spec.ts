import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PleaseVerifyComponent } from './please-verify.component';

describe('PleaseVerifyComponent', () => {
  let component: PleaseVerifyComponent;
  let fixture: ComponentFixture<PleaseVerifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PleaseVerifyComponent]
    });
    fixture = TestBed.createComponent(PleaseVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
