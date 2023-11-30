import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { STORAGE_CONSTANTS } from './core/Services/common/constants';
import { StorageService } from './core/Services/common/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'xend-pay';
  isCloseIcon = true;
  sectionData: any = []
  private dialogRef!: NbDialogRef<any>;
  @ViewChild('dialog')
  dialog!: TemplateRef<any>;
  account_Arr = [
    {
      icon: 'person-outline',
      title: 'Select Account',
      description:
        "You're self employed or a freelancer and hold complete ownership of your business.",
    },
    {
      icon: 'person-outline',
      title: 'Registered Company',
      description:
        'Your company is registered with UK Companies House. You must be a director of the company to open an account',
    },
  ];
  currentRoute: any;
  is_scrolled = false
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollPosition = window.scrollY || window.pageYOffset;

    if (scrollPosition > 102) {
      // console.log('Scrolled more than 94 pixels!');
      this.is_scrolled = true
      // Your additional logic here
    } else {
      this.is_scrolled = false
      // console.log('Scrolled less than 94 pixels.');
    }
  }
  constructor(private route: Router, private dialogService: NbDialogService, private storageService: StorageService) {
    this.route.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          if (event?.url == "/") {
            this.isCloseIcon = false
          } else {
            this.isCloseIcon = true
          }
          // Prints the current route
          // Eg.- /products
        }
      }
    )
  }
  goToHome() {
    this.route.navigate(['/'])
  }
  openDialog() {
    const section_data: any = this.storageService.getFromLocalStorage(
      STORAGE_CONSTANTS.SECTIONS_DATA
    );
    if (section_data) {
      this.sectionData = JSON.parse(section_data)
        ? JSON.parse(section_data)
        : this.sectionData;
    }
    const index = this.sectionData.findIndex(
      (data: any) => data?.text === 'account_verification'
    );
    if (this.sectionData[index].status != "Completed") {
      const backdropClick = false
      this.dialogRef = this.dialogService.open(this.dialog, {
        closeOnBackdropClick: backdropClick
      });
    } else {
      this.route.navigate(['/']);
    }
  }
  ConfirmDialog() {
    localStorage.clear();
    this.route.navigate(['/']);
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
