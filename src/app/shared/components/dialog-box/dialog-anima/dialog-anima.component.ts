import { Component, Inject, NgModule } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent, LoadedImage, base64ToFile } from 'ngx-image-cropper';
import { ProductsService } from 'src/app/modules/products/services/products.service';

@Component({
  selector: 'app-dialog-anima',
  templateUrl: './dialog-anima.component.html',
  styleUrls: ['./dialog-anima.component.scss'],
})


export class DialogAnimaComponent {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  constructor(private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<DialogAnimaComponent>,
    public dialog: MatDialog,
    private productService: ProductsService,
  ) {}
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    //  event.blob can be used to upload the cropped image
    console.log("this.croppedImage",event.blob.type);

  }
    
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  onSaveClick(): void {
    this.productService.sendCroppedImage(this.croppedImage);
  }
  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}
