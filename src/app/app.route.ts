import { Routes } from "@angular/router";

export const APP_ROUTES: Routes = [

    {
        path: 'champion',
        loadChildren: ()=>import('./main/module/champion/champion.module').then(m=> m.ChampionModule)
    },
    {
        path      : '**',
        redirectTo: '/'
    }
]