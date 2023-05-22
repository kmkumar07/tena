import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesListingComponent } from './components/features-listing/features-listing.component';
import { CreateFeatureComponent } from './components/create-feature/create-feature.component';
import { ViewFeatureComponent } from './components/view-feature/view-feature.component';

const routes: Routes = [
  {
    path: '',
    component: FeaturesListingComponent,
  },
  {
    path: 'create',
    component: CreateFeatureComponent,
  },
  { path: 'view', component: ViewFeatureComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
