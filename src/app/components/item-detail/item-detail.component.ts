import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
declare var $:any;
@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: [
    '../../../assets/lib/bootstrap/dist/css/bootstrap.min.css',
    '../../../assets/lib/animate.css/animate.css',
    '../../../assets/lib/components-font-awesome/css/font-awesome.min.css',
    '../../../assets/lib/et-line-font/et-line-font.css',
    '../../../assets/lib/magnific-popup/dist/magnific-popup.css',
    '../../../assets/lib/simple-text-rotator/simpletextrotator.css',
    '../../../assets/css/style.css',
    '../../../assets/css/colors/default.css',
    './item-detail.component.css',
  ],
})
export class ItemDetailComponent implements OnInit {
  images: any[] = [];
  item: {
    itemId: string,
    name: string,
    contentType: string,
    description:string,
    price: string,
    image: string,
    product:{categoryId:string}
    productId: string,
    categoryId: string,
    isAddedToCart: boolean
  }={itemId:"",description:"",name:"",contentType:"",price:"",image:"",product:{categoryId:""},productId:"",categoryId:"",isAddedToCart:false};
  count: number = 0;
  quantity: number = 1;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((pram) => {
      let itemId = pram.get('id') as string;
      const itemsInStorage = localStorage.getItem('items');
      let items = [{}];
      items = [];
      if (itemsInStorage) items = JSON.parse(itemsInStorage) as {}[];

      const item =(items.find((i: any) => i.itemId == itemId)as any);
      if (item == null) {
        this.itemService.get(itemId).subscribe((res) => {

          let i = (res as any);
          this.item.itemId = i.id,
            (this.item.name = i.name),
            (this.item.contentType = i.contentType),
            (this.item.price = i.price),
            (this.item.image = i.image),
            (this.item.productId = i.product.id),
            (this.item.product.categoryId = i.product.categoryId),
            (this.item.isAddedToCart = false),
            (this.images = i.images);
        });
      }else{
        this.item.itemId = item.id,
        (this.item.name = item.name),
        (this.item.contentType = item.contentType),
        (this.item.price = item.price),
        (this.item.image = item.image),
        (this.item.productId = item.product.id),
        (this.item.product.categoryId = item.product.categoryId),
        (this.item.isAddedToCart = true),
        (this.images = item.images);
      }

      $('.loader').fadeOut();
      $('.page-loader').delay(350).fadeOut('slow');
    });
  }
  updateQuantity($event: any, item: any) {
    this.quantity = $event.target.value;
  }
  saveItem(item: any) {
    const itemsInStorage = localStorage.getItem('items');
    let items = [{}];
    items = [];
    if (itemsInStorage) {
      items = JSON.parse(itemsInStorage) as {}[];
    }

    if (!item.isAddedToCart) {
      items.push({
        itemId: item.id,
        name: item.name,
        price: item.price,
        image: item.contentType + item.image,
        quantity: this.quantity,
        productId: this.item.productId,
        categoryId: this.item.product.categoryId,
      });
    } else {
      let cartItemIndex = items.findIndex((c: any) => c.itemId == item.id);
      items.slice(cartItemIndex, 1);
    }

    localStorage.setItem('items', JSON.stringify(items));
    this.count = items.length;
    if (item.isAddedToCart)
      this.router.navigate(['productItems/' + this.item.productId]);
  }

  getImage(itemImage: any) {
    const image = itemImage.contentType + itemImage.image;
    return this.sanitizer.bypassSecurityTrustResourceUrl(image as string);
  }
}
