import { NgModule } from '@angular/core';
import { SftButtonModule } from './button/button.module';
// import { SftProgressbarModule } from './ProgressBar/progressbar.module';
// import { SftButtonToggleModule } from './ButtonToggle/buttonToggle.module';
// import { SftCardModule } from './Card/card.module';
// import { SftDividerModule } from './divider/divider.module';
// import { SftExpensionModule } from './expansion-panel/expansion.module';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { TypographyComponent } from './Typography/typography.component';

const SFT_UI_MODULES = [SftButtonModule, NgxTippyModule];

/**
 * HumaUI shared modules
 */
@NgModule({
  imports: SFT_UI_MODULES,
  exports: SFT_UI_MODULES,
  declarations: [
    TypographyComponent
  ],
})
export class SoftobizUiModule {}
