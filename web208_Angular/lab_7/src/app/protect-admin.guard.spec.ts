import { TestBed } from '@angular/core/testing';

import { ProtectAdminGuard } from './protect-admin.guard';

describe('ProtectAdminGuard', () => {
  let guard: ProtectAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProtectAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
