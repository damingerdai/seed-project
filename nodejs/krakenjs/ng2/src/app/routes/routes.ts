import { LayoutComponent } from '../layout/layout.component';

export const routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'jointjs', loadChildren: './jointjs/jointjs.module#JointjsModule' },
            { path: 'gojs', loadChildren: './gojs/gojs.module#GojsModule' }
        ]
    },

    // Not found
    { path: '**', redirectTo: 'home' }

];
