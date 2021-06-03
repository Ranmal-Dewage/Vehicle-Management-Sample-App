import { TestBed } from '@angular/core/testing';

import { VehicleGqlService } from './vehicle-gql.service';

describe('VehicleGqlService', () => {
  let service: VehicleGqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleGqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
