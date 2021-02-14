import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends DataService {

  constructor(private httpClient: HttpClient) {
    super("Items", httpClient)
  }
}
