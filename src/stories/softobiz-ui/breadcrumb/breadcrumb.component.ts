import { Component, ViewEncapsulation, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

// import { ButtonVariant } from './types';

@Component({
  selector: 'sft-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Breadcrumb {
  @Input() class: string = '';

  @Input() id: string = '';

  @Input() items: BreadcrumbItem[];
}

export interface BreadcrumbItem {
  label: string;
  link?: string;
}
