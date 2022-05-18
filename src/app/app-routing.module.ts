import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { LoggedInGuard } from './core/guard/logged-in.guard';
import { LayoutComponent } from './core/layout/layout/layout.component';
import { CountryWiseListingEditComponent } from './modules/country-wise-listing/country-wise-listing-edit/country-wise-listing-edit.component';
import { CountryWiseListingComponent } from './modules/country-wise-listing/country-wise-listing.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/login/login.component';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path:'',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path:'',
        redirectTo: 'dashboard',
        pathMatch:'full'
      },
      {
        path:'dashboard',
        component: DashboardComponent
      },
      {
        path:'country-wise-list',
        component: CountryWiseListingComponent
      },
      {
        path:'country-wise-list/:id',
        component: CountryWiseListingEditComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
