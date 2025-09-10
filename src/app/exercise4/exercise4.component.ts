import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { combineLatestWith, map, startWith, switchMap } from 'rxjs/operators';
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
  statesForCountry$: Observable<State[]>;

  state!: State;
  countryControl = new FormControl<string>('', { nonNullable: true });
  stateControl = new FormControl<string>('', { nonNullable: true });

  constructor(private service: CountryService) {
    // That is the native Alain approach without startWith!!!

    // this.countries$ = this.countryControl.valueChanges.pipe(
    //   withLatestFrom(this.service.getCountries()),
    //   // tap(([u, s]) => console.log('u = ', u)),
    //   map(([userInput, countries]) =>
    //     countries.filter((c) => c.description.toLowerCase().indexOf((userInput ?? '').toLowerCase()) !== -1),
    //   ),
    // );

    // Attention!!! This approach using startWith doesn't work correctly
    // There are the differences between withLatestFrom() operator and
    // combineWith (combineLatestWith - a new version of that one).
    // withLatestFrom doesn't trigger inside stream only outside.

    // this.countries$ = this.countryControl.valueChanges.pipe(
    //   // Immediately emit the control's current value upon subscription
    //   startWith(this.countryControl.value ?? ''),

    //   // Now, combine it with the latest value from the countries service
    //   withLatestFrom(this.service.getCountries()),

    //   // And perform the filtering
    //   map(([userInput, countries]) =>
    //     countries.filter((c) =>
    //       c.description.toLowerCase().includes((userInput ?? '').toLowerCase())
    //     )
    //   )
    // );

    // combineWith is deprecated !!!!!

    // this.countries$ = combineLatest([
    //   this.countryControl.valueChanges.pipe(startWith(this.countryControl.value)),
    //   this.service.getCountries(),
    // ]).pipe(
    //   map(([userInput, countries]) => {
    //     return countries.filter((c) => {
    //       return c.description.toLowerCase().includes(userInput.toLowerCase());
    //     })
    //   })
    // );

    this.countries$ = this.countryControl.valueChanges.pipe(
      startWith(this.countryControl.value),
      combineLatestWith(this.service.getCountries()),
      map(([userInput, countries]) => {
        return countries.filter((c) => {
          return c.description.toLowerCase().includes(userInput.toLowerCase());
        });
      }),
    );

    this.statesForCountry$ = this.currentCountry$.pipe(switchMap((country) => this.service.getStatesFor(country.id)));

    this.states$ = this.stateControl.valueChanges.pipe(
      startWith(this.stateControl.value),
      combineLatestWith(this.statesForCountry$),
      map(([userInput, states]) => {
        return states.filter((s) => {
          return s.description.toLowerCase().includes(userInput.toLowerCase());
        });
      }),
    );
  }

  updateStates(country: Country) {
    this.countryControl.setValue(country.description);
    this.stateControl.setValue('');
    this.currentCountry$.next(country);
  }
}
