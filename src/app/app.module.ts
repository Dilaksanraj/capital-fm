import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.route';
import { CustomPreloading } from './shared/CustomPreloading';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(APP_ROUTES,{preloadingStrategy: CustomPreloading}),
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [
    CustomPreloading
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
