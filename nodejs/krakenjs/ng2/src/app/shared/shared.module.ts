import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedMaterialModule } from './shared.material.module';
import { SharedCdkModule } from './shared.cdk.module';

@NgModule({
  imports: [
    CommonModule,
    SharedMaterialModule,
    SharedCdkModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    SharedMaterialModule,
    SharedCdkModule,
    RouterModule
  ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
