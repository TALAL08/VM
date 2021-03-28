import { Component, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { ProductItemService } from 'src/app/services/product-item.service';
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
  @Input() images: any[] = [];
  @Input() productItems: any[] = [];
 @Input() item: {
    itemId: string,
    name: string,
    contentType: string,
    description:string,
    price: string,
    image: string,
    color: string,
    size: string,
    product:{categoryId:string}
    productId: string,
    categoryId: string,
    isAddedToCart: boolean
  }={itemId:"",description:"",name:"",contentType:"",price:"",image:"",color:"",size:"",product:{categoryId:""},productId:"",categoryId:"",isAddedToCart:false};

  slideIndex = 0;
  count: number = 0;
  quantity: number = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private productItemService: ProductItemService,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    $('.loader').fadeOut();
    $('.page-loader').delay(350).fadeOut('slow');
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
        contentType:item.contentType,
        image: item.contentType + item.image,
        quantity: this.quantity,
        color:item.color,
        size:item.size,
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

  getImage(image: any) {

    return this.sanitizer.bypassSecurityTrustResourceUrl(image as string);
  }



  openModal() {
    (document.getElementById('imgModal') as any).style.display = "block";
   }
   closeModal() {
    (document.getElementById('imgModal')as any).style.display = "none";
   }
   plusSlides(n:any) {
    this.showSlides(this.slideIndex += n);
   }
   currentSlide(n:any) {
    this.showSlides(this.slideIndex = n);
   }

   showSlides(n:any) {
    let i;
    const slides = document.getElementsByClassName("img-slides") as HTMLCollectionOf < HTMLElement > ;
    const dots = document.getElementsByClassName("images") as HTMLCollectionOf < HTMLElement > ;
    if (n > slides.length) {
     this.slideIndex = 1
    }
    if (n < 1) {
     this.slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
     slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex - 1].style.display = "block";
    if (dots && dots.length > 0) {
     dots[this.slideIndex - 1].className += " active";
    }
   }
}
