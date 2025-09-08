import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { catchError, Observable, of, shareReplay } from 'rxjs';

export interface Country {
  description: string;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private readonly API_LOCAL = 'http://localhost:3000/countries';
  private readonly countryCash$ = this.http.get<Country[]>(this.API_LOCAL).pipe(
    catchError((err) => {
      console.error('Error of the Countries request, ', err);
      return of([]);
    }),
    shareReplay(1),
  )

  public getCountries(): Observable<Country[]> {
    return this.countryCash$;
  }

  constructor(private http: HttpClient) {}
}
