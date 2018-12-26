import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { LabelComponent } from './label/label.component';
import { DialogComponent } from './dialog/dialog.component';
import { DialogService } from './dialog/dialog.service';


const routes: Routes = [
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomeComponent,
    LabelComponent,
    DialogComponent
  ],
  entryComponents: [
    DialogComponent
  ],
  providers: [
    DialogService
  ],
  exports: [
    RouterModule
  ]
})
export class GojsModule { }
