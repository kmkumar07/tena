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
  base64Image:any='';
  imageName:any="";
  base64imageData:any=""
  constructor(private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<DialogAnimaComponent>,
    public dialog: MatDialog,
    private productService: ProductsService,
  ) {}
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.handleFileInput(event)
  }
  handleFileInput(e: any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
   // this.loaded = false;
    this.imageName = file.name;
    console.log("imageName",this.imageName);

  //  reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);

    // Extract the URL from the SafeUrl instance
    const imageUrl = this.croppedImage.changingThisBreaksApplicationSecurity;
  
    const xhr = new XMLHttpRequest();
    xhr.open('GET', imageUrl, true);
    xhr.responseType = 'blob';
  
    xhr.onload = () => {
      if (xhr.status === 200) {
        const blob = xhr.response;
  
        var reader = new FileReader();
  
        reader.onload = (event) => {
          // event.target.result contains the base64 encoded image data
           this.base64Image = event.target.result;
           const dataURLParts = this.base64Image?.split(';base64,');
           this.base64imageData = dataURLParts[1];
          // Now you can use the base64Image for whatever you need
          console.log("base64Image",this.base64imageData);
        };
  
        // Read the blob as Data URL (which will convert it to base64)
        reader.readAsDataURL(blob);
      }
    };
  
    xhr.send();
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
    this.productService.sendCroppedImage(this.base64imageData,this.imageName);
  }
  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}
