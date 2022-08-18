import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ChampionComponent } from './champion.component';

const routes = [
    {
        path     : '',
        component: ChampionComponent
    }
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

    ]
})
export class ChampionModule
{
}