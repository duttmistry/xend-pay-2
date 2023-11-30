import { findIndex } from 'rxjs';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { STORAGE_CONSTANTS } from 'src/app/core/Services/common/constants';
import { LISTOFUSERS } from 'src/app/core/Services/common/perons-of-control-static-data';
import { AUTHORIZED_SIGNATORY } from 'src/app/core/Services/common/person-of-control-authority-signatory';
import { SHAREHOLDERS } from 'src/app/core/Services/common/person-of-control-stackholders';
import { StorageService } from 'src/app/core/Services/common/storage.service';

@Component({
  selector: 'app-account-holder-company-role',
  templateUrl: './account-holder-company-role.component.html',
  styleUrls: ['./account-holder-company-role.component.scss']
})
export class AccountHolderCompanyRoleComponent {
  accountHolderCompanyRoleForm: FormGroup;
  sectionData: any[] = [];
  person_of_control_data: any = {}
  business_details_data: any = {}
  get_Phase_Data: any = {}
  kybData: any = {};
  isDirectorsList = false
  isShareholderList = false
  isAuthorizedSignatoryList = false
  directorsList: any = LISTOFUSERS
  shareholderList: any = SHAREHOLDERS
  common_directorsList: any = LISTOFUSERS
  common_shareholderList: any = SHAREHOLDERS
  authorizedSignatoryList = AUTHORIZED_SIGNATORY

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private storageService: StorageService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.accountHolderCompanyRoleForm = this.fb.group({
      company_role: [[], Validators.required],
      select_directors: [""],
      select_shareholers: [""],
      select_authority_signatory: [""],
    });
    this.get_person_of_control_data()
    // this.setFormData();
  }
  ngOnInit() { }


  get_person_of_control_data() {
    const person_of_control_data: any = this.storageService.getFromLocalStorage(STORAGE_CONSTANTS.PERSON_OF_CONTROL_PAGES)
    if (person_of_control_data) {
      this.person_of_control_data = JSON.parse(person_of_control_data) ? JSON.parse(person_of_control_data) : this.person_of_control_data;
      console.log('this.person_of_control_data: ', this.person_of_control_data);
      if (this.person_of_control_data?.account_holding_data) {
      }
    }
  }

  get formControls() {
    return this.accountHolderCompanyRoleForm.controls;
  }

  company_role = [
    {
      id: 1,
      role: 'Director',
      selected: false,
      disabled: false,
    },
    {
      id: 2,
      role: 'Shareholder',
      selected: false,
      disabled: false,
    },
    {
      id: 3,
      role: 'Authorised Signatory',
      selected: false,
      disabled: false,
    },
  ];
  next() {
    if (this.accountHolderCompanyRoleForm.valid) {
      console.log('this.accountHolderCompanyRoleForm: ', this.accountHolderCompanyRoleForm.value);
      if (this.person_of_control_data) {
        this.storageService.setIntoLocalStorage(
          STORAGE_CONSTANTS.PERSON_OF_CONTROL_PAGES,
          JSON.stringify({
            ...this.person_of_control_data,
            account_holding_company_role: this.accountHolderCompanyRoleForm.value,
            account_holding_data: {
              ...this.person_of_control_data?.account_holding_data,
            },
            account_holder_flow: false
          })
        );
      }
      const isDirectors = this.accountHolderCompanyRoleForm?.value?.company_role.includes("Director")
      const isShareholders = this.accountHolderCompanyRoleForm?.value?.company_role.includes("Shareholder")
      const isAuthorizedSignatory = this.accountHolderCompanyRoleForm?.value?.company_role.includes("Authorised Signatory")
      ///directors Data Add
      if (isShareholders && isDirectors) {
        const directorsList = [
          ...LISTOFUSERS
        ]
        const firstName = this.accountHolderCompanyRoleForm?.value?.select_directors?.firstName
        console.log('firstName: ', firstName);
        const lastName = this.accountHolderCompanyRoleForm?.value?.select_directors?.lastName
        console.log('lastName: ', lastName);
        directorsList?.map((item: any) => {
          if (item.firstName == firstName && item.lastName == lastName) {
            item.isAccountHolder = true
            item.verificationStatus = "Verified"
          } else {
            item.isAccountHolder = false
            item.verificationStatus = "Please verify"
          }
        })
        const shareholdersList = [
          ...SHAREHOLDERS
        ]
        const firstName_shareholder = this.accountHolderCompanyRoleForm?.value?.select_shareholers?.firstName
        console.log('firstName_shareholder: ', firstName_shareholder);
        const lastName_shareholder = this.accountHolderCompanyRoleForm?.value?.select_shareholers?.lastName
        console.log('lastName_shareholder: ', lastName_shareholder);
        shareholdersList?.map((item: any) => {
          if (item.firstName == firstName_shareholder && item.lastName == lastName_shareholder) {
            item.isAccountHolder = true
            item.verificationStatus = "Verified"
          } else {
            item.isAccountHolder = false
            item.verificationStatus = "Please verify"
          }
        })
        this.storageService.setIntoLocalStorage(
          STORAGE_CONSTANTS.SHAREHOLDERS_LIST,
          JSON.stringify(
            shareholdersList
          )
        );
        this.storageService.setIntoLocalStorage(
          STORAGE_CONSTANTS.DIRECTORS_LIST,
          JSON.stringify(
            directorsList
          )
        );
      }

      else if (isShareholders) {
        const shareholdersList = [
          ...SHAREHOLDERS
        ]
        const id = this.accountHolderCompanyRoleForm.value.select_shareholers.id
        console.log('shareholdersList: ', shareholdersList);
        shareholdersList?.map((item: any) => {
          if (item.id == id) {
            item.isAccountHolder = true
            item.verificationStatus = "Verified"
          } else {
            item.isAccountHolder = false
            item.verificationStatus = "Please verify"
          }
        })
        console.log('shareholdersList: ', shareholdersList);
        this.storageService.setIntoLocalStorage(
          STORAGE_CONSTANTS.SHAREHOLDERS_LIST,
          JSON.stringify(
            shareholdersList
          )
        );
      } else if (isDirectors) {

        const directorsList = [
          ...LISTOFUSERS
        ]
        const id = this.accountHolderCompanyRoleForm.value.select_directors.id
        console.log('directorsList: ', directorsList);
        directorsList?.map((item: any) => {
          if (item.id == id) {
            item.isAccountHolder = true
            item.verificationStatus = "Verified"
          } else {
            item.isAccountHolder = false
            item.verificationStatus = "Please verify"
          }
        })
        this.storageService.setIntoLocalStorage(
          STORAGE_CONSTANTS.DIRECTORS_LIST,
          JSON.stringify(
            directorsList
          )
        );
      }
      this.router.navigate(['/persons-of-control/account-holder-details'])
    }
  }
  setFormData() {
    const temp: any = this.storageService.getFromLocalStorage(
      STORAGE_CONSTANTS.KYB_DATA
    );
    const formValues = JSON.parse(temp);
    // console.log('%c  formValues:', 'color: #0e93e0;background: #aaefe5;', formValues);
    // console.log('%c  formValues:', 'color: #0e93e0;background: #aaefe5;', JSON.parse(formValues));

    if (formValues) {
      this.accountHolderCompanyRoleForm.patchValue(formValues?.about_your_business);
    } else {
      this.accountHolderCompanyRoleForm.setValue({
        company_role: [],
      });
    }
  }
  Checked(item: any, type: any) {
    if (!this.isDisabled(item)) {
      if (type == "company_role") {
        if (item.selected == false) {
          this.company_role?.find((element: any) => {
            if (element.id == item.id) {
              element.selected = true;
            }
          })
        }
        else {
          this.company_role?.find((element: any) => {
            if (element.id == item.id) {
              element.selected = false;
            }
          })
        }
      } else if (type == "company_role") {
        if (item.selected == false) {
          this.company_role?.find((element: any) => {
            if (element.id == item.id) {
              element.selected = true;
            }
          })
        }
        else {
          this.company_role?.find((element: any) => {
            if (element.id == item.id) {
              element.selected = false;
            }
          })
        }
      }
    }
  }
  CheckItems(item: any, type: any) {
    if (type == "company_role") {
      const roles = this.accountHolderCompanyRoleForm.value.company_role
      if (roles.length > 0 && roles.find((role: any) => role == item?.role)) {
        return true
      } else {
        return false
      }
    } else if (type == "company_role") {
      const countries = this.accountHolderCompanyRoleForm.value.company_role
      if (countries.length > 0 && countries.find((country: any) => country == item.country)) {
        return true
      } else {
        return false
      }
    } return false
  }
  onChange(event: any) {
    console.log('event: ', event);
    const roles = this.accountHolderCompanyRoleForm.value.company_role
    const filteredEvents = event.filter((item: any) => roles.some((role: any) => item.role.includes(role)));
    // console.log('filteredEvents: ', filteredEvents);
    const hasDirector = filteredEvents.some((item: any) => item.role.includes("Director"));
    const hasShareholder = filteredEvents.some((item: any) => item.role.includes("Shareholder"));
    const hasAuthoritySignatory = filteredEvents.some((item: any) => item.role.includes("Authorised Signatory"));
    // console.log('hasDirector: ', hasDirector);
    // console.log('this.accountHolderCompanyRoleForm.value: ', this.accountHolderCompanyRoleForm.value);
    if (filteredEvents.length > 0 && hasDirector) {
      this.isDirectorsList = true;
      this.common_directorsList = this.directorsList;
    } else {
      this.isDirectorsList = false;
      this.accountHolderCompanyRoleForm.patchValue({
        select_directors: ''
      })
    }
    if (filteredEvents.length > 0 && hasShareholder) {
      this.isShareholderList = true;
      this.common_shareholderList = this.shareholderList;
    } else {
      this.isShareholderList = false;
      this.accountHolderCompanyRoleForm.patchValue({
        select_shareholers: ''
      })
    }
    if (hasDirector && hasShareholder) {
      this.isDirectorsList = true;
      this.isShareholderList = true;
      const commonObjects = this.directorsList.filter((obj1: any) =>
        this.shareholderList.some((obj2: any) => obj1.firstName == obj2.firstName && obj1.lastName == obj2.lastName)
      );
      this.common_directorsList = this.directorsList.filter((obj1: any) =>
        commonObjects.some((obj2: any) => obj1.firstName == obj2.firstName && obj1.lastName == obj2.lastName)
      );
      this.common_shareholderList = this.shareholderList.filter((obj1: any) =>
        commonObjects.some((obj2: any) => obj1.firstName == obj2.firstName && obj1.lastName == obj2.lastName)
      );
      // this.directorsList = commonObjects
      // this.shareholderList = commonObjects
    }
    // if (filteredEvents.length > 0 && hasAuthoritySignatory) {
    //   this.isAuthorizedSignatoryList = true;
    // } else {
    //   this.isAuthorizedSignatoryList = false;
    //   this.accountHolderCompanyRoleForm.patchValue({
    //     select_authority_signatory: ''
    //   })
    // }

    ////Disabled Code 
    if ((hasDirector || hasShareholder) || (hasDirector && hasShareholder)) {
      this.company_role?.map((item: any) => {
        if (item.role == "Authorised Signatory") {
          item.disabled = true;
        }
      })
      this.company_role = [...this.company_role];
    } else if (hasAuthoritySignatory) {
      this.company_role?.map((item: any) => {
        if (item.role == "Director" || item.role == "Shareholder") {
          item.disabled = true;
        }
      })
      this.company_role = [...this.company_role];
    } else {
      this.company_role?.map((item: any) => {
        item.disabled = false;
      })
      this.company_role = [...this.company_role];
    }


  }
  selectItem(item: any, type: any) {
    const isDirectors = this.accountHolderCompanyRoleForm?.value?.company_role.includes("Director")
    const isShareholders = this.accountHolderCompanyRoleForm?.value?.company_role.includes("Shareholder")
    if (isDirectors && isShareholders) {
      this.accountHolderCompanyRoleForm.patchValue({
        select_directors: {
          ...item,
          isAccountHolder: true
        }
      })
      this.accountHolderCompanyRoleForm.patchValue({
        select_shareholers: {
          ...item,
          isAccountHolder: true
        }
      })
      console.log('type: ', type);
      if (type == "Directors") {
        this.directorsList.map((element: any) => {
          if (element.firstName == item.firstName && element.lastName == item.lastName) {
            element.checked = true
          } else {
            element.checked = false
          }
        })
        this.shareholderList.map((element: any) => {
          if (element.firstName == item.firstName && element.lastName == item.lastName) {
            element.checked = true
          } else {
            element.checked = false
          }
        })
        // console.log('this.shareholderList: ', this.shareholderList);
        // console.log('this.directorsList: ', this.directorsList);
      }
      else if (type == "Shareholders") {
        this.directorsList.map((element: any) => {
          if (element.firstName == item.firstName && element.lastName == item.lastName) {
            element.checked = true
          } else {
            element.checked = false
          }
        })
        this.shareholderList.map((element: any) => {
          if (element.firstName == item.firstName && element.lastName == item.lastName) {
            element.checked = true
          } else {
            element.checked = false
          }
        })
        // console.log('this.shareholderList: ', this.shareholderList);
        // console.log('this.directorsList: ', this.directorsList);
      }
    }
    if (type == "Directors") {
      this.accountHolderCompanyRoleForm.patchValue({
        select_directors: {
          ...item,
          isAccountHolder: true
        }
      })
    } else if (type == "Shareholders") {
      this.accountHolderCompanyRoleForm.patchValue({
        select_shareholers: {
          ...item,
          isAccountHolder: true
        }
      })
    }
    //  else if (type == "Authorized Signatory") {
    //   this.accountHolderCompanyRoleForm.patchValue({
    //     select_authority_signatory: item
    //   })
    // }
    // console.log('this.accountHolderCompanyRoleForm.value: ', this.accountHolderCompanyRoleForm.value);

  }
  isDisabled(item: any) {
    // console.log('item: ', item);
    const isDirectors = this.accountHolderCompanyRoleForm?.value?.company_role.includes("Director")
    // console.log('isDirectors: ', isDirectors);
    const isShareholders = this.accountHolderCompanyRoleForm?.value?.company_role.includes("Shareholder")
    const isAuthorizedSignatory = this.accountHolderCompanyRoleForm?.value?.company_role.includes("Authorised Signatory")
    // console.log('isAuthorizedSignatory: ', isAuthorizedSignatory);
    if ((isDirectors || isShareholders) && item.role == "Authorised Signatory") {
      this.company_role.find((element: any) => {
        if (element.role == item.role) {
          element.disabled = true
        }
      })
      return true
    } else if (isAuthorizedSignatory && (item.role == "Director" || item.role == "Shareholder")) {
      return true
    } else {
      return false
    }
  }
  disabledNextBtn() {
    const isDirectors = this.accountHolderCompanyRoleForm?.value?.company_role.includes("Director")
    const isShareholders = this.accountHolderCompanyRoleForm?.value?.company_role.includes("Shareholder")
    const isAuthorizedSignatory = this.accountHolderCompanyRoleForm?.value?.company_role.includes("Authorised Signatory")
    if (isAuthorizedSignatory) {
      return false
    } else if (isShareholders && isDirectors) {
      return (this.accountHolderCompanyRoleForm.value.select_shareholers != "" && this.accountHolderCompanyRoleForm.value.select_directors != "") ? false : true
    } else if (isDirectors) {
      return this.accountHolderCompanyRoleForm.value.select_directors != "" ? false : true
    } else if (isShareholders) {
      return this.accountHolderCompanyRoleForm.value.select_shareholers != "" ? false : true
    }
    else {
      return true
    }
  }


  isChecked(item: any, type: any) {
    const isDirectors = this.accountHolderCompanyRoleForm?.value?.company_role.includes("Director")
    const isShareholders = this.accountHolderCompanyRoleForm?.value?.company_role.includes("Shareholder")
    if (isShareholders && isDirectors) {
      this.accountHolderCompanyRoleForm.patchValue({
        select_directors: {
          ...item,
          isAccountHolder: true
        }
      })
      this.accountHolderCompanyRoleForm.patchValue({
        select_shareholers: {
          ...item,
          isAccountHolder: true
        }
      })
      return true
    } else {
      return false
    }
  }
}