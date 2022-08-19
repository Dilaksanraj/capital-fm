import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ChampionComponent } from './champion.component';
import { ChampionService } from './service/champion.service';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
const routes = [
    {
        path     : '',
        component: ChampionComponent,
        resolve:{
            champions: ChampionService
        }
    },
];

@NgModule({
    declarations: [
        ChampionComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        AgGridModule,
        HttpClientModule,
        CommonModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule

    ],
    providers:[
        ChampionService
    ]
})
export class ChampionModule
{
}