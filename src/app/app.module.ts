import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.route';
import { CustomPreloading } from './shared/CustomPreloading';
import { ConfirmDialogComponent } from './shared/dialog/confirm-dialog/confirm-dialog.component';
import { CustomMaterialModule } from './shared/dialog/confirm-dialog/ConfirmDialogModel.module';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent
  ],
  imports: [
    RouterModule.forRoot(APP_ROUTES,{preloadingStrategy: CustomPreloading}),
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    MatGridListModule
  ],
  providers: [
    CustomPreloading
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
