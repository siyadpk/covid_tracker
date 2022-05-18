import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { CountryWiseListingComponent } from './modules/country-wise-listing/country-wise-listing.component';
import { CountryWiseListingEditComponent } from './modules/country-wise-listing/country-wise-listing-edit/country-wise-listing-edit.component';
import { LayoutComponent } from './core/layout/layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './core/layout/layout/sidebar/sidebar.component';
import { LoaderComponent } from './components/loader/loader.component';
import { CardComponent } from './modules/dashboard/components/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CountryWiseListingComponent,
    CountryWiseListingEditComponent,
    LayoutComponent,
    SidebarComponent,
    LoaderComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
