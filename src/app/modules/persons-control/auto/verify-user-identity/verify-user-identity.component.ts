import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { STORAGE_CONSTANTS } from 'src/app/core/Services/common/constants';
import { LISTOFUSERS } from 'src/app/core/Services/common/perons-of-control-static-data';
import { SHAREHOLDERS } from 'src/app/core/Services/common/person-of-control-stackholders';
import { StorageService } from 'src/app/core/Services/common/storage.service';
import { _doDecrypt, _doEncrypt } from 'src/app/utils/encryption';

@Component({
  selector: 'app-verify-user-identity',
  templateUrl: './verify-user-identity.component.html',
  styleUrls: ['./verify-user-identity.component.scss'],
})
export class VerifyUserIdentityComponent implements OnInit {
  listofDirectors = LISTOFUSERS;
  userDetails: any = null;
  filteredOptions$: Observable<any[]>;

  @ViewChild('autoInput') input: any;
  flag_Icon = '';
  countries: any[];
  shareholderList: any = [];
  directorList: any = [];
  business_details_data: any = {}
  shareholder_id: any
  director_id: any
  backPath = "/persons-of-control/confirm-shareholder-verify"
  firstName: any = "Laura"
  lastName: any = "Holand"
  type: any = "Shareholders"
  title = `Verify ${this.firstName} ${this.lastName} identity`
  identtifyVerficationform: FormGroup = new FormGroup({
    mobilenumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    countryLocation: new FormControl('+91', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private activeRoute: ActivatedRoute, private router: Router, private storageService: StorageService) {
    this.get_business_details_data()
    const firstName = decodeURIComponent(
      this.activeRoute.snapshot.queryParams['firstName'] || ''
    );
    const type = decodeURIComponent(
      this.activeRoute.snapshot.queryParams['type'] || ''
    );
    this.firstName = firstName ? _doDecrypt(firstName) : "";
    this.type = type ? _doDecrypt(type) : "";
    console.log('this.firstName: ', this.firstName);
    const lastName = decodeURIComponent(
      this.activeRoute.snapshot.queryParams['lastName'] || ''
    );
    this.lastName = lastName ? _doDecrypt(lastName) : "";
    this.title = `Verify ${this.firstName} ${this.lastName} identity`

    console.log('this.type: ', this.type);
    if (this.type == "Shareholders") {
      const shareholderList: any = this.storageService.getFromLocalStorage(STORAGE_CONSTANTS.SHAREHOLDERS_LIST)
      this.shareholderList = JSON.parse(shareholderList) ? JSON.parse(shareholderList) : SHAREHOLDERS;
      console.log('this.shareholderList: ', this.shareholderList);
      this.shareholderList?.map((element: any) => {
        if (element?.firstName == this.firstName && element?.lastName == this.lastName) {
          element.verificationStatus = "Pending"
          this.shareholder_id = element?.id
        }
      })
      this.storageService.setIntoLocalStorage(STORAGE_CONSTANTS.SHAREHOLDERS_LIST, JSON.stringify(
        this.shareholderList
      ))
    } else if (this.type == "Directors") {
      const directorList: any = this.storageService.getFromLocalStorage(STORAGE_CONSTANTS.DIRECTORS_LIST)
      this.directorList = JSON.parse(directorList) ? JSON.parse(directorList) : LISTOFUSERS;
      console.log('this.directorList: ', this.directorList);
      this.directorList?.map((element: any) => {
        if (element?.firstName == this.firstName && element?.lastName == this.lastName) {
          element.verificationStatus = "Pending"
          this.director_id = element?.id
        }
      })
      this.storageService.setIntoLocalStorage(STORAGE_CONSTANTS.DIRECTORS_LIST, JSON.stringify(
        this.directorList
      ))

    }
    this.countries = [
      {
        country_code: '+91',
        flag: 'flag-icon-in flag-icon-squared',
        name: 'India',
        id: 1,
      },
      {
        country_code: '+1',
        flag: 'flag-icon-us flag-icon-squared',
        name: 'U.S.',
        id: 2,
      },
      {
        country_code: '+61',
        flag: 'flag-icon-au flag-icon-squared',
        name: 'Australia',
        id: 3,
      },
    ];
    this.filteredOptions$ = of(this.countries);
  }

  get identtifyVerficationformDetails() {
    return this.identtifyVerficationform.controls;
  }
  get_business_details_data() {
    const data: any = localStorage.getItem('business_details')
    if (data) {
      this.business_details_data = JSON.parse(data) ? JSON.parse(data) : this.business_details_data;
      console.log('this.business_details_data: ', this.business_details_data);
      if (this.business_details_data?.isAuto) {
        this.backPath = '/persons-of-control/confirm-shareholders-verify'
      } else {
        this.backPath = '/persons-of-control/confirm-shareholders-verify-manual'
      }
    }
  }
  ngOnInit(): void {
    try {
    } catch (error: any) {
      console.log(error);
      this.router.navigate(['/persons-of-control/confirm-shareholders']);
    }
  }
  getFilteredOptions(value: string): Observable<any[]> {
    return of(value).pipe(map((filterString) => this.filter(filterString)));
  }
  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.flag_Icon = '';
    return this.countries.filter((option) =>
      option.country_code.toLowerCase().includes(filterValue)
    );
  }
  onSelectionChange($event: any) {
    this.filteredOptions$ = this.getFilteredOptions($event);
  }
  getOptionHtml(option: { country_code: string; flag: string }): string {
    this.flag_Icon = 'flag-icon ' + option.flag;
    return (
      `<span class="flag-icon ${option.flag}"></span>` +
      '  ' +
      `${option.country_code}`
    );
  }
  onChange() {
    this.filteredOptions$ = this.getFilteredOptions(
      this.input.nativeElement.value
    );
  }
  _onSubmit() {
    if (this.identtifyVerficationform.valid) {
      if (this.type == "Shareholders") {

        this.shareholderList?.map((element: any) => {
          if (element?.firstName == this.firstName && element?.lastName == this.lastName) {
            element.verificationStatus = "Verified"
            this.shareholder_id = element?.id
          }
        })
        this.storageService.setIntoLocalStorage(STORAGE_CONSTANTS.SHAREHOLDERS_LIST, JSON.stringify(
          this.shareholderList
        ))

        this.router.navigate(['/persons-of-control/invitation'], {
          queryParams: {
            id: encodeURIComponent(_doEncrypt(this.shareholder_id.toString())),
            email: encodeURIComponent(_doEncrypt(this.identtifyVerficationformDetails['email'].value))
          },
        });
      } else if (this.type == "Directors") {
        this.directorList?.map((element: any) => {
          if (element?.firstName == this.firstName && element?.lastName == this.lastName) {
            element.verificationStatus = "Verified"
            this.director_id = element?.id
          }
        })
        this.storageService.setIntoLocalStorage(STORAGE_CONSTANTS.DIRECTORS_LIST, JSON.stringify(
          this.directorList
        ))

        this.router.navigate(['/persons-of-control/invitation'], {
          queryParams: {
            id: encodeURIComponent(_doEncrypt(this.director_id.toString())),
            email: encodeURIComponent(_doEncrypt(this.identtifyVerficationformDetails['email'].value))
          },
        });
      }
      // this.router.navigate([
      //   `/persons-of-control/invitation/${encodeURIComponent(
      //     _doEncrypt(this.identtifyVerficationformDetails['email'].value)
      //   )}`,
      // ]);
    }
  }
}
