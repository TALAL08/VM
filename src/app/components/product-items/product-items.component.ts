import { LocationStrategy } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ComponentName } from 'src/app/common/enum/ComponentName';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
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
  @Input() productItems: any[] = [];
  @Input() product: {
    id: string;
    name: string;
    contentType: string;
    image: string;
    categoryId: string;
  } = { id: '', name: '', contentType: '', image: '', categoryId: '' };

  @Output() change = new EventEmitter();
  @Output() changeCartCount = new EventEmitter();
  @Output() goBack = new EventEmitter();

  constructor(
    private location: LocationStrategy,
    private sanitizer: DomSanitizer,
    private toastNotificationService:ToastNotificationService
  ) {

    history.pushState(null, 'null', window.location.href);
    this.location.onPopState(() => {
      this.goBack.emit({component:ComponentName.Item,categoryId:this.product.categoryId});
      history.pushState(null, 'null', window.location.href);
    });

  }

  ngOnInit(): void {

    $('.loader').fadeOut();
    $('.page-loader').delay(350).fadeOut('slow');
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
        itemId: item.id,
        name: item.name,
        price: item.price,
        contentType: item.contentType,
        image: item.contentType + item.image,
        quantity: 1,
        color: item.color,
        size: item.size,
        productId: this.product.id,
        categoryId: this.product.categoryId,
      });
      this.toastNotificationService.showSuccess('Item added to cart','Added To Cart');
    } else {
      let cartItemIndex = items.findIndex((c: any) => c.itemId == item.id);
      items.splice(cartItemIndex, 1);
      this.toastNotificationService.showSuccess('Item removed from cart','Removed From Cart');
    }

    productItem.isAddedToCart = !item.isAddedToCart;
    localStorage.setItem('items', JSON.stringify(items));
    this.changeCartCount.emit();
  }

  itemDetail(item: any, categoryId: string, productId: string) {
    this.change.emit({
      item: item,
      categoryId: categoryId,
      productId: productId,
    });
  }
}
