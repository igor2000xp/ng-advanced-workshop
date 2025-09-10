import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, withLatestFrom } from 'rxjs';
import { CountryService } from './country.service';
import { Country, State } from './types';

@Component({
  selector: 'app-exercise3',
  templateUrl: './exercise3.component.html',
  styleUrls: ['./exercise3.component.css'],
})
export class Exercise3Component {
  // countries$: Observable<Country[]> = this.service.getCountries();
  states$: Observable<State[]>;
  country!: Country;
  state!: State;

  countryControl = new FormControl<string>('', { nonNullable: true });
  stateControl = new FormControl<string>('', { nonNullable: true });
  countries$ = this.countryControl.valueChanges.pipe(
    withLatestFrom(this.service.getCountries()),
    map(([userInput, countries]) =>
      countries.filter((c) => {
        return c.description.toLocaleLowerCase().indexOf(userInput.toLowerCase()) !== -1;
      }),
    ),
  );

  constructor(private service: CountryService) {}

  updateStates(country: Country) {
    this.country = country;
    // this.stateControl.setValue('');
    this.stateControl.reset();
    this.states$ = this.service.getStatesFor(country.id);
  }
}
