import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesListingComponent } from './components/features-listing/features-listing.component';
import { CreateFeatureComponent } from './components/create-feature/create-feature.component';

const routes: Routes = [
  { 
    path: '', 
    component: FeaturesListingComponent 
  },
  {
    path: 'create',
    component: CreateFeatureComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
