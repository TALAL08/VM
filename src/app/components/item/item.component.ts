import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
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
