import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ProductItemService  extends DataService {

  constructor(private httpClient: HttpClient) {
    super("ProductItems", httpClient)
  }
}
