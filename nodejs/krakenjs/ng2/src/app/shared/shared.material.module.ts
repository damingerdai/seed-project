import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatExpansionModule,
        MatStepperModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatDialogModule,
    ], // 先import
    exports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatExpansionModule,
        MatStepperModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatDialogModule,
    ] // 在export
})
export class SharedMaterialModule {

    constructor() { }
}