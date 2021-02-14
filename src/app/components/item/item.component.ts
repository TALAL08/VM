import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: [
    './item.component.css',
    '../../../assets/vendors/iconfonts/mdi/css/materialdesignicons.min.css',
    '../../../assets/vendors/iconfonts/ionicons/dist/css/ionicons.css',
    '../../../assets/vendors/iconfonts/flag-icon-css/css/flag-icon.min.css',
    '../../../assets/vendors/css/vendor.bundle.base.css',
    '../../../assets/vendors/css/vendor.bundle.addons.css',
    '../../../assets/css/shared/style.css',
    '../../../assets/css/demo_1/style.css'
  ]
})
export class ItemComponent implements OnInit {

  form!: FormGroup;
  itemId: string = '';
  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((pram) => {
      this.itemId = pram.get('id') as string;

      if (this.itemId != null) {
        this.itemService.get(this.itemId).subscribe((res) => {
          let itemInDb = res as any;
          this.form.get('name')?.setValue(itemInDb.name);
        });
      }
    });
  }

  submit() {
    if (this.itemId == null) {
      this.itemService
        .create(null, null, [this.form.get('name')?.value])
        .subscribe((res) => {
          console.log(res);
        });
    } else {
      this.itemService
        .update(null, null, [this.itemId, this.form.get('name')?.value])
        .subscribe((res) => {
          console.log(res);
        });
    }
  }
}
