import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layouts/layout/layout.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { SignInComponent } from './modules/sign-in/components/sign-in.component';
import { AuthGuard } from './modules/sign-in/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
     
      {
        path: '',
        loadChildren: () =>
          import('../app/modules/dashboard/dashboard.module').then(
            (mod) => mod.DashboardModule
          ),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('../app/modules/products/products.module').then(
            (mod) => mod.ProductsModule
          ),
      },
      {
        path: 'features',
        loadChildren: () =>
          import('../app/modules/features/features.module').then(
            (mod) => mod.FeaturesModule
          ),
      },
      {
        path: 'plans',
        loadChildren: () =>
          import('../app/modules/plans/plans.module').then(
            (mod) => mod.PlansModule
          ),
      },
      {
        path: 'coupons',
        loadChildren: () =>
          import('../app/modules/coupons/coupons.module').then(
            (mod) => mod.CouponsModule
          ),
      },
      {
        path: 'payment',
        loadChildren: () =>
          import('./modules/payment-history/payment-history.module').then(
            (m) => m.PaymentHistoryModule
          ),
      },
    ],
  },
  {
    path: 'products',
    loadChildren: () =>
      import('../app/modules/products/products.module').then(
        (mod) => mod.ProductsModule
      ),
  },
  {
    path: 'features',
    loadChildren: () =>
      import('../app/modules/features/features.module').then(
        (mod) => mod.FeaturesModule
      ),
  },
  {
    path: 'sign-in',
    canActivate: [AuthGuard],
    component: SignInComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
