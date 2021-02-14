import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  categoryId:string="";
  constructor(
    private route: ActivatedRoute,
    private categoryService:CategoryService,
    private fb: FormBuilder
  ) {

    this.form = this.fb.group({
      name: ['', Validators.required]

    });
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(pram => {
      this.categoryId = (pram.get('id') as string);

      if(this.categoryId != null)
      {
        this.categoryService.get(this.categoryId).subscribe(res =>{

          let categoryInDb = (res as any)
          this.form.get('name')?.setValue(categoryInDb.name);
        });
      }

    });
  }

  submit(){

    if(this.categoryId == null){

      this.categoryService.create(null,null,[this.form.get('name')?.value]).subscribe(res => {
        console.log(res);
      });

    }
    else
    {
      this.categoryService.update(null,null,[this.categoryId,this.form.get('name')?.value]).subscribe(res => {
        console.log(res);
      });
    }
}
}
