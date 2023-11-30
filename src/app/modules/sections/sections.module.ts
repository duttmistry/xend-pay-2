import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionsRoutingModule } from './sections-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbAutocompleteModule, NbBadgeModule, NbIconLibraries, NbButtonModule, NbCardModule, NbCheckboxModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbSelectModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { SectionPageComponent } from './section-page/section-page.component';
import { TitleHeaderComponent } from 'src/app/core/components/title-header/title-header.component';
import { SidebarComponent } from 'src/app/core/components/sidebar/sidebar.component';
import { CoreModule } from 'src/app/core/core.module';
import { SidebarApplicationComponent } from './sidebar-application/sidebar-application.component';


@NgModule({
  declarations: [
    SectionPageComponent,
    SidebarApplicationComponent,
  ],
  imports: [
    CommonModule,
    SectionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbLayoutModule,
    NbCardModule,
    NbButtonModule,
    NbSelectModule,
    NbInputModule,
    NbFormFieldModule,
    NbIconModule,
    NbAutocompleteModule,
    NbBadgeModule,
    NbEvaIconsModule,
    NbCheckboxModule,
    CoreModule
  ]
})
export class SectionsModule {
  constructor(private iconLibraries: NbIconLibraries) {
    // Register the Eva Icons pack with NbIconLibraries
    iconLibraries.registerSvgPack('eva', { iconClassPrefix: 'eva' });
  }
}
