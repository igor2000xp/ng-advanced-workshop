import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { CountryService } from './country.service';
import { Country } from './types';

@Component({
  selector: 'app-exercise2',
  templateUrl: './exercise2.component.html',
  styleUrls: ['./exercise2.component.css'],
})
export class Exercise2Component {
  countries$: Observable<Country[]> = this.service.getCountries();
  countryDropdown = new FormControl<Country['id']>(null);

  constructor(private service: CountryService) {}
}
