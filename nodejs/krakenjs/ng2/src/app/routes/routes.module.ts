import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { MenuService } from '../core/menu/menu.service';

import { routes } from './routes';
import { Menus } from './menu';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutesModule {

  constructor(public menuService: MenuService) {
    menuService.addMenu(Menus);
}
}
