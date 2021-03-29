import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: [
    '../../../assets/lib/bootstrap/dist/css/bootstrap.min.css',
    '../../../assets/lib/animate.css/animate.css',
    '../../../assets/lib/components-font-awesome/css/font-awesome.min.css',
    '../../../assets/lib/et-line-font/et-line-font.css',
    '../../../assets/lib/magnific-popup/dist/magnific-popup.css',
    '../../../assets/lib/simple-text-rotator/simpletextrotator.css',
    '../../../assets/css/style.css',
    '../../../assets/css/colors/default.css',
    './nav-bar.component.css'
  ]
})
export class NavBarComponent implements OnInit {
  @Input() count:number =0;
  @Output() showOrders = new EventEmitter();
  @Output() showHome = new EventEmitter();
  @Output() showCart = new EventEmitter();

  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {

    const cartInStorage = localStorage.getItem('items');
    let cart = [{}];
    cart = [];
    if (cartInStorage) {
      cart = JSON.parse(cartInStorage) as {}[];
    }

    this.count = cart.length;
  }

  isAutherizeUser(){
    return this.authService.isAutherize();
  }

  getUserName(){
    return this.authService.getUserName();
  }

  getName(){
    return this.authService.getName();
  }
  logout(){
    this.authService.logOut();
  }

  onShowOrders(){
    this.showOrders.emit();
  }

  onShowHome(){
    this.showHome.emit();
  }
  onShowCart(){
    this.showCart.emit();
  }
}
