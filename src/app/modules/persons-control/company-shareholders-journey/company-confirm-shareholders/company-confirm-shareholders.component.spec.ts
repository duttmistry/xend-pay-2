import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyConfirmShareholdersComponent } from './company-confirm-shareholders.component';

describe('CompanyConfirmShareholdersComponent', () => {
  let component: CompanyConfirmShareholdersComponent;
  let fixture: ComponentFixture<CompanyConfirmShareholdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyConfirmShareholdersComponent]
    });
    fixture = TestBed.createComponent(CompanyConfirmShareholdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
