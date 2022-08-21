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
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { BtnCellRenderer } from '../../common/BtnCellRenderer';
import { ReactiveFormsModule } from '@angular/forms';

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
        ChampionComponent,
        BtnCellRenderer
    ],
    imports: [
        RouterModule.forChild(routes),
        AgGridModule,
        HttpClientModule,
        CommonModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatDialogModule,
        MatIconModule,
        ReactiveFormsModule,

    ],
    providers:[
        ChampionService
    ]
})
export class ChampionModule
{
}