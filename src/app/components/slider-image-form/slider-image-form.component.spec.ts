import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderImageFormComponent } from './slider-image-form.component';

describe('SliderImageFormComponent', () => {
  let component: SliderImageFormComponent;
  let fixture: ComponentFixture<SliderImageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderImageFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderImageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
