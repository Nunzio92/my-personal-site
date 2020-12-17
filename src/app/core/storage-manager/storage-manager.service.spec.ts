/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { StorageManagerService } from './storage-manager.service';
import { CommonModule } from '@angular/common';


describe('StorageManagerService', () => {

  function configureModule(virtualMode: boolean) {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      providers: [
        {
          provide: StorageManagerService,
          useFactory: () => {
            return new StorageManagerService();
          }
        }
      ]
    });
  }

  beforeEach(() => {
    configureModule(false);
  });

  it('StorageManagerService should be defined', inject([StorageManagerService], (service: StorageManagerService) => {
    expect(service).toBeTruthy();
  }));

  describe('setter and getter', () => {
    it('setSessionItem e getSessionItem key => "ciao" value => "mondo" in sessionStorage', inject([StorageManagerService],
      (service: StorageManagerService) => {
        service.setSessionItem('ciao', 'mondo');
        const finalStr = service.getSessionItem('ciao');
        expect(finalStr).toEqual('mondo');
      }));

    it('setLocalItem e getLocalItem key => "ciao" value => "mondo" in localStorage', inject([StorageManagerService],
      (service: StorageManagerService) => {
        service.setLocalItem('ciao', 'mondo');
        const finalStr = service.getLocalItem('ciao');
        expect(finalStr).toBe('mondo');
      }));
  });

  describe('remove and clearAllLocal', () => {
    it('$removeLocalItem key => "ciao" in sessionStorage', inject([StorageManagerService],
      (service: StorageManagerService) => {
        service.setSessionItem('ciao', 'mondo');
        let finalStr = service.getSessionItem('ciao');
        expect(finalStr).toBe('mondo');
        service.removeSessionItem('ciao');
        finalStr = service.getSessionItem('ciao');
        expect(finalStr).toBeUndefined();
        expect(sessionStorage.getItem('ciao')).toBeNull();
      }));

    it('removeLocalItem key => "ciao" in localStorage', inject([StorageManagerService],
      (service: StorageManagerService) => {
        service.setLocalItem('ciao', 'mondo');
        let finalStr = service.getLocalItem('ciao');
        expect(finalStr).toBe('mondo');
        service.removeLocalItem('ciao');
        finalStr = service.getLocalItem('ciao');
        expect(finalStr).toBeUndefined();
        expect(localStorage.getItem('ciao')).toBeNull();
      }));
  });

  describe('Virtual mode', () => {
    beforeEach(() => {
      configureModule(true);
    });

    describe('setter and getter', () => {
      it('setSessionItem e getSessionItem key => "ciao" value => "mondo" in sessionStorage', inject([StorageManagerService],
        (service: StorageManagerService) => {
          service.setSessionItem('ciao', 'mondo');
          const finalStr = service.getSessionItem('ciao');
          expect(finalStr).toEqual('mondo');
        }));

      it('setLocalItem e getLocalItem key => "ciao" value => "mondo" in localStorage', inject([StorageManagerService],
        (service: StorageManagerService) => {
          service.setLocalItem('ciao', 'mondo');
          const finalStr = service.getLocalItem('ciao');
          expect(finalStr).toBe('mondo');
        }));
    });

    describe('remove and clearAll local and session storage', () => {
      it('$removeLocalItem key => "ciao" in sessionStorage', inject([StorageManagerService],
        (service: StorageManagerService) => {
          service.setSessionItem('ciao', 'mondo');
          let finalStr = service.getSessionItem('ciao');
          expect(finalStr).toBe('mondo');
          service.removeSessionItem('ciao');
          finalStr = service.getSessionItem('ciao');
          expect(finalStr).toBeUndefined();
          expect(sessionStorage.getItem('ciao')).toBeNull();
        }));

      it('removeLocalItem key => "ciao" in localStorage', inject([StorageManagerService],
        (service: StorageManagerService) => {
          service.setLocalItem('ciao', 'mondo');
          let finalStr = service.getLocalItem('ciao');
          expect(finalStr).toBe('mondo');
          service.removeLocalItem('ciao');
          finalStr = service.getLocalItem('ciao');
          expect(finalStr).toBeUndefined();
          expect(localStorage.getItem('ciao')).toBeNull();
        }));
    });

  });

});
