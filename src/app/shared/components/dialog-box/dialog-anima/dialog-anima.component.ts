import { Component, NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-dialog-anima',
  templateUrl: './dialog-anima.component.html',
  styleUrls: ['./dialog-anima.component.scss'],
})


export class DialogAnimaComponent {
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(private sanitizer: DomSanitizer) {}

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    // event.blob can be used to upload the cropped image
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
}
