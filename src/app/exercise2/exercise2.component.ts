import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, map, Observable, startWith, switchMap, tap } from 'rxjs';
import { CountryService } from './country.service';
import { Country, State } from './types';

@Component({
  selector: 'app-exercise2',
  templateUrl: './exercise2.component.html',
  styleUrls: ['./exercise2.component.css'],
})
export class Exercise2Component {
  countryDropdown = new FormControl<Country['id']>('');
  statesDropdown = new FormControl<State['code']>('');

  countries$: Observable<Country[]> = this.service.getCountries();
  states$: Observable<State[]> = this.service.getStates('');

  currentCountry$ = combineLatest([
    this.countries$,
    this.countryDropdown.valueChanges.pipe(startWith(this.countryDropdown.value))
  ]).pipe(map(([countries, countryID]) => {
    return countries.find((c) => c.id === countryID)?.id;
  }));

  statesList$ = this.currentCountry$.pipe(
    switchMap((countryID) => {
      return this.service.getStates(countryID);
    })
  );

  trackById(index: number, state: State) {
    return state.code + index;
  }

  constructor(private service: CountryService) {}

}
