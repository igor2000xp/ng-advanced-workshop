import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from './types';
import { HttpClient } from '@angular/common/http';

const COUNTRIES: Country[] = [
  { id: 'empty', description: ''},
  { id: 'US', description: 'United States'},
  { id: 'CA', description: 'Canada'},
  { id: 'UK', description: 'United Kingdom' },
  { id: 'AU', description: 'Australia' },
  { id: 'NZ', description: 'New Zealand' },
];

@Injectable({
  providedIn: 'root'
})
export class CountryService {

constructor(private http: HttpClient){}

  getCountries(): Observable<Country[]> {
    // return of(COUNTRIES);
    return this.http.get<Country[]>('http://localhost:3000/countries');
  }
}
