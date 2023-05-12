import {
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxTippyProps, NgxTippyService } from 'ngx-tippy-wrapper';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent {
  @ViewChild('tippyTemplate', { read: ElementRef, static: true })
  tippyTemplate: ElementRef;
  tippyContent: NgxTippyProps = {};
  constructor(
    public dialog: MatDialog,
    private ngxTippyService: NgxTippyService
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
