import { TestBed } from '@angular/core/testing';

import { SliderImageService } from './slider-image.service';

describe('SliderImageService', () => {
  let service: SliderImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SliderImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
