import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Country, State } from './types';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private countries$: Observable<Country[]>;
  private state$: Observable<State[]>;
  private API_STATE = 'http://localhost:3000/states?countryCode=';

  constructor(private http: HttpClient) {
    this.countries$ = http.get<Country[]>('http://localhost:3000/countries');
  }

  getCountries(): Observable<Country[]> {
    return this.countries$;
  }

  getStates(countryID: string): Observable<State[]> {
    this.state$ = this.http.get<State[]>(this.API_STATE + countryID);
    return this.state$.pipe(map((states) => states.sort((a, b) => a.description.localeCompare(b.description))));
  }
}
