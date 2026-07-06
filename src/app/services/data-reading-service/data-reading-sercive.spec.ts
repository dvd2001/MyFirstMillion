import { TestBed } from '@angular/core/testing';

import { DataReadingSercive } from './data-reading-sercive';

describe('DataReadingSercive', () => {
  let service: DataReadingSercive;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataReadingSercive);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
