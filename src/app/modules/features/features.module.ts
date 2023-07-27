import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { CreateFeatureComponent } from './components/create-feature/create-feature.component';
import { ViewFeatureComponent } from './components/view-feature/view-feature.component';
import { EditFeatureComponent } from './components/edit-feature/edit-feature.component';

@NgModule({
  declarations: [
    CreateFeatureComponent,
    ViewFeatureComponent,
    EditFeatureComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    AngularMaterialModule,
    SharedModule
  ]
})
export class FeaturesModule {
  constructor() {
  }
}
