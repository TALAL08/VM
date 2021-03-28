import { LocationStrategy, PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoryService } from 'src/app/services/category.service';
import { ShopService } from 'src/app/services/shop.service';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    '../../../assets/lib/bootstrap/dist/css/bootstrap.min.css',
    '../../../assets/lib/animate.css/animate.css',
    '../../../assets/lib/components-font-awesome/css/font-awesome.min.css',
    '../../../assets/lib/et-line-font/et-line-font.css',
    '../../../assets/lib/magnific-popup/dist/magnific-popup.css',
    '../../../assets/lib/simple-text-rotator/simpletextrotator.css',
    '../../../assets/css/style.css',
    '../../../assets/css/colors/default.css',
    './home.component.css',
  ],
})
export class HomeComponent implements OnInit {
  categories: any[] = [];

  category: {id:string, name: string; contentType: string; image: string }|null = {
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
  count: number = 0;
  quantity: number = 1;

  showHome:boolean=true;
  showProducts:boolean=false;
  showItems:boolean=false;
  showItemDetail:boolean=false;

  constructor(
    private location: LocationStrategy,
    private shopService: ShopService,
    private categoryService: CategoryService,
    private sanitizer: DomSanitizer
  ) {
    history.pushState(null, 'null', window.location.href);
    this.location.onPopState(() => {
      const url = window.location.href.includes('home');
      if (url) this.categoryProducts = [];

      history.pushState(null, 'null', window.location.href);
    });

    this.categoryService.getAll().subscribe((res) => {
      this.categories = res as any;
      while (this.categories.length < 0) {}
      $('.loader').fadeOut();
      $('.page-loader').delay(550).fadeOut('slow');
    });

    this.shopService.getAll().subscribe((res) => {
      this.categories = res as any;
    });
  }

  ngOnInit(): void {}

  getImage(category: any) {
    const image = category.contentType + category.image;
    return this.sanitizer.bypassSecurityTrustResourceUrl(image as string);
  }

  showCategoryProdouct(id: string) {
    const category = this.categories.find((c) => c.id == id);

    this.category = {
      id: category.id,
      name: category.name,
      contentType: category.contentType,
      image: category.image,
    };
    this.categoryProducts = category.products;
    this.showHome=false;
    this.showProducts=true;
  }

  showProdouctItems($event: any) {
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
    this.showProducts=false;
    this.showItems=true;
  }

  showtItemDetail($event: any) {
    const item = $event.item;
    const categoryId = $event.categoryId;
    this.product=null;
    this.item = {
      itemId: item.itemId,
      name: item.name,
      description: item.description,
      contentType: item.contentType,
      price: item.price,
      image: item.image,
      color: item.color,
      size: item.size,
      productId: item.product.id,
      product: { categoryId: item.categoryId },
      categoryId: item.categoryId,
      isAddedToCart: true,
    };

    this.images = item.images;
    this.getRelatedProductItems(categoryId, this.item.productId, item.id);

    this.showItems=false;
    this.showItemDetail=true;
  }



  getProduct(): {id: string,name: string,contentType: string,image: string,categoryId: string} {
    return this.product as any;
  }

  getItem():{itemId: string,name: string,contentType: string,description: string,price: string,image: string,color: string,size: string,productId: string,product: { categoryId: string },categoryId: string,isAddedToCart: boolean}{
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
}
