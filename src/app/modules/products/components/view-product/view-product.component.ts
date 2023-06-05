import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

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
  status: string
  imageUrl: string
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
        this.modifiedOn = this.productDetail?.modifiedOn
        this.status = this.productDetail?.status
        this.imageUrl = this.productDetail?.imageUrl
        this.feature = this.productDetail?.feature || [];
      })

  }
  getProductId(id: string){
    this.productService.setId(id)
    
  }

}

