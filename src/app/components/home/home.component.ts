import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ComponentName } from 'src/app/common/enum/ComponentName';
import { CategoryService } from 'src/app/services/category.service';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';
import { ShopService } from 'src/app/services/shop.service';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    '../../../assets/lib/bootstrap/dist/css/bootstrap.min.css',
    '../../../assets/lib/owl.carousel/dist/assets/owl.carousel.min.css',
    '../../../assets/lib/owl.carousel/dist/assets/owl.theme.default.min.css',
    '../../../assets/lib/animate.css/animate.css',
    '../../../assets/lib/components-font-awesome/css/font-awesome.min.css',
    '../../../assets/lib/et-line-font/et-line-font.css',
    '../../../assets/lib/magnific-popup/dist/magnific-popup.css',
    '../../../assets/lib/simple-text-rotator/simpletextrotator.css',
    '../../../assets/css/colors/default.css',
    '../../../assets/lib/flexslider/flexslider.css',
    '../../../assets/css/style.css',
    './home.component.css',
  ],
})
export class HomeComponent implements OnInit {
  sliderImages: any[] = [];
  categories: any[] = [];
  cartItems: any[] = [];
  customer: any;
  items: {}[] = [];

  category: {
    id: string;
    name: string;
    contentType: string;
    image: string;
  } | null = {
    id: '',
    name: '',
    contentType: '',
    image: '',
  };
  categoryProducts: any[] = [];

  productItems: any[] = [];
  product: {
    id: string;
    name: string;
    contentType: string;
    image: string;
    categoryId: string;
  } | null = { id: '', name: '', contentType: '', image: '', categoryId: '' };

  images: any[] = [];
  slideIndex = 0;
  item: {
    itemId: string;
    name: string;
    contentType: string;
    description: string;
    price: string;
    image: string;
    color: string;
    size: string;
    productId: string;
    product: { categoryId: string };
    categoryId: string;
    isAddedToCart: boolean;
  } | null = {
    itemId: '',
    description: '',
    name: '',
    contentType: '',
    price: '',
    image: '',
    color: '',
    size: '',
    product: { categoryId: '' },
    productId: '',
    categoryId: '',
    isAddedToCart: false,
  };

  orders: any[] = [];

  count: number = 0;
  quantity: number = 1;

  showHome: boolean = true;

  showProducts: boolean = false;
  showItems: boolean = false;
  showItemDetail: boolean = false;
  showOrders: boolean = false;
  showCart: boolean = false;
  showCustomerDetail: boolean = false;
  showSignUp: boolean = false;
  showLogin: boolean = false;
  showProfile: boolean = false;

  constructor(
    private location: LocationStrategy,
    private shopService: ShopService,
    private categoryService: CategoryService,
    private customerService: CustomerService,
    private orderService: OrderService,
    private sanitizer: DomSanitizer
  ) {
    history.pushState(null, 'null', window.location.href);
    this.location.onPopState(() => {
      const url = window.location.href.includes('home');
      if (url) this.categoryProducts = [];

      history.pushState(null, 'null', window.location.href);
    });

  }

  ngOnInit(): void {

    this.categoryService.getAll().subscribe((res) => {
      this.categories = (res as any).categories;
      this.sliderImages = (res as any).sliderImages;

      while (this.categories.length < 0) {}
      $('.loader').fadeOut();
      $('.page-loader').delay(550).fadeOut('slow');

    });

    this.shopService.getAll().subscribe((res) => {
      this.categories = (res as any);
    });

  }

  getImage(category: any) {
    const image = category.contentType + category.image;
    return this.sanitizer.bypassSecurityTrustResourceUrl(image as string);
  }

  showCategoryProdouct(id: string) {
    this.hideAll();
    const category = this.categories.find((c) => c.id == id);

    this.category = {
      id: category.id,
      name: category.name,
      contentType: category.contentType,
      image: category.image,
    };
    this.categoryProducts = category.products;
    this.showProducts = true;
  }

  showProdouctItems($event: any) {
    this.hideAll();
    const product = $event.product;
    const categoryId = $event.categoryId;

    this.product = {
      id: product.id,
      name: product.name,
      image: product.image,
      contentType: product.contentType,
      categoryId: categoryId,
    };

    let cartItems = this.getCartItems();
    this.productItems = [];
    (product.items as []).forEach((item: any) => {
      const isInCart = cartItems.find((c: any) => c.itemId === item.id);

      let productItem = {
        id: item.id,
        name: item.name,
        contentType: item.contentType,
        price: item.price,
        image: item.image,
        product: item.product,
        color: item.colors,
        size: item.sizes,
        isAddedToCart: false,
      };

      if (isInCart) productItem.isAddedToCart = true;
      this.productItems.push(productItem);
    });

    this.categoryProducts = [];
    this.category = null;
    this.showItems = true;
  }

  showHomePage() {
    this.hideAll();
    this.showHome = true;
  }

  showCustomerOrders() {
    this.hideAll();
    if (this.orders.length == 0) {
      this.orderService.getAll('GetCustomerOrders').subscribe((res) => {
        this.orders = res as any;
        this.showOrders = true;
      });
    }

    if (this.orders.length > 0) this.showOrders = true;
  }
  onShowCart() {
    this.hideAll();
    this.cartItems = this.getCartItems();
    this.showCart = true;
  }

  showtItemDetail($event: any) {
    this.hideAll();
    const item = $event.item;
    const categoryId = $event.categoryId;
    this.product = null;
    this.item = {
      itemId: item.id,
      name: item.name,
      description: item.description,
      contentType: item.contentType,
      price: item.price,
      image: item.image,
      color: item.color,
      size: item.size,
      productId: item.product.id,
      product: { categoryId: item.product.categoryId },
      categoryId: item.product.categoryId,
      isAddedToCart: item.isAddedToCart,
    };

    this.images = item.images;
    this.getRelatedProductItems(categoryId, this.item.productId, item.id);

    this.showItemDetail = true;
  }

  getProduct(): {
    id: string;
    name: string;
    contentType: string;
    image: string;
    categoryId: string;
  } {
    return this.product as any;
  }

  getItem(): {
    itemId: string;
    name: string;
    contentType: string;
    description: string;
    price: string;
    image: string;
    color: string;
    size: string;
    productId: string;
    product: { categoryId: string };
    categoryId: string;
    isAddedToCart: boolean;
  } {
    return this.item as any;
  }

  getCartItems(): {}[] {
    const itemsInStorage = localStorage.getItem('items');
    let items = [{}];
    items = [];
    if (itemsInStorage) items = JSON.parse(itemsInStorage) as {}[];
    return items;
  }

  private getRelatedProductItems(
    categoryId: string,
    productId: string,
    itemId: string
  ) {
    const items = this.getCartItems();
    const productItems = this.categories
      .find((c) => c.id == categoryId)
      .products.find((c: any) => c.id == productId)
      .items.filter((i: any) => i.id != itemId);

    this.productItems = [];

    (productItems as []).forEach((item: any) => {
      const isInCart = items.find((c: any) => c.itemId === item.id);

      let productItem = {
        id: item.id,
        name: item.name,
        contentType: item.contentType,
        price: item.price,
        image: item.image,
        color: item.colors,
        size: item.sizes,
        product: item.product,
        isAddedToCart: false,
      };

      if (isInCart) productItem.isAddedToCart = true;

      this.productItems.push(productItem);
    });
  }

  getCartCount(): number {
    return this.getCartItems().length;
  }

  updateCartCount() {
    this.count = this.getCartCount();
  }

  back($event: any) {
    this.hideAll();
    const componentName = $event.component as ComponentName;
    if (componentName == ComponentName.Product) this.showHome = true;
    else if (componentName == ComponentName.Item) this.showCategoryProdouct($event.categoryId);
    else if (componentName == ComponentName.ItemDetail) this.backToProductItems($event);
    else if (componentName == ComponentName.Order) this.showHome = true;
    else if (componentName == ComponentName.Cart) this.showHome = true;
  }

  private backToProductItems($event: any) {
    const categoryId = $event.categoryId;
    const productId = $event.productId;
    const product = this.categories
      .find((c) => c.id == categoryId)
      .products.find((p: any) => p.id == productId);
    this.showProdouctItems({ product: product, categoryId: categoryId });
  }

  onCheckout($event: any) {
    const isAutherize = $event.isAutherize;
    this.hideAll();
    if (isAutherize) this.showCustomerDetailComponent();
    else {
      this.showSignUp = true;
    }
  }

  newOrders() {
    this.orders = [];
    this.hideAll();
    this.showCustomerOrders();
  }

  showCustomerDetailComponent() {
    this.hideAll();
    if (this.customer == null) {
      this.customerService.get().subscribe((res) => {
        this.customer = res as any;
        this.items = this.getCartItems();
        this.showCustomerDetail = true;
      });
    } else {
      this.items = this.getCartItems();
      this.showCustomerDetail = true;
    }
  }

  showCustomerProfile() {
    this.hideAll();
    if (this.customer == null) {
      this.customerService.get().subscribe((res) => {
        this.customer = res as any;
        this.items = this.getCartItems();
        this.showProfile = true;
      });
    }
  }
  onShowLogin() {
    this.hideAll();
    this.showLogin = true;
  }

  onShowSignUp() {
    this.hideAll();
    this.showSignUp = true;
  }

  hideAll() {
    this.showHome = false;
    this.showProducts = false;
    this.showItems = false;
    this.showItemDetail = false;
    this.showOrders = false;
    this.showCart = false;
    this.showCustomerDetail = false;
    this.showSignUp = false;
    this.showLogin = false;
    this.showProfile = false;
  }
}
