import { TestBed } from '@angular/core/testing';

import { kratosService } from './kratos.service';

describe('KratosService', () => {
  let service: kratosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(kratosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
