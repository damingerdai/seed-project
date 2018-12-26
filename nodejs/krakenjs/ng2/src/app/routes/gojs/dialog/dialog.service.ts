import { Injectable } from '@angular/core';

import { GojsModule } from '../gojs.module';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { DialogComponent } from './dialog.component';

@Injectable({
  providedIn: GojsModule
})
export class DialogService {

  open(config?: MatDialogConfig<any>): MatDialogRef<any, any> {
    return this.dialog.open(DialogComponent, config);
  }

  constructor(private dialog: MatDialog) { }
}
