import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountHolderCompanyRoleComponent } from './account-holder-company-role.component';

describe('AccountHolderCompanyRoleComponent', () => {
  let component: AccountHolderCompanyRoleComponent;
  let fixture: ComponentFixture<AccountHolderCompanyRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountHolderCompanyRoleComponent]
    });
    fixture = TestBed.createComponent(AccountHolderCompanyRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
