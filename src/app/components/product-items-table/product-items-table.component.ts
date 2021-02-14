import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-product-items-table',
  templateUrl: './product-items-table.component.html',
  styleUrls: ['./product-items-table.component.css']
})
export class ProductItemsTableComponent implements OnInit {

  items: [] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService.getAll().subscribe((res) => {
      console.log(res);
      (this.items as any) = res;
    });
  }

  delete(item: any) {

    this.itemService.delete(item.id).subscribe((res) => {
      console.log(res);
    });

    const index = this.items.indexOf(item as never);
    this.items.splice(index, 1);

    alert('Deleted');
  }
}
