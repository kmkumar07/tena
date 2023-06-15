import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layouts/layout/layout.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { SignInComponent } from './modules/sign-in/components/sign-in.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
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
    ],
  },
  {
    path: 'sign-in', component: SignInComponent
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
