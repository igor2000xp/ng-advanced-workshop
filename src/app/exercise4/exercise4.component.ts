import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { CountryService } from './country.service';
import { Country, State } from './types';

@Component({
  selector: 'app-exercise4',
  templateUrl: './exercise4.component.html',
  styleUrls: ['./exercise4.component.css'],
})
export class Exercise4Component {
  countries$: Observable<Country[]>;
  currentCountry$ = new Subject<Country>();
  statesForCountry$: Observable<State[]>;
  state!: State;
  states$: Observable<State[]>;

  countryControl = new FormControl<string>('', {nonNullable: true});
  stateControl = new FormControl<string>('', {nonNullable: true})

  constructor(private service: CountryService) {

    this.countries$ = combineLatest([
      this.service.getCountries(),
      this.countryControl.valueChanges.pipe(startWith(this.countryControl.value))
    ]).pipe(
      map(([countries, userInput]) => {
        return countries.filter((c) => c.description.toLocaleLowerCase().includes(userInput.toLowerCase()));
      })
    );

    this.statesForCountry$ = this.currentCountry$.asObservable().pipe(
      switchMap((c) => {
        return this.service.getStatesFor(c.id);
      })
    );

    this.states$ = combineLatest([
      this.statesForCountry$,
      this.stateControl.valueChanges.pipe(startWith(this.stateControl.value))
    ]).pipe(
      map(([states, userInput]) => {
        return states.filter((s) => s.description.toLowerCase().includes(userInput.toLowerCase()));
      })
    );
  }

  updateStates(country: Country) {
    this.countryControl.setValue(country.description);
    this.stateControl.setValue('');
    this.currentCountry$.next(country);
  }
}
