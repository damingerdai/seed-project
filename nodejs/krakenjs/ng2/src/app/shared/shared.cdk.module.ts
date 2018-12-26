import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
    imports: [
        LayoutModule
    ], // 先import
    exports: [
        LayoutModule
    ] // 在export
})
export class SharedCdkModule {

    constructor() { }
}