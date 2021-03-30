import { LocationStrategy } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Color } from 'src/app/common/enum/color.enum';
import { ComponentName } from 'src/app/common/enum/ComponentName';
import { Size } from 'src/app/common/enum/Size';
import { AuthService } from 'src/app/services/auth.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
declare var $: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: [
    './cart.component.css',
    '../../../assets/lib/bootstrap/dist/css/bootstrap.min.css',
    '../../../assets/lib/animate.css/animate.css',
    '../../../assets/lib/components-font-awesome/css/font-awesome.min.css',
    '../../../assets/lib/et-line-font/et-line-font.css',
    '../../../assets/lib/magnific-popup/dist/magnific-popup.css',
    '../../../assets/lib/simple-text-rotator/simpletextrotator.css',
    '../../../assets/css/style.css',
    '../../../assets/css/colors/default.css',
  ],
})
export class CartComponent implements OnInit {
  @Input() itemsInMemory: any[] = [];
  @Input() items: any[] = [];

  @Output() goBack = new EventEmitter();
  @Output() onCheckout = new EventEmitter();

  cart: { CartSubtotal: number; deliveryCharges: number; total: number } = {
    CartSubtotal: 0,
    deliveryCharges: 0,
    total: 0,
  };
  constructor(
    private location: LocationStrategy,
    private sanitizer: DomSanitizer,
    private router: Router,
    private toastNotificationService:ToastNotificationService,
    private authService: AuthService
  ) {

    history.pushState(null, 'null', window.location.href);
    this.location.onPopState(() => {
      this.goBack.emit({component:ComponentName.Cart});
      history.pushState(null, 'null', window.location.href);
    });

  }

  ngOnInit(): void {

    if (this.items) {

      (this.items as []).forEach((item: any) => {

        this.cart.CartSubtotal +=
          (item.price as number) * (item.quantity as number);
      });
    }

    this.cart.deliveryCharges = 200;
    this.cart.total = this.cart.deliveryCharges + this.cart.CartSubtotal;

    $('.loader').fadeOut();
    $('.page-loader').delay(350).fadeOut('slow');
  }

  isAutherizeUser() {
    return this.authService.isAutherize();
  }

  getImage(itemImage: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      itemImage.image as string
    );
  }
  remove(item: any) {
    const index = this.items.indexOf(item);
    this.items.splice(index, 1);
    const itemTotal = item.price * item.quantity;
    this.cart.CartSubtotal -= itemTotal;
    this.cart.total -= itemTotal;
    this.saveCart();
  }

  updateQuantity($event: any, item: any) {
    const quantity = $event.target.value;
    this.updateTotalCart(item, quantity);

    let updateItem =  (this.items.find(i => i.itemId == item.itemId ) as any);
    let index = this.items.indexOf(updateItem);
    updateItem.quantity = quantity;
    this.items[index]= updateItem;
    this.saveCart();
  }

  private updateTotalCart(item: any, quantity: any) {
    const itemTotal = item.price * item.quantity;
    this.cart.CartSubtotal -= itemTotal;
    this.cart.total -= itemTotal;

    const itemNewTotal = item.price * quantity;
    this.cart.CartSubtotal += itemNewTotal;
    this.cart.total += itemNewTotal;
  }


  getColors(colors: string): string[] {

    let colorsArray = colors.split(',');
    return Object.values(Color).filter(
      (value) =>
        typeof value === 'string' && colorsArray.some((c) => c == value)
    ) as [];
  }
  getSizes(sizes: string): string[] {

    let sizesArray = sizes.split(',');
    let c = Object.values(Size).filter(
      (value) => typeof value === 'string' && sizesArray.some((c) => c == value)
    ) as [];

    return c;
  }

  validateCartItems() {
   let isValidItems=true;
    this.items.forEach((item) => {
      const itemInMemory = this.itemsInMemory.find(
        (i) => i.itemId == item.itemId
      ) as any;
      if (itemInMemory.color != "None" && (item.color as string).split(',').length > 1) {

        this.toastNotificationService.showError(
          'Please Select Color for item where color is avalible',
          'Select Color'
        );
        isValidItems = false;
      }

      if (itemInMemory.size != "None" && (item.size as string).split(',').length > 1) {
        console.log(itemInMemory.size);
        console.log((item.size as string).split(',').length);
        this.toastNotificationService.showError(
          'Please Select Color for item where size is avalible',
          'Select size'
        );
        isValidItems = false;
      }
    });
    if(isValidItems)
    this.onCheckout.emit({ isAutherize: this.authService.isAutherize() });
  }

  setItemColor(item:any,option:any) {

    if(option.value === "Select Color")
    return;
    else{
      let updateItem =  (this.items.find(i => i.itemId == item.itemId ) as any);
      let index = this.items.indexOf(updateItem);
      updateItem.color = option.value;
      this.items[index]= updateItem;
    }

    this.saveCart();
  }

  setItemSize(item:any,option:any) {
    if(option.value == "Select Size")
    return;
    else{
      let updateItem =  (this.items.find(i => i.itemId == item.itemId ) as any);
      let index = this.items.indexOf(updateItem);
      updateItem.size = option.value;
      this.items[index]= updateItem;

    }
    this.saveCart();
  }

  saveCart() {
    localStorage.setItem('items', JSON.stringify(this.items));
  }
}
