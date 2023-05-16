import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesListingComponent } from './features-listing/features-listing.component';
import { ViewFeatureComponent } from './view-feature/view-feature.component';

const routes: Routes = [
  { path: '', component: FeaturesListingComponent },
  { path: 'view-feature', component: ViewFeatureComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
