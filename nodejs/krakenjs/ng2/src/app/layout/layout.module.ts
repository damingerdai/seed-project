import { NgModule } from '@angular/core';

import { LayoutComponent } from './layout.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidebarComponent
  ]
})
export class LayoutModule { }
