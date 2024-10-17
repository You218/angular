import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiserviceService } from '../apiservice.service';

export function idTakenValidator(apiService: ApiserviceService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return apiService.registeredData$.pipe(

      
      map(registeredData => {
        const exists = registeredData.some(item => item.id === control.value);
        return exists ? { idTaken: true } : null;
      }),
      catchError(() => of(null))
    );
  };
}
