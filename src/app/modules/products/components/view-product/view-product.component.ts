import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss'],
})
export class ViewProductComponent {
  product$: Observable<any>;
  subscription: Subscription;
  productDetail: any
  productId: string
  name: string
  description: string
  modifiedOn:string
  createdOn:string
  status: string
   environment = environment;
  imageUrl: string 
  imagePath:string
  imageName:string
  feature:any
  constructor(private productService: ProductsService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    const id = this.route.snapshot.params['id'];
    this.productService.getProductById(id).
      subscribe((res) => {
        this.productDetail = res
        console.log("aaa", this.productDetail)
        this.productId = this.productDetail?.productId
        this.name = this.productDetail?.name
        this.description = this.productDetail?.description
        this.createdOn = this.productDetail?.createdOn
        this.modifiedOn = this.productDetail?.modifiedOn
        this.status = this.productDetail?.status
        this.imageUrl = this.productDetail?.imageUrl,
        this.imageName = this.imageUrl?.substring(this.imageUrl.lastIndexOf('/') + 1);
        this.imagePath=this.environment.imagePath
        this.feature = this.productDetail?.feature || [];
      })

  }
  getProductId(id: string){
    this.productService.setId(id)
    
  }

}

