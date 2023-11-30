import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { StorageService } from '../../Services/common/storage.service';
import { STORAGE_CONSTANTS } from '../../Services/common/constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  sidebarArr: any = [
    {
      id: 1,
      img_src: '/assets/images/icons/home_icon.png',
      svg_width: '22',
      svg_height: '22',
      svg_path: 'M1.25 11L10.2045 2.04551C10.6438 1.60617 11.3562 1.60617 11.7955 2.04551L20.75 11M3.5 8.75001V18.875C3.5 19.4963 4.00368 20 4.625 20H8.75V15.125C8.75 14.5037 9.25368 14 9.875 14H12.125C12.7463 14 13.25 14.5037 13.25 15.125V20H17.375C17.9963 20 18.5 19.4963 18.5 18.875V8.75001M7.25 20H15.5',
      // svg_stroke: '#101828',
      title: 'Application',
      class: 'Application-tab',
      active: true,
    },
    {
      id: 2,
      img_src: '/assets/images/icons/faq_icon.png',
      svg_width: '22',
      svg_height: '22',
      svg_path: 'M7.87891 5.51884C9.05048 4.49372 10.95 4.49372 12.1215 5.51884C13.2931 6.54397 13.2931 8.20603 12.1215 9.23116C11.9176 9.40958 11.6917 9.55695 11.4513 9.67326C10.7056 10.0341 10.0002 10.6716 10.0002 11.5V12.25M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10ZM10 15.25H10.0075V15.2575H10V15.25Z',
      // svg_stroke: '#667085',
      title: 'FAQ',
      class: 'Application-tab help-tab',
      active: false,
    },
    {
      id: 3,
      img_src: '/assets/images/icons/mail_icon.png',
      svg_width: '22',
      svg_height: '22',
      svg_path: 'M20.75 3.75V14.25C20.75 15.4926 19.7426 16.5 18.5 16.5H3.5C2.25736 16.5 1.25 15.4926 1.25 14.25V3.75M20.75 3.75C20.75 2.50736 19.7426 1.5 18.5 1.5H3.5C2.25736 1.5 1.25 2.50736 1.25 3.75M20.75 3.75V3.99271C20.75 4.77405 20.3447 5.49945 19.6792 5.90894L12.1792 10.5243C11.4561 10.9694 10.5439 10.9694 9.82078 10.5243L2.32078 5.90894C1.65535 5.49945 1.25 4.77405 1.25 3.99271V3.75',
      // svg_stroke: '#667085',
      title: 'Contact us',
      class: 'Application-tab contact-tab',
      active: false,
    },
  ]
  @Input() showOnlyLogout = false;
  private dialogRef!: NbDialogRef<any>;
  @ViewChild('dialog')
  Dialog!: TemplateRef<any>;
  constructor(private dialogService: NbDialogService, private storageService: StorageService) {
    const active_sidebar = this.sidebarArr.find((item: any) => item.active)
    storageService.setIntoLocalStorage(STORAGE_CONSTANTS.ACTIVE_SIDEBAR, JSON.stringify(active_sidebar))
  }

  protected open() {
    const backdropClick = false
    this.dialogRef = this.dialogService.open(this.Dialog, {
      closeOnBackdropClick: backdropClick
    });
  }
  ConfirmDialog() {
    localStorage.clear();
    location.reload();
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
  sidebarRedirect(id: any) {
    console.log('id: ', id);
    this.sidebarArr.forEach((item: any) => {
      item.active = false
    })
    const index = this.sidebarArr.findIndex((item: any) => item?.id == id)
    if (index >= 0) {

      this.sidebarArr[index].active = true
    }
    const active_sidebar = this.sidebarArr.find((item: any) => item.active)
    this.storageService.setIntoLocalStorage(STORAGE_CONSTANTS.ACTIVE_SIDEBAR, JSON.stringify(active_sidebar))
  }
}
