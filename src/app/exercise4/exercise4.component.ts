import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
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
  state!: State;
  countryControl = new FormControl<string>('');

  constructor(private service: CountryService) {
    this.countries$ = this.countryControl.valueChanges.pipe(
      withLatestFrom(this.service.getCountries()),
      map(([userInput, countries]) =>
        countries.filter((c) => c.description.toLowerCase().indexOf((userInput ?? '').toLowerCase()) !== -1),
      ),
    );
  }

  updateStates(country: Country) {
    this.countryControl.setValue(country.description);
    this.states$ = this.service.getStatesFor(country.id);
  }
}
