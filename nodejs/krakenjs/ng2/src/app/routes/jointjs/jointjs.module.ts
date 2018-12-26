import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LabelComponent } from './label/label.component';
import { SharedModule } from '../../shared/shared.module';

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
    LabelComponent
  ],
  exports: [
    RouterModule
  ]
})
export class JointjsModule { }
