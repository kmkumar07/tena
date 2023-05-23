import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './shared/modules/angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/modules/shared/shared.module';
import { LayoutComponent } from './core/layouts/layout/layout.component';
import { SidebarComponent } from './core/layouts/sidebar/sidebar.component';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
