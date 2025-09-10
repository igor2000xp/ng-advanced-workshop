import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, startWith, switchMap, withLatestFrom } from 'rxjs/operators';
import { CountryService } from './country.service';
import { Country, State } from './types';

@Component({
  selector: 'app-exercise4',
  templateUrl: './exercise4.component.html',
  styleUrls: ['./exercise4.component.css'],
})
export class Exercise4Component {
  countries$: Observable<Country[]>;
  states$!: Observable<State[]>;
  currentCountry$ = new Subject<Country>();
  statesForCountrie$: Observable<State[]>;

  state!: State;
  countryControl = new FormControl<string>('', {nonNullable: true});
  stateControl = new FormControl<string>('', {nonNullable: true});

  constructor(private service: CountryService) {
    this.countries$ = this.countryControl.valueChanges.pipe(
      withLatestFrom(this.service.getCountries()),
      map(([userInput, countries]) =>
        countries.filter((c) => c.description.toLowerCase().indexOf((userInput ?? '').toLowerCase()) !== -1),
      ),
    );

    this.statesForCountrie$ = this.currentCountry$.pipe(
      switchMap((country) => this.service.getStatesFor(country.id))
    );

    this.states$ = combineLatest([
      this.stateControl.valueChanges.pipe(startWith(this.stateControl.value)),
      this.statesForCountrie$
    ]).pipe(
      map(([userInput, states]) => {
        return states.filter((s) => {
          return s.description.toLowerCase().includes(userInput);
        })
      })
    );
  }

  updateStates(country: Country) {
    this.countryControl.setValue(country.description);
    // this.states$ = this.service.getStatesFor(country.id);
    this.stateControl.setValue('');
    this.currentCountry$.next(country);
  }
}
