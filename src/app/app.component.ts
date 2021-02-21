import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    '../assets/vendors/iconfonts/mdi/css/materialdesignicons.min.css',
    '../assets/vendors/iconfonts/ionicons/dist/css/ionicons.css',
    '../assets/vendors/iconfonts/flag-icon-css/css/flag-icon.min.css',
    '../assets/vendors/css/vendor.bundle.base.css',
    '../assets/vendors/css/vendor.bundle.addons.css',
    '../assets/css/shared/style.css',
    '../assets/css/demo_1/style.css'
    ]
})
export class AppComponent {
  title = 'VirtualMartket';
  constructor(private authService:AuthService){

  }

  isInRole(roleName:string){
    return this.authService.isInRole(roleName);
  }
}
