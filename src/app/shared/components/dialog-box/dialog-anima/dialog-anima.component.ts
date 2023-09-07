import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ProductsService } from 'src/app/modules/products/services/products.service';

@Component({
  selector: 'app-dialog-anima',
  templateUrl: './dialog-anima.component.html',
  styleUrls: ['./dialog-anima.component.scss'],
})
export class DialogAnimaComponent {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  base64Image: any = '';
  imageName: any = '';
  base64imageData: any = '';
  constructor(
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<DialogAnimaComponent>,
    public dialog: MatDialog,
    private productService: ProductsService
  ) {}
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.handleFileInput(event);
  }
  handleFileInput(e: any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    this.imageName = file.name;

    reader.readAsDataURL(file);
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);

    const imageUrl = this.croppedImage.changingThisBreaksApplicationSecurity;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', imageUrl, true);
    xhr.responseType = 'blob';

    xhr.onload = () => {
      if (xhr.status === 200) {
        const blob = xhr.response;

        var reader = new FileReader();

        reader.onload = (event) => {
          this.base64Image = event.target.result;
          const dataURLParts = this.base64Image?.split(';base64,');
          this.base64imageData = dataURLParts[1];
        };
        reader.readAsDataURL(blob);
      }
    };

    xhr.send();
  }

  imageLoaded() {}
  cropperReady() {}
  loadImageFailed() {}
  onSaveClick(): void {
    this.productService.sendCroppedImage(this.base64imageData, this.imageName);
  }
  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}
