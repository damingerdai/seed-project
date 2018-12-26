import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { CoreModule } from '../core.module';
import { IMenu } from '../../routes/menu';


@Injectable({
  providedIn: CoreModule
})
export class MenuService {

  private menus: Array<IMenu> = [];

  private menusSource: Subject<IMenu[]> = new Subject<IMenu[]>();

  menus$ = this.menusSource.asObservable();

  constructor() { }

  addMenu(items: Array<IMenu>) {
    if (items && items.length > 0) {
      items.forEach(item => this.menus.push(item));
    }
    this.menusSource.next(this.menus);
  }

  getMenu() {
    return this.menus;
  }

}
