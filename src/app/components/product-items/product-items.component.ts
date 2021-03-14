import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ProductItemService } from '../../services/product-item.service';
declare var $: any;
@Component({
  selector: 'app-product-items',
  templateUrl: './product-items.component.html',
  styleUrls: [
    './product-items.component.css',
    '../../../assets/lib/bootstrap/dist/css/bootstrap.min.css',
    '../../../assets/lib/animate.css/animate.css',
    '../../../assets/lib/components-font-awesome/css/font-awesome.min.css',
    '../../../assets/lib/et-line-font/et-line-font.css',
    '../../../assets/lib/magnific-popup/dist/magnific-popup.css',
    '../../../assets/lib/simple-text-rotator/simpletextrotator.css',
    '../../../assets/css/style.css',
    '../../../assets/css/colors/default.css',
    '../../../assets/lib/owl.carousel/dist/assets/owl.carousel.min.css',
    '../../../assets/lib/owl.carousel/dist/assets/owl.theme.default.min.css',
  ],
})
export class ProductItemsComponent implements OnInit {
  productItems: any[] = [];
  product: {id:string,name:string,contentType:string,image:string,categoryId:string}={id:"",name:"",contentType:"",image:"",categoryId:"",};
  count: number = 0;
  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private productItemService: ProductItemService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((pram) => {

      let productId = pram.get('productId') as string;
      const itemsInStorage = localStorage.getItem('items');
      let items = [{}];
      items = [];
      if (itemsInStorage)
        items = JSON.parse(itemsInStorage) as {}[];



      this.productItemService.get(productId).subscribe((res) => {

        ((res as any) as []).forEach((item: any) => {

          const isInCart = items.find((c: any) => c.id === item.id);

          let productItem = {
            id: item.id,
            name: item.name,
            contentType: item.contentType,
            price: item.price,
            image: item.image,
            product: item.product,
            isAddedToCart: false,
          };

          if (isInCart) productItem.isAddedToCart = true;
          this.productItems.push(productItem);
        });

        this.product = this.productItems[0].product;
        console.log(this.productItems);
        $('.loader').fadeOut();
        $('.page-loader').delay(950).fadeOut('slow');
      });
    });
  }
  getImage(itemImage: any) {
    const image = itemImage.contentType + itemImage.image;
    return this.sanitizer.bypassSecurityTrustResourceUrl(image as string);
  }

  saveItem(item: any) {
    let productItem = this.productItems.find((i) => i.id == item.id);
    const itemsInStorage = localStorage.getItem('items');
    let items = [{}];
    items = [];
    if (itemsInStorage) {
      items = JSON.parse(itemsInStorage) as {}[];
    }

    if (!item.isAddedToCart) {
      items.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.contentType + item.image,
        quantity: 1,
        productId:this.product.id,
        categoryId:this.product.categoryId
      });
    } else {
      let cartItemIndex = items.findIndex((c: any) => c.id == item.id);
      items.slice(cartItemIndex, 1);
    }

    localStorage.setItem('items', JSON.stringify(items));
    productItem.isAddedToCart = !item.isAddedToCart;
    this.count = items.length;
  }
}
