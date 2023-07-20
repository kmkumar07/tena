import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TextareaComponent } from './textarea.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, NgxTippyModule, BrowserAnimationsModule],
  declarations: [TextareaComponent],
  exports: [TextareaComponent, MatIconModule, NgxTippyModule ],
})
export class SftTextareaModule {}

