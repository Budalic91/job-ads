import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[MatSnackBarModule]
    });
    service = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
