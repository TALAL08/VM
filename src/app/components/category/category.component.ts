import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: [
    './category.component.css',
    '../../../assets/vendors/iconfonts/mdi/css/materialdesignicons.min.css',
    '../../../assets/vendors/iconfonts/ionicons/dist/css/ionicons.css',
    '../../../assets/vendors/iconfonts/flag-icon-css/css/flag-icon.min.css',
    '../../../assets/vendors/css/vendor.bundle.base.css',
    '../../../assets/vendors/css/vendor.bundle.addons.css',
    '../../../assets/css/shared/style.css',
    '../../../assets/css/demo_1/style.css'
  ]
})
export class CategoryComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private categoryService:CategoryService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  submit(){
    this.categoryService.create(null,null,[this.form.get('name')?.value]).subscribe(res => {
      console.log(res);
    })
}
}
