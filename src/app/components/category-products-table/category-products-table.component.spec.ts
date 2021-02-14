import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryProductsTableComponent } from './category-products-table.component';

describe('CategoryProductsTableComponent', () => {
  let component: CategoryProductsTableComponent;
  let fixture: ComponentFixture<CategoryProductsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryProductsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
