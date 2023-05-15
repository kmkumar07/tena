import {
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxTippyProps, NgxTippyService } from 'ngx-tippy-wrapper';
import { trigger, transition, animate, style } from '@angular/animations'

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class CreateProductComponent {
  @ViewChild('tippyTemplate', { read: ElementRef, static: true })
  tippyTemplate: ElementRef;
  tippyContent: NgxTippyProps = {};
  constructor(
    public dialog: MatDialog,
  ) {}
  // ngAfterViewInit() {
  //   this.setContentForTooltip();
  // }
  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DialogAnimationsDialog, {
      width: '',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  // setContentForTooltip() {
  //   const template = this.tippyTemplate.nativeElement;

  //   // Pass element itself
  //   this.ngxTippyService.setContent('content', template);

  //   // or

  //   // Pass element `innerHTML`
  //   this.ngxTippyService.setContent('content', template.innerHTML);
  // }
}

@Component({
  selector: 'dialog-animations-dialog',
  templateUrl: '../../../shared/components/dialog-box/dialog-animations-dialog.html',
  styleUrls: ['../../../shared/components/dialog-box/dialog-animations.scss'],
})
export class DialogAnimationsDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsDialog>) {}
}
