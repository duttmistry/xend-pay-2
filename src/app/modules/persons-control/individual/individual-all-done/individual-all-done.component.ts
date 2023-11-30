import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { STORAGE_CONSTANTS } from 'src/app/core/Services/common/constants';
import { StorageService } from 'src/app/core/Services/common/storage.service';

@Component({
  selector: 'app-individual-all-done',
  templateUrl: './individual-all-done.component.html',
  styleUrls: ['./individual-all-done.component.scss']
})
export class IndividualAllDoneComponent {
  sectionData: any[] = [];
  business_details_data: any = {}
  submitPath = "/persons-of-control/confirm-shareholder-verify"
  constructor(private router: Router, private storageService: StorageService) {
    const section_data: any = this.storageService.getFromLocalStorage(STORAGE_CONSTANTS.SECTIONS_DATA)
    if (section_data) {
      this.sectionData = JSON.parse(section_data) ? JSON.parse(section_data) : this.sectionData;
    }
    this.get_business_details_data()
  }

  get_business_details_data() {
    const data: any = localStorage.getItem('business_details')
    if (data) {
      this.business_details_data = JSON.parse(data) ? JSON.parse(data) : this.business_details_data;
      console.log('this.business_details_data: ', this.business_details_data);
      if (this.business_details_data?.isAuto) {
        this.submitPath = '/persons-of-control/confirm-shareholders-verify'
      } else {
        this.submitPath = '/persons-of-control/confirm-shareholders-verify-manual'
      }
    }
  }


  _onSubmit() {
    const index = this.sectionData.findIndex((data: any) => data?.text == "additional_information")
    if (index >= 0) {
      this.sectionData[index].status = "Completed";
      this.sectionData[index].icon = "checkmark-circle-2";
      this.sectionData[index].color = "#37AB87";
    }
    this.storageService.setIntoLocalStorage(STORAGE_CONSTANTS.SECTIONS_DATA, JSON.stringify(this.sectionData))
    this.router.navigate([this.submitPath]);
  }
}
