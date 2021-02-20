import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-items-table',
  templateUrl: './items-table.component.html',
  styleUrls: [
    './items-table.component.css',
    '../../../assets/vendors/iconfonts/mdi/css/materialdesignicons.min.css',
    '../../../assets/vendors/iconfonts/ionicons/dist/css/ionicons.css',
    '../../../assets/vendors/iconfonts/flag-icon-css/css/flag-icon.min.css',
    '../../../assets/vendors/css/vendor.bundle.base.css',
    '../../../assets/vendors/css/vendor.bundle.addons.css',
    '../../../assets/css/shared/style.css',
    '../../../assets/css/demo_1/style.css'
  ]
})
export class ItemsTableComponent implements OnInit {

  items: any[] = [];

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
